'used strict';
exports.id='StarlitExpanse';
const mixwith = require('mixwith');

function StarlitExpanse() {
  // Saved state
  this.players = {};
  this.parties = {};
  this.adventures = {};
  this.questions = {};
  // Not Saved
  this.bot = null;
  this.guild = null;
  this.channels = [];
  
  this.commands = {
    'leaveparty' : {
      help_text: "Leave your current party. Will be disbanded if you are leader.",
      usage: "leave party",
      process: function(user_id, command, channel) {
        this.Confirmation(user_id, "Really abandon the party?", function() {
          this.removeUserFromParty(user_id, this.players[user_id].party);
        }.bind(this));
        return true;
      }.bind(this)
    },
    'formparty': {
      help_text: "Forms a party with you as leader.",
      usage: "form party",
      process: function(user_id, command, channel) {
        if (this.players[user_id].party != null) {
          this.Whisper(user_id, "You must leave your party before starting a new one.");
        } else {
          this.parties[user_id] = new Party(this.players[user_id]);
          this.Say(channel, this.players + " formed a party!");
        }
        return true;
      }.bind(this)
    },
    'adventure': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        var adventure_name = command.split(/ (.+)/)[1];
        var start_adventure = function() {
          try {
            var adventure = require("./Adventures/" + adventure_name);
            this.adventures[user_id] = adventure;
          } catch(e) {
            console.log("=========Fault =========");
            console.log("From: " + user_id);
            console.log("CMD: \"" + command + "\"");
            console.log(e.stack);
            console.log("========================");
          }
        }.bind(this);
        if (user_id in this.adventures) {
          this.Confirmation(user_id, "Abandon your current quest?", start_adventure);
        } else {
          start_adventure();
        }
        return true;
      }.bind(this)
    },
    'stop': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'retire': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'newcharacter': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        if (this.players.hasOwnProperty(user_id)) {
          this.Confirmation(user_id, "Overwrite " + this.players[user_id].name + "?", function() {
            this.players[user_id] = new Player(user_id);
            this.CharacterGen(this.players[user_id]);
          }.bind(this));
        } else {
          this.players[user_id] = new Player(user_id);
          this.CharacterGen(this.players[user_id]);
        }
        return true;
      }.bind(this)
    },
    'attack': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'talk': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'protect': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }
    },
    'cast': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'enter': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'leave': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'exit': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'board': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'climb': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'descend': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'ascend': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }
    },
    'look': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'glance': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'examine': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'describe': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'check': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'exits': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'doors': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'inventory': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'sell': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'buy': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'lock': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'unlock': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'destroy': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    //"repair",
    //"build",
    'close': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'open': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    //"connect",
    //"join",
    'get': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'take': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'put': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'drop': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }
    },
    'makeleader': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'level': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }
    },
    'status': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'stats': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'character': {
      help_text: "Prints all charater info.",
      usage: "charater",
      process: function(user_id, command) {
        if (this.players.hasOwnProperty(user_id)) {
          this.Whisper(user_id, this.players[user_id].ToMessage());
          return true;
        } 
        return false;
      }.bind(this)
    },
    'eat': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'drink': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'use': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'give': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'sleep': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'quaff': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'apply': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'skills': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'defend': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'quest': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'challenge': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'accept': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'reject': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'cancel': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'levelup': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'advance': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'throw': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'identify': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'appraise': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'list': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'pray': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'follow': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'abandon': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'vote': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'found': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'pay': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'donate': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'deposit': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'withdraw': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'craft': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'enchant': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    },
    'claim': {
      help_text: "",
      usage: "",
      process: function(user_id, command, channel) {
        return true;
      }.bind(this)
    }
  };
}

StarlitExpanse.prototype.AddChannel = function(channel_id) {
  this.channels.push(channel_id); 
}

StarlitExpanse.prototype.RemoveChannel = function(channel_id) {
  this.channels.remove(channel_id);
}

StarlitExpanse.prototype.isEnabledOn = function(channel_id) {
  return this.channels.includes(channel_id);
}

StarlitExpanse.prototype.ConnectDiscordBot = function(discord_bot, guild) {
  this.bot = discord_bot;
  this.guild = guild;
}

StarlitExpanse.prototype.Whisper = function(user_id, message) {
  console.log("Whispering \"" + message + "\" to " + user_id);
  var user = this.bot.users.find('id',user_id);
  user.send(message);
}

