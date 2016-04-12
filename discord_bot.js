var Discord = require("discord.js");
var Exec    = require('child_process').exec;
var startTime = new Date();
// Get the email and password
try {
  var AuthDetails = require("./auth.json");
} catch (e){
  console.log("Please create an auth.json like auth.json.example with at least an email and password.");
  process.exit();
}
//instead of MAD INSECURE auth.json
//use environment variables like a sane fucking person
//AuthDetails.email = process.env.DISCORD_EMAIL;
//stiiiiill insecure
//AuthDetails.password = process.env.DISCORD_PASSWORD;

function powerCycle()
{
  console.log("Attempting powerCycle");
  Exec('sudo /sbin/reboot', function(error, stdout, stderr){
    console.log(stdout);
    console.error(stderr);
    process.exit();
  });
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
            bot.sendMessage(msg.channel, msg.sender+" pong!");
            if(suffix){
                bot.sendMessage(msg.channel, "note that !ping takes no arguments!");
            }
        }
    },
    "servers": {
        description: "lists servers bot is connected to",
        process: function(bot,msg){bot.sendMessage(msg.channel,bot.servers);}
    },
    "channels": {
        description: "lists channels bot is connected to",
        process: function(bot,msg) { bot.sendMessage(msg.channel,bot.channels);}
    },
    "myid": {
        description: "returns the user id of the sender",
        process: function(bot,msg){bot.sendMessage(msg.channel,msg.author.id);}
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
        process: function(bot,msg,suffix){ bot.sendMessage(msg.channel,suffix);}
    },
    "update": {
        description: "bot will perform a git pull master and restart with the new code",
        process: function(bot,msg,suffix) {
            
              bot.sendMessage(msg.channel,"fetching updates...",function(error,sentMsg){
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
                              bot.sendMessage(msg.channel,"brb!",function(){
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
                bot.sendMessage(msg.channel,data);
            });
            commit.on('close',function(code) {
                if( code != 0){
                    bot.sendMessage(msg.channel,"failed checking git version!");
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
                    bot.sendMessage(msg.channel,"failed to join: " + error);
                } else {
                    console.log("Joined server " + server);
                    bot.sendMessage(msg.channel,"Successfully joined " + server);
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
        bot.sendMessage(msg.channel,"!alias " + this.usage + "\n" + this.description);
      } else if(commands[name] || name === "help"){
        bot.sendMessage(msg.channel,"overwriting commands with aliases is not allowed!");
      } else {
        var command = args.shift();
        aliases[name] = [command, args.join(" ")];
        //now save the new alias
        require("fs").writeFile("./alias.json",JSON.stringify(aliases,null,2), null);
        bot.sendMessage(msg.channel,"created alias " + name);
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
          bot.sendMessage(msg.channel, "The id of " + users[0] + " is " + users[0].id)
        } else if(users.length > 1){
          var response = "multiple users found:";
          for(var i=0;i<users.length;i++){
            var user = users[i];
            response += "\nThe id of " + user + " is " + user.id;
          }
          bot.sendMessage(msg.channel,response);
        } else {
          bot.sendMessage(msg.channel,"No user " + suffix + " found!");
        }
      } else {
        bot.sendMessage(msg.channel, "The id of " + msg.author + " is " + msg.author.id);
      }
    }
  },
  "eval": {
    usage: "<command>",
    description: 'Executes arbitrary javascript in the bot process. User must have "eval" permission',
    process: function(bot,msg,suffix) {
      if(Permissions.checkPermission(msg.author,"eval")){
        bot.sendMessage(msg.channel, eval(suffix,bot));
      } else {
        bot.sendMessage(msg.channel, msg.author + " doesn't have permission to execute eval!");
      }
    }
  },
  "shell": {
    usage: "<pass to  shell>",
    description: 'Executes shell code as the bot. User must have "eval" permission',
    process: function(bot, msg, suffix) {
      if(Permissions.checkPermission(msg.author, "eval")){
        bot.sendMessage(msg.channel,"Executing Arbitrary Shell Script...",function(error,sentMsg){
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
              bot.sendMessage(msg.channel, data.toString());
            });
            result.stderr.on('data',function(data){
              console.log(data.toString());
              bot.sendMessage(msg.channel, data.toString());
            });
            result.on("close",function(code){
              bot.sendMessage(msg.channel,"Execution Complete!");
            });
        });
      } else {
        bot.sendMessage(msg.channel, msg.author + " doesn't' have permission to execute shell!");
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
      bot.sendMessage(msg.channel,msg.author + " rolled a " + val);
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
      bot.sendMessage(msg.channel,"message saved.")
    }
  },
  "say hello": {
    usage: "",
    description: "says hello!",
    process: function(bot,msg,suffix) {
      bot.sendMessage(msg.channel,"Hello!")
    }
  },
  "uptime": {
    usage: "",
    descriptiion: "Prints uptime",
    process: function(bot, msg, suffix) {
      bot.sendMessage(msg.channel, "Up since: " + startTime.toString());
    }
  },
  "debug": {
    usage: "",
    description: "Dumps what plasmabot hears",
    process: function(bot, msg, suffix) {
      bot.sendMessage(msg.channel, JSON.stringify(msg.content.replace("@","")));
    }
  }
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

var bot = new Discord.Client();

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
      bot.sendMessage(msg.channel, str);
    }
  }

  var who = msg.content.match(/\<\@([0-9]+)\>\swho\sis\s\<\@([0-9]+)\>/g)
  if (who != null)
  {
    console.log(who);
    var user = who[2];
    if(user.startsWith('<@')){
      user = user.substr(2,user.length-3);
    }
    var target = msg.channel.server.members.get("id",user);
    if(!target){
      target = msg.channel.server.members.get("username",user);
    }
    if(!target){
      bot.sendMessage(msg.channel,"I don't know " + user);
      return;
    } else {
      var message = target + " is ";
      for(var superlative in superlatives[target])
      {
        message += superlatives[target][superlative] + ", ";
      }
      message = message.substring(0, message.length-2) + ".";
      bot.sendMessage(msg.channel,message);
      return;
    }
    
  }

  var whois = msg.content.match(/\<\@([0-9]+)\>\s\<\@([0-9]+)\>\sis\s(.*)/g);
  if (whois != null)
  {
    var user = whois[2];
    var superlative = whois[3];
    if(user.startsWith('<@')){
      user = user.substr(2,user.length-3);
    }
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
    bot.sendMessage(msg.channel, "Alright, " + target + " is " + superlative);
    return;
  }
  
  
  if(msg.author.id != bot.user.id && (msg.content[0] === '!' || msg.content.indexOf(bot.user.mention()) == 0)){
    console.log("treating " + msg.content + " from " + msg.author + " as command");
    var cmdTxt = msg.content.split(" ")[0].substring(1);
      var suffix = msg.content.substring(cmdTxt.length+2);//add one for the ! and one for the space
      if(msg.content.indexOf(bot.user.mention()) == 0){
        try {
          cmdTxt = msg.content.split(" ")[1];
          suffix = msg.content.substring(bot.user.mention().length+cmdTxt.length+2);
        } catch(e){ //no command
          bot.sendMessage(msg.channel,"Yes?");
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
      bot.sendMessage(msg.author,"Available Commands:", function(){
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
          bot.sendMessage(msg.author,info);
        }
      });
        }
    else if(cmd) {
      try{
        cmd.process(bot,msg,suffix);
      } catch(e){
        bot.sendMessage(msg.channel, "command " + cmdTxt + " failed :(\n" + e.stack);
      }
      //if ("process" in cmd ){ 
      //  cmd.process(bot,msg,suffix);
      //}
    } else {
      bot.sendMessage(msg.channel, "Invalid command " + cmdTxt);
    }
  } else {
    //message isn't a command or is from us
        //drop our own messages to prevent feedback loops
        if(msg.author == bot.user){
            return;
        }
        
        if (msg.author != bot.user && msg.isMentioned(bot.user)) {
                bot.sendMessage(msg.channel,msg.author + ", you called?");
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
        bot.sendMessage(channel,message.content);
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

bot.login(AuthDetails.email, AuthDetails.password);
