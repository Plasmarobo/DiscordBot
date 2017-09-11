const Discord = require("discord.js");
const bot = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
var Exec    = require('child_process').exec;
var Http    = require('http');
var Score   = require('string_score');
var startTime = new Date();

function powerCycle()
{
  console.log("Attempting powerCycle");
  Exec('sudo /sbin/reboot', function(error, stdout, stderr){
    console.log(stdout);
    console.error(stderr);
    process.exit();
  });
}

function sanitizeAnswer(correct) {
  correct = correct.toLowerCase();
  correct = correct.replace(/^(the|a|an) /i, "");
  correct = correct.replace(/<(.|\n)*?>/g, '');
  correct = correct.replace(/\&/g, 'and');
  correct = correct.trim();
  return correct;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var Permissions = {};
try{
  Permissions = require("./permissions.json");
} catch(e){}
Permissions.checkPermission = function (user,permission){
  try {
    var allowed = false;
    try{
      if(Permissions.global.hasOwnProperty(permission)){
        allowed = Permissions.global[permission] == true;
      }
    } catch(e){}
    try{
      if(Permissions.users[user.id].hasOwnProperty(permission)){
        allowed = Permissions.users[user.id][permission] == true;
      }
    } catch(e){}
    return allowed;
  } catch(e){}
  return false;
}

var triviaScores = {};
var currentTriviaQuestion = null;
var triviaURL = 'http://jservice.io/api';
var triviaAnswerMarkers = {};
var triviaSimilarityThreshold = 0.75;
var triviaAccuracyThreshold = 0.6;

try {
  triviaScores = require("./triviaScores.json");
} catch(e) {}

var qs = require("querystring");

var config = {
    "api_key": "dc6zaTOxFJmzC",
    "rating": "r",
    "url": "http://api.giphy.com/v1/gifs/search",
    "permission": ["NORMAL"]
};

var aliases;
var messagebox;

var commands = {
  "ping": {
      description: "responds pong, useful for checking if bot is alive",
      process: function(bot, msg, suffix) {
          msg.channel.send( msg.sender+" pong!");
          if(suffix){
              msg.channel.send( "note that !ping takes no arguments!");
          }
      }
  },
  "servers": {
      description: "lists servers bot is connected to",
      process: function(bot,msg){msg.channel.send(bot.servers);}
  },
  "channels": {
      description: "lists channels bot is connected to",
      process: function(bot,msg) { msg.channel.send(bot.channels);}
  },
  "myid": {
      description: "returns the user id of the sender",
      process: function(bot,msg){msg.channel.send(msg.author.id);}
  },
  "idle": {
      description: "sets bot status to idle",
      process: function(bot,msg){ bot.setStatusIdle();}
  },
  "online": {
      description: "sets bot status to online",
      process: function(bot,msg){ bot.setStatusOnline();}
  },
  "say": {
      usage: "<message>",
      description: "bot says message",
      process: function(bot,msg,suffix){ msg.channel.send(suffix);}
  },
  "update": {
      description: "bot will perform a git pull master and restart with the new code",
      process: function(bot,msg,suffix) {
          
            msg.channel.send("fetching updates...",function(error,sentMsg){
                console.log("updating...");
              var spawn = require('child_process').spawn;
                var log = function(err,stdout,stderr){
                    if(stdout){console.log(stdout);}
                    if(stderr){console.log(stderr);}
                };
                var fetch = spawn('git', ['fetch']);
                fetch.stdout.on('data',function(data){
                    console.log(data.toString());
                });
                fetch.on("close",function(code){
                    var reset = spawn('git', ['reset','--hard','origin/master']);
                    reset.stdout.on('data',function(data){
                        console.log(data.toString());
                    });
                    reset.on("close",function(code){
                        var npm = spawn('npm', ['install']);
                        npm.stdout.on('data',function(data){
                            console.log(data.toString());
                        });
                        npm.on("close",function(code){
                            console.log("goodbye");
                            msg.channel.send("brb!",function(){
                                bot.logout(function(){
                                    process.exit();
                                });
                            });
                        });
                    });
                });
            });
          
      }
  },
  "version": {
      description: "returns the git commit this bot is running",
      process: function(bot,msg,suffix) {
          var commit = require('child_process').spawn('git', ['log','-n','1']);
          commit.stdout.on('data', function(data) {
              msg.channel.send(data);
          });
          commit.on('close',function(code) {
              if( code != 0){
                  msg.channel.send("failed checking git version!");
              }
          });
      }
  },
  "log": {
      usage: "<log message>",
      description: "logs message to bot console",
      process: function(bot,msg,suffix){console.log(msg.content);}
  },
  "join-server": {
      usage: "<invite>",
      description: "joins the server it's invited to",
      process: function(bot,msg,suffix) {
          console.log(bot.joinServer(suffix,function(error,server) {
              console.log("callback: " + arguments);
              if(error){
                  msg.channel.send("failed to join: " + error);
              } else {
                  console.log("Joined server " + server);
                  msg.channel.send("Successfully joined " + server);
              }
          }));
      }
  },
  "alias": {
    usage: "<name> <actual command>",
    description: "Creates command aliases. Useful for making simple commands on the fly",
    process: function(bot,msg,suffix) {
      var args = suffix.split(" ");
      var name = args.shift();
      if(!name){
        msg.channel.send("!alias " + this.usage + "\n" + this.description);
      } else if(commands[name] || name === "help"){
        msg.channel.send("overwriting commands with aliases is not allowed!");
      } else {
        var command = args.shift();
        aliases[name] = [command, args.join(" ")];
        //now save the new alias
        require("fs").writeFile("./alias.json",JSON.stringify(aliases,null,2), null);
        msg.channel.send("created alias " + name);
      }
    }
  },
  "userid": {
    usage: "[user to get id of]",
    description: "Returns the unique id of a user. This is useful for permissions.",
    process: function(bot,msg,suffix) {
      if(suffix){
        var users = msg.channel.server.members.getAll("username",suffix);
        if(users.length == 1){
          msg.channel.send( "The id of " + users[0] + " is " + users[0].id)
        } else if(users.length > 1){
          var response = "multiple users found:";
          for(var i=0;i<users.length;i++){
            var user = users[i];
            response += "\nThe id of " + user + " is " + user.id;
          }
          msg.channel.send(response);
        } else {
          msg.channel.send("No user " + suffix + " found!");
        }
      } else {
        msg.channel.send( "The id of " + msg.author + " is " + msg.author.id);
      }
    }
  },
  "eval": {
    usage: "<command>",
    description: 'Executes arbitrary javascript in the bot process. User must have "eval" permission',
    process: function(bot,msg,suffix) {
      if(Permissions.checkPermission(msg.author,"eval")){
        msg.channel.send( eval(suffix,bot));
      } else {
        msg.channel.send( msg.author + " doesn't have permission to execute eval!");
      }
    }
  },
  "shell": {
    usage: "<pass to  shell>",
    description: 'Executes shell code as the bot. User must have "eval" permission',
    process: function(bot, msg, suffix) {
      if(Permissions.checkPermission(msg.author, "eval")){
        msg.channel.send("Executing Arbitrary Shell Script...",function(error,sentMsg){
          console.log("Executing Arbitrary Shell Script...");
            var spawn = require('child_process').spawn;
            var log = function(err,stdout,stderr){
              if(stdout){console.log(stdout);}
              if(stderr){console.log(stderr);}
            };
            var args = suffix.split(" ");
            var cmd = args[0];
            args.splice(0,1);
            console.log(JSON.stringify(args));
            var result = spawn(cmd, args);
            result.stdout.on('data',function(data){
              console.log(data.toString());
              msg.channel.send( data.toString());
            });
            result.stderr.on('data',function(data){
              console.log(data.toString());
              msg.channel.send( data.toString());
            });
            result.on("close",function(code){
              msg.channel.send("Execution Complete!");
            });
        });
      } else {
        msg.channel.send( msg.author + " doesn't' have permission to execute shell!");
      }
    }
  },
  "roll": {
    usage: "[max value]",
    description: "returns a random number between 1 and max value. If no max is specified it is 10",
    process: function(bot,msg,suffix) {
      var max = 10;
      if(suffix) max = suffix;
      var val = Math.floor(Math.random() * max) + 1;
      msg.channel.send(msg.author + " rolled a " + val);
    }
  },
  "msg": {
    usage: "<user> <message to leave user>",
    description: "leaves a message for a user the next time they come online",
    process: function(bot,msg,suffix) {
      var args = suffix.split(' ');
      var user = args.shift();
      var message = args.join(' ');
      if(user.startsWith('<@')){
        user = user.substr(2,user.length-3);
      }
      var target = msg.channel.server.members.get("id",user);
      if(!target){
        target = msg.channel.server.members.get("username",user);
      }
      messagebox[target.id] = {
        channel: msg.channel.id,
        content: target + ", " + msg.author + " said: " + message
      };
      updateMessagebox();
      msg.channel.send("message saved.")
    }
  },
  "say hello": {
    usage: "",
    description: "says hello!",
    process: function(bot,msg,suffix) {
      msg.channel.send("Hello!")
    }
  },
  "uptime": {
    usage: "",
    description: "Prints uptime",
    process: function(bot, msg, suffix) {
      msg.channel.send( "Up since: " + startTime.toString());
    }
  },
  "debug": {
    usage: "",
    description: "Dumps what plasmabot hears",
    process: function(bot, msg, suffix) {
      msg.channel.send( JSON.stringify(msg.content.replace("@","")));
    }
  },
  "amend": {
    usage: "<@user> <superlative# starting from 0> <amended text>",
    description: "Use to alter or correct a superlative",
    process: function(bot, msg, suffix) {
      var who = msg.content.match(/\s<\@([0-9]+)\>\s([0-9]+)\s(.*)/i)
      if (who != null)
      {
        console.log(who);
        var user = who[1];
        var superlative_id = who[2];
        var new_text = who[3];
        var target = msg.channel.server.members.get("id",user);
        if(!target){
          target = msg.channel.server.members.get("username",user);
        }
        if(!target){
          msg.channel.send("I don't know " + user);
          return;
        } else {
          if ((superlatives[target] != undefined) && (superlatives[target].length > superlative_id))
          {
            superlatives[target][superlative_id] = new_text;
            msg.channel.send( "Superlative updated!");
          } else {
            msg.channel.send("Target doesn't have " + (superlative_id + 1) + " superlatives.");
          }
          return;
        }
      } else {
        msg.channel.send("Couldn't understand what you wanted to amend.");
      }
    }
  },
  "trebek" : {
    description: "Gets a new Jeopardy question",
    process: function(bot, msg, suffix) {
      // Get clue
      if (currentTriviaQuestion != null) {
        msg.channel.send( "Well, the answer was: " + currentTriviaQuestion["answer"]);
      }
      triviaAnswerMarkers = {};
   
      Http.get(triviaURL + '/random?count=1', function(res){
        var body = '';
      
        res.on('data', function(chunk){
          body += chunk;
        });
      
        res.on('end', function(){
          currentTriviaQuestion = JSON.parse(body)[0];
          console.log("Got: " + JSON.stringify(currentTriviaQuestion));
          if (currentTriviaQuestion["invalid_count"] != null) {
            msg.channel.send( "Looks like this next one might be a bit off...");
          }
          console.log("value: " + currentTriviaQuestion["value"]);
          if(!isNumeric(currentTriviaQuestion["value"])) {
             currentTriviaQuestion = null;        
             commands["trebek"].process(bot, msg, suffix);
             return;
          }
          //Strip bad stuff from answer
          
          msg.channel.send( currentTriviaQuestion["category"]["title"] + " for $" + currentTriviaQuestion["value"] + ": " + currentTriviaQuestion["question"] + ".");
        });
      }).on('error', function(e){
        console.log("Error Requesting Clue: ", e);
        msg.channel.send( "Er, looks like I couldn't find a clue for you...");
      });
  
    }
  },
  "who" : {
    usage: "who <is/are> answer to question>",
    description: "Answers a Jeopardy question",
    process: function(bot, msg, suffix) {
      commands["what"].process(bot, msg, suffix);
    }
  },
  "what" : {
    usage: "what <is/are> <answer to question>",
    description: "Answers a Jeopardy question",
    process: function(bot, msg, suffix) {
      if (triviaAnswerMarkers[msg.author] == true) {
        msg.channel.send( "You've already tried and failed, give up.");
        return;
      }
      if (currentTriviaQuestion == null) {
        msg.channel.send( "Huh, there doesn't seem to be a question.");
        return;
      }
      var correct = sanitizeAnswer(currentTriviaQuestion["answer"]);
      var answer = sanitizeAnswer(suffix);
      
      if (triviaScores[msg.author] == undefined) {
          triviaScores[msg.author] = 0;
      }
      var similarity = answer.score(correct, triviaSimilarityThreshold);
      console.log(correct + " vs " + answer);
      console.log("Got answer with a similarity of " + similarity + "/" + triviaAccuracyThreshold);
      if (similarity >= triviaAccuracyThreshold) {  
        triviaScores[msg.author] += parseInt(currentTriviaQuestion["value"], 10);
        msg.channel.send( "That is correct " + msg.author + ", your score is now: $" + triviaScores[msg.author]);
        currentTriviaQuestion = null;
        triviaAnswerMarkers = {};
      } else {
        triviaScores[msg.author] -= parseInt(currentTriviaQuestion["value"], 10);
        msg.channel.send( "Nope! Sorry. Your score is now: $" + triviaScores[msg.author]);
        triviaAnswerMarkers[msg.author] = true;
      }
      require("fs").writeFile("./triviaScores.json", JSON.stringify(triviaScores,null,2), null);
    }
  },
  "scores" : {
    description: "prints trivia scores",
    process: function(bot, msg, suffix) {
      var scores = "";
      for(var player in triviaScores) {
        scores += player + ": $" + triviaScores[player] + "\n";
      }
      msg.channel.send( scores);
    }
  },
};

try{
  aliases = require("./alias.json");
} catch(e) {
  //No aliases defined
  aliases = {};
}

try{
  superlatives = require("./superlatives.json");
} catch(e) {
  //No superlatives defined
  superlatives = {};
}

try{
  messagebox = require("./messagebox.json");
} catch(e) {
  //no stored messages
  messagebox = {};
}
function updateMessagebox(){
  require("fs").writeFile("./messagebox.json",JSON.stringify(messagebox,null,2), null);
}

var fs = require('fs'),
  path = require('path');
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function load_plugins(){
  var plugin_folders = getDirectories("./plugins");
  for (var i = 0; i < plugin_folders.length; i++) {
    var plugin;
    try{
      var plugin = require("./plugins/" + plugin_folders[i])
    } catch (err){
      console.log("Improper setup of the '" + plugin_folders[i] +"' plugin. : " + err);
    }
    if (plugin){
      if("commands" in plugin){
        for (var j = 0; j < plugin.commands.length; j++) {
          if (plugin.commands[j] in plugin){
            commands[plugin.commands[j]] = plugin[plugin.commands[j]];
          }
        }
      }
    }
  }
  console.log("Loaded " + Object.keys(commands).length + " chat commands type !help in Discord for a commands list.")
}

bot.on("ready", function () {
  console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
  load_plugins();
});

bot.on("message", function (msg) {
  //check if message is a command
  var flips = msg.content.match(/(\(╯°□°\）╯︵ ┻━┻)/g);
  {
    if(flips != null)
    {
      var str = "";
      flips.forEach(function(){
        str += ("┬─┬﻿ ノ( ゜-゜ノ)\t");
      });
      msg.channel.send( str);
    }
  }

  var who = msg.content.match(/\<\@([0-9]+)\>\swho\sis\s\<\@([0-9]+)\>/i)
  if (who != null)
  {
    console.log(who);
    var user = who[2];
    var target = msg.channel.server.members.get("id",user);
    if(!target){
      target = msg.channel.server.members.get("username",user);
    }
    if(!target){
      msg.channel.send("I don't know " + user);
      return;
    } else {
      var message = target + " is ";
      for(var superlative in superlatives[target])
      {
        message += superlatives[target][superlative] + ", ";
      }
      message = message.substring(0, message.length-2) + ".";
      msg.channel.send(message);
      return;
    }
    
  }

  var whois = msg.content.match(/\<\@([0-9]+)\>\s\<\@([0-9]+)\>\sis\s(.*)/i);
  if (whois != null)
  {
    console.log(whois);
    var user = whois[2];
    var superlative = whois[3];
    var target = msg.channel.server.members.get("id",user);
    if(!target){
      target = msg.channel.server.members.get("username",user);
    }
    if(!superlatives.hasOwnProperty(target))
    {
      superlatives[target] = [];
    }
    superlatives[target].push(superlative);
    console.log(target + " is now " + superlative);
    console.log(superlatives[target]);
    require("fs").writeFile("./superlatives.json",JSON.stringify(superlatives,null,2), null);
    msg.channel.send( "Alright, " + target + " is " + superlative);
    return;
  }
  
  if(msg.author.id != bot.user.id && (msg.content[0] === '!' || msg.content.indexOf(bot.user.mention) == 0)){
    console.log("treating " + msg.content + " from " + msg.author + " as command");
    var cmdTxt = msg.content.split(" ")[0].substring(1);
      var suffix = msg.content.substring(cmdTxt.length+2);//add one for the ! and one for the space
      if(msg.content.indexOf(bot.user.mention()) == 0){
        try {
          cmdTxt = msg.content.split(" ")[1];
          suffix = msg.content.substring(bot.user.mention().length+cmdTxt.length+2);
        } catch(e){ //no command
          msg.channel.send("Yes?");
          return;
        }
      }
    alias = aliases[cmdTxt];
    if(alias){
      cmdTxt = alias[0];
      suffix = alias[1] + " " + suffix;
    }
    var cmd = commands[cmdTxt];
        if(cmdTxt === "help"){
            //help is special since it iterates over the other commands
      msg.author.send("Available Commands:", function(){
        for(var cmd in commands) {
          var info = "!" + cmd;
          var usage = commands[cmd].usage;
          if(usage){
            info += " " + usage;
          }
          var description = commands[cmd].description;
          if(description){
            info += "\n\t" + description;
          }
          msg.author.send(info);
        }
      });
        }
    else if(cmd) {
      try{
        cmd.process(bot,msg,suffix);
      } catch(e){
        msg.channel.send( "command " + cmdTxt + " failed :(\n" + e.stack);
      }
      //if ("process" in cmd ){ 
      //  cmd.process(bot,msg,suffix);
      //}
    } else {
      msg.channel.send( "Invalid command " + cmdTxt);
    }
  } else {
    //message isn't a command or is from us
        //drop our own messages to prevent feedback loops
        if(msg.author == bot.user){
            return;
        }
        
        if (msg.author != bot.user && msg.isMentioned(bot.user)) {
                msg.channel.send(msg.author + ", you called?");
        }
    }
});

//Log user status changes
bot.on("presence", function(user,status,gameId) {
  //if(status === "online"){
  //console.log("presence update");
  console.log(user+" went "+status);
  //}
  try{
    if(status != 'offline'){
      if(messagebox.hasOwnProperty(user.id)){
        console.log("found message for " + user.id);
        var message = messagebox[user.id];
        var channel = bot.channels.get("id",message.channel);
        delete messagebox[user.id];
        updateMessagebox();
        channel.send(message.content);
      }
    }
  } catch(e) {
    powerCycle();
  }
});

var retries = 5;

bot.on('disconnected', function(){
  console.log("Disconnected, attempting reconnect");
  if(retries > 0)
  {
    setTimeout(function(){  
      try {
        bot.login(AuthDetails.email, AuthDetails.password, function(error, token){
          if(error)
          {
            console.log("Could not login: " + error);
          }
          else 
          {
            retries = 5;
          }
        });
      } catch (e){
        console.log("Error: " + e);
        powerCycle();
      }
    }, 5000);
    retries = retries - 1;
  }
  else
  {
    console.log("Retried 5 times... sending system reboot");
    powerCycle();
  }
});

<<<<<<< HEAD
bot.login(token);
=======
bot.login(AuthDetails.token);
>>>>>>> d4881ee52666f3410290c33d59dd451bf612115e