StarlitExpanse.prototype.Say = function(channel, message){
  channel.send(message);
}

StarlitExpanse.prototype.Shout = function(message) {
  for(var channel in this.channels) {
    channel.send(message);
  }
}

StarlitExpanse.prototype.ProcMessage = function(msg) {
  if (msg.author.id == this.bot.user.id) return;
  console.log("SLEX: Got \"" + msg.content + "\" from " + msg.author.id);
  
  if (this.questions.hasOwnProperty(msg.author.id)) {
    console.log("Treating as answer");
    this.TranslateAnswer(msg.author.id, msg.content);
    return;
  } 
  var cmdTxt;
  var suffix;
  if (msg.content[0] === '!') {
    var cmdTxt = msg.content.split(" ")[0].substring(1).toLocaleLowerCase();
    var suffix = msg.content.substring(cmdTxt.length+1);//add one for the ! and one for the space
  }
  if (msg.isMentioned(this.bot.user)) {
    try {
      var payload = msg.content.split(this.bot.user)[1].trim(); 
      cmdTxt = payload.split(" ")[0];
      suffix = payload.substring(cmdTxt.length+1);
      console.log(payload + "<" + cmdTxt + " \"" + suffix + "\">");
    } catch(e){ //no command
      msg.channel.send("Yes?");
      return;
    }
  }
  var cmd = this.commands[cmdTxt];
  if (cmdTxt === "help"){
    //help is special since it iterates over the other commands
    this.Whisper(msg.author.id, "RPG Commands:\n");
    for(var cmd in this.commands) {
        var help_str = "`" + cmd + "`:";
        var usage = this.commands[cmd].usage;
        if(usage){
          help_str += " " + usage;
        }
        var description = this.commands[cmd].help_text;
        if(description){
          help_str += "\n\t" + description;
        }
        this.Whisper(msg.author.id, help_str);
    }
  } else if (cmd) {
    try{
      cmd.process(msg.author.id, suffix, msg.channel);
    } catch(e){
      msg.channel.send( "command " + cmdTxt + " failed :(\n" + e.stack);
    }
  } else {
    msg.channel.send( "Invalid RPG command " + cmdTxt);
  }
}

StarlitExpanse.prototype.PoseQuestion = function(user_id, question) {
  this.questions[user_id] = question;
  var q_text = question['text'];
  if (!question['silent'] && question['choices'] != null) {
    for(var i = 0; i < question['choices'].length; ++i) {
      var choice = question['choices'][i];
      q_text += "\n" + i + ": ";
      q_text += choice['text'].replace(
        choice['keyword'],
        "`" + choice['keyword'] + "`");
    }
  }
  this.Whisper(user_id, q_text);
}

StarlitExpanse.prototype.ClearQuestion = function(user_id) {
  if (this.questions.hasOwnProperty(user_id))
    delete this.questions[user_id];
}

StarlitExpanse.prototype.TranslateAnswer = function(user_id, result) {
  var q = this.questions[user_id];
  if (((q['choices'] == null) || (q['choices'].length == 0)) && q['callback'] != null) {
    return q['callback'](user_id, q, result);
  }
  console.log("Checking Choices");
  for(var i = 0; i < q['choices'].length; ++i) {
    if (result == i ||
        result == q['choices'][i].keyword ||
        result == q['choices'][i].text) {
      delete this.questions[user_id];
      return q['choices'][i]['callback'](user_id, q, result);
    }
  }

  if (q.hasOwnProperty('invalid_callback')) {
    console.log("Invalid Handler:");
    return q['invalid_callback'](user_id, q, result);
  } else {
    console.log("Dropping question");
    return false;
  }
}

StarlitExpanse.prototype.Confirmation = function(user_id, text, yes_callback) {
  var q = {
    'text' : text,
    'choices' : [
      {'text' : "Yes",
        'keyword' : "yes",
        'index' : 1,
        'callback' : yes_callback
      },
      {'text' : "No",
        'keyword' : "no",
        'index' : 2,
        'callback' : function() {
          this.Whisper(user_id, "Understood.");
        }.bind(this)
      }
    ]
  };
}

StarlitExpanse.prototype.Party = function(player) {
  this.formed = false;
  this.leader_id = player.user_id;
  this.players = [player];
  player.party = this;
}

StarlitExpanse.prototype.addUserToParty = function(user_id, party) {
  if (party.players.includes(this.players[user_id])) {
    return;
  }
  party.players.push(this.players[user_id]);
  this.players[user_id].party = party;
}

StarlitExpanse.prototype.removeUserFromParty = function(user_id, party) {
  if(user_id == party.leader_id)
    return this.disbandParty(party);
  else {
    if (party.players.includes(this.players[user_id])) {
      party.players.remove(this.players[user_id]);
      this.players[user_id].party = null;
      this.Whisper(user_id, "You have left the party");
      return true;
    }
    return false;
  }
}

StarlitExpanse.prototype.disbandParty = function(party) {
  for(var player in party.players) {
    player.party = null;
    this.Whisper(player.user_id, "The party is disbanded");
  }
  party.players = [];
  delete this.parties[party.leader_id];
  party.leader_id = null;
}

var MakeQuestion = function(text, choices) {
  var q = {
    'text' : text,
    'choices' : choices,
    'silent' : false
  };
  return q;
}

var MakeChoices = function(options) {
  for(var i = 0; i < options.length; ++i) {
    options[i]['keyword'] = options[i]['text'].split(" ")[0].toLowerCase();
  }
  return options;
}

StarlitExpanse.prototype.inviteToParty = function(party, user_ids) {
  var question_text = this.players[party.leader_id].name +
    " has invited you to a party with";
  for(var user_id in user_ids) {
    if (!this.parties.hasOwnProperty(user_id) &&
        this.players.hasOwnProperty(user_id) &&
        !this.players[user_id].party == null) {
      question_text += " " + this.players[user_id].name;
    } else {
      this.Whisper(party.leader_id, "Could not invite " + user_id);
    }
  }
  question_text += ".";

  for(var user_id in user_ids) {
    var q = MakeQuestion(question_text, MakeChoices([{ 
      'text' : "Join the party",
      'callback': function(user_id, q, result) {
        if(this.players[user_id].party == null) {
          this.addUserToParty(user_id, party);
          this.Whisper(user_id, "You have joined " + this.players[party.leader_id].name + "'s Party.");
        } else {
          this.Whisper(user_id, "You are already in a party!");
        }
      }.bind(this)
    },
    { 
      'text': "Reject the offer",
      'callback' : function(user_id, q, result){
        this.Shout(this.players[user_id] +
          " did not join "
          + this.players[party.leader_id] +
          "'s Party.");
      }.bind(this)
    }]));
    this.PoseQuestion(user_id, q);
  }
}

//A basic encounter or building block of an adventure
let Describable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.name = "Nothing";
    this.description = "Nothing to describe.";
  }
}

let Attackable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this._hp = 1;
    this._defense = 1;
    this._evasion = 1;
  }
  
  //Use getters to allow overrides for computing
  get hp() {
    return this._hp;
  } 

  get defense() {
    return this._defense;
  }

  get evasion() {
    return this._evasion;
  }
}

let Statable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.bypass_stats = {};
    this.bypassed = false;
    this.bypassed_description = "Open";
    this.nonbypassed_description = "Closed";
  }
  
  addBypassStat(stat, difficulty, trigger) {
    this.bypass_stats[stat] = {difficulty, trigger};
  }
  
  bypass(player,stat) {
    if (stat in this.bypass_stats) {
      var value = player.rollStat(stat);
      if (value > this.bypass_stats[stat].difficulty) {
        if (this.bypass_stats[stat].trigger !== undefined) {
          this.bypass_stats[stat].trigger(this, player);
        } else {
          this.bypassed = true;
          return true;
        }
      }
    } else {
      return false;
    }
  }
}

let Atmospheric = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.breathable = true;
    this.toxicity = 0;
    this.pressure = 1;
    this.temperature = 20;
  }
}

let Container = (superclass) => class extends superclass {
  constructor(...args) {
    this.inventory_size = 1;
    this.inventory = {};
  }
  
  add(item, q = 1) {
    if (item.name in this.inventory) {
      this.inventory[item.name].quantitiy += q;
    } else {
      this.inventory[item.name] = {
        quantitiy: q,
        item: item
      };
    }
  }
  
  remove(item, q = 1) {
    if (item.name in this.inventory) {
      if (q = 0 || this.inventory[item.name.quantitiy <= q]) {
        delete this.inventory[item.name];
      } else {
        this.inventory[item.name].quantitiy -= q;
      }
    }
  }
}

let Ownable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.faction = null;
    this.owner = null;
  }
}

let Takeable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.taken = false;
  }
  
  addTo(container) {
    this.taken = true;
    container.add(this);
  }
}

let Usable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.verbs = {};
  }
  
  use(player,verb) {
    if(this.verbs.hasOwnProperty(verb)) {
      var action = this.verbs[verb];
      if (action.uses > 0) {
        action.uses -= 1;
        return action.callback(player, action, this);
      } else {
        return this.name + " has no " + action.use_name || "uses" + " remaining.";
      }
    } else {
      return this.name + " does not respond to " + verb;
    }
  }
  
  addAction(verb, use_name, callback, uses, max_uses) {
    this.verbs[verb] = {
      'use_name': use_name,
      'callback': callback,
      'uses' : uses || 1,
      'max_uses' : max_uses || uses || 1
    };
  }
}

let Tradeable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.value = 1;
  }
}

let Equipment = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.slots = ["None"];
    this.stats = new StatBlock();
  }
}

let Equipable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.equipment_slots = {};
  }
  
  equip(equipment) {
    var i;
    for(i = 0; i < equipment.slots.length; ++i) {
      if (!this.equipment_slots.hasOwnProperty(equipment.slots[i])) {
        return false;
      }
    }
    for(i = 0; i < equipment.slots.length; ++i) {
      this.unequip(equipment.slots[i]);
      this.equipment_slots[equipment.slots[i]] = equipment;
    }
    this.equipment_stats.add(equipment.equipment_stats);
    return true;
  }
  
  unequip(slot) {
    var item;
    if (this.equipment_slots.hasOwnProperty(slot)) {
      item = this.equipment_slots[slot];
    } else {
      return;
    }

    for(var key in this.equipment_slots) {
      if (this.equipment_slots.hasOwnProperty(key)) {
        if (this.equipment_slots[key] === item) {
          this.equipment_slots = null;
        }
      }
    }
    this.stats.subtract(item.equipment_stats);
  }
}

let Trigger = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.triggered = false;
    this.reset_time = 0;
  }
}

let Triggerable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.triggers = [];
    this.trigger_logic = "AND"; //OR, NOR, XOR
    this.reset_time = 0;
  }
  
  isTriggered() {
    var t = this.Triggers();
    var state = true;
    
    switch(this.TriggerLogic()) {
      case "AND":
        state = true;
        for(var i = 0; i < t.length; ++i) {
          if (t[i].Triggered() == false) {
            return false;
          }
        }
        break;
      case "OR":
        state = false;
        for(var i = 0; i < t.length; ++i) {
          if (t[i].Triggered() == true) {
            return true;
          }
        }
        break;
      //case "NOR":
        
      //  break;  
      //case "XOR":
      //  break;
      default:
        if (t.length > 0)
          state = t[0].Triggered();
        break;
    }
    return state;
  }
}

let Lockable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.locks = [];
    this.open = false;
    this.locked_description = "Locked";
    this.unlocked_description = "Unlocked";
    this.keys = [];
  }
  
  get description() {
    return this.open ? this.unlocked_description : this.locked_description;
  }
  
  addKey(item_name) {
    this.keys.push(item_name);
  }
  
  checkKey(player) {
    for(var i = 0; i < this.keys.length; ++i) {
      if (player.inventory.includes(this.keys[i])) {
        return true;
      }
    }
    return false;
  }
}

let Transporter = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.forward = null;
    this.backward = null;
  }
}

let Intelligent = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.aistate = "Idle";
    this.morale = 0;
    this.ai_script = "ai.js";
  }
}

let Enchantable = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.magic_rating = 0;
    this.magic_effects = [];
  }
}

class Lock extends mixwith.mix(Object).with(
  Describable,
  Lockable,
  Attackable,
  Triggerable,
  Trigger,
  Statable) {
  constructor(...args) {
    super(...args);
  }
}

class Trap extends mixwith.mix(Object).with(
  Describable,
  Attackable,
  Triggerable,
  Statable) {
  constructor(...args) {
    super(...args);
  } 
}

class Chest extends mixwith.mix(Lock).with(Container, Ownable) {
  constructor(...args) {
    super(...args);
  }
}

class Door extends mixwith.mix(Lock).with(Ownable, Transporter) {
  constructor(...args) {
    super(...args);
    this.exit = false;
  }
  
  connectRooms(forwards, backwards) {
    this.forward = forwards;
    forwards.doors.push(this);
    this.backwards = backwards;
    backwards.doors.push(this);
  }
}

class Mob extends mixwith.mix(Object).with(
  Describable,
  Attackable,
  Trigger) {
  constructor(...args) {
    super(...args);
  }
}

//A physical room or place with features
class Room extends mixwith.mix(Object).with(
  Describable,
  Atmospheric,
  Ownable) {
  constructor(...args) {
    super(...args);
    this.doors = [];
    this.features = [];
  }
  
  addFeature(feature) {
    this.features.push(feature);
  }
}

class Combat {
}

class Encounter {
}

class Adventure extends mixwith.mix(Object).with(Describable) {
  constructor(...args) {
    super(...args);
    this.intro = "A fun adventure! Rewards 10Cr.";
    this.reward = { 'Cr': 10, 'xp': 0 };
    this.start = null;
    this.rooms = [];
  }
  
  addRoom(room) {
    if (this.start == null) {
      this.start = room;
    }
    this.rooms.push(room);
  }
}

class Item extends mixwith.mix(Object).with(
  Describable,
  Ownable,
  Tradeable,
  Takeable,
  Enchantable,
  Trigger,
  Usable) {
  constructor(...args) {
    super(...args);
  }
}

var stat_names = [
  "speed",
  "reaction",
  "acuity",
  "balance",
  "strength",
  "endurance",
  "resistance",
  "vitality",
  "intellect",
  "awareness",
  "will",
  "corruption",
  "spirit",
  "fate",
  "luck",
  "psionic_generation",
  "psionic_circulation",
  "psionic_retention",
  "psionic_manipulation"
];

const stat_pad = stat_names.reduce(function (a, b) { return a.length > b.length ? a : b; }).length;

function getTier(stat) {
  if (!stat_names.includes(stat)) return "Null";
  var t;
  switch(Math.floor(this[stat] / 25)) {
    case 0:
      t = "Inept";
      break;
    case 1:
      t = "Mediocre";
      break;
    case 2:
      t = "Able";
      break;
    case 3:
      t = "Competent";
      break;
    case 4:
      t = "Dedicated";
      break;
    case 5:
      t = "Proficient";
      break;
    case 6:
      t = "Superior";
      break;
    case 7:
      t = "Heroic";
      break;
    case 8:
      t = "Mastered";
      break;
    default:
      t = "Transcendant";
      break;
  }
  return t;
}

function roll(stat_value) {
  if (stat_value <= 1) return stat_value;
  var min = Math.ceil(stat_value/2);
  var max = stat_value + Math.floor(stat_value/2);
  return Math.floor(Math.random() * (max - min)) + min;
}

var difficulties = {
  'trivial' : 2, //can be hit with a 2 in a stat, 3 auto succeeds
  'easy' : 6, //can be hit with a 4 in a stat, 12 auto succeeds
  'simple' : 12, //can be hit with a 8 in a stat, 24 auto succeeds
  'mundane' : 24, //can be hit with a 16 in a stat, 48 auto succeeds
  'challenging' : 48, //can be hit with 32 in a stat, 96 auto succeeds
  'frustrating' : 96, //can be hit with a 64 in a stat, 192 auto succeeds
  'egregious' : 192, //can be hit with a 128 in a stat, 384 auto succeeds
  'impossible' : 384 //can be hit with a 256 in a stat, 786 auto succeeds
}

let StatBlock = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    for(var stat_idx in stat_names) {
      this[stat_names[stat_idx]] = 0;
    }
  }

  statBlockMessage() {
    var str = "Stats\n```";
    for(var stat_idx in stat_names) {
      str += "\n"
      + stat_names[stat_idx]
      +":";
      for(var i = 0; i < stat_pad - stat_names[stat_idx].length; ++i) {
        str += " ";
      }
      str += this[stat_names[stat_idx]];
    }
    return str + "```";
  }
  
  rollStat(stat) {
    if (stat_names.includes(stat)) {
      return roll(this[stat]);
    } else {
      return 0;
    }
  }
  
  add(stat_block) {
    for(var stat_idx in stat_names) {
      this[stat_names[stat_idx]] += stat_block[stat_names[stat_idx]];
    }
  }
  
  subtract(stat_block) {
    for(var stat_idx in stat_names) {
      this[stat_names[stat_idx]] -= stat_block[stat_names[stat_idx]];
    }
  }
}

class Levelable extends mixwith.mix(Object).with(StatBlock) {
  constructor(...args) {
    super(...args);
    this.xp = 0;
    this.past_xp = 0;
    this.highest_stat = {'name': stat_names[0], 'value': 1};
  }

  SpendXP(stat, xp) {
    if (!stat_names.includes(stat) ||
        this.xp < xp) {
      return false;
    }
    
    this.xp -= xp;
    this.past_xp += xp;
    this[stat] += xp;
    if (this[stat] > this.highest_stat.value) {
      this.highest_stat.value = this[stat];
      this.highest_stat.name = stat;
    }
    return true;
  }
  
  get level() {
    return Math.floor(this.past_xp / 25);
  }
  
}

class Player extends mixwith.mix(Levelable).with(Describable, Trigger, Attackable, Equipable) {
  constructor(user_id, ...args) {
    super(...args);
    this.name = "Emanon"; 
    this.expertise = [];
    this.lore = [];
    this.skills = [];
    this.equipment = {};
    this.paragon_power = null;
    this.exemplar_power = null;
    this.status = [];  
    this.user_id = user_id;
    this.inventory = [];
    
    this.party = null;
    for(var stat_idx in stat_names) {
      this[stat_names[stat_idx]] = 1;
    }
  }
}

StarlitExpanse.prototype.LevelUp = function(player) {
  if (player.xp <= 0) {
    return true;
  } else {
    this.Whisper(player.user_id, "You have " + player.xp + " points remaining.");
    var question = {
      'text' : 'Spend a point... (\"list\" to list attributes)',
      'silent' : true,
      'callback' : function(user_id, q, result) {
        if (result.toLowerCase() == "list") {
          this.Whisper(user_id, player.statBlockMessage());
          this.LevelUp(player);
          return;
        }
        if (player.xp < 1) {
          this.Whisper(user_id, "You don't have any XP to spend.");
          this.ClearQuestion(player.user_id);
          return;
        }
        var result = result.split(" ", 2);
        var amount = NaN;
        if (result.length == 1) {
          amount = 1;
        } else {
          amount = parseInt(result[1], 10);
        }
        
        if(isNaN(amount) || amount < 1) {
          this.Whisper(user_id, "Amount is invaild for " + result[0]);
          this.LevelUp(player);
          return;
        } else {
          if (player.SpendXP(result[0], amount)) {
            if (player.xp < 1) {
              this.Whisper(user_id, "LevelUp Complete");
              this.ClearQuestion(player.user_id);
            }
            this.LevelUp(player);
            return;
          } else {
            this.Whisper(user_id, "You cannot spend " + amount + " on " + result);
            this.LevelUp(player);
            return;
          }
        }
      }.bind(this)
    };
    this.PoseQuestion(player.user_id, question);
  }
}

StarlitExpanse.prototype.CharacterGen = function(player) {
  //Name
  var q = MakeQuestion('What is your name?', null);
  q['silent'] = true;
  q['callback'] = function(user_id, q, result) {
    player.name = result;
    player.xp = 20;
    this.LevelUp(player);
  }.bind(this);
  this.PoseQuestion(player.user_id, q);
}

StarlitExpanse.prototype.Save = function(file) {
  var json_payload = {};
  json_payload.questions = this.questions;
  json_payload.players = this.players;
  json_payload.adventures = this.adventures;
  json_payload.parties = this.parties;
  require("fs").writeFile(file,JSON.stringify(json_payload,null,2), null);
}

StarlitExpanse.prototype.Load = function(file) {
  var json_payload = require(file);
  this.questions = json_payload.questions;
  this.players = json_payload.players;
  this.adventures = json_payload.adventures;
  this.parties = json_payload.parties;
}

module.exports = {
  StarlitExpanse: StarlitExpanse,
  Room: Room,
  Mob: Mob,
  Encounter: Encounter,
  Chest: Chest,
  Item: Item,
  Equipment: Equipment,
  Door: Door,
  Trap: Trap,
  Lock: Lock,
  Difficulties: difficulties,
};
