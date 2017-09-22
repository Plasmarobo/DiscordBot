'used strict';
exports.id='StarlitExpanse'
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

  get Name() {
    return this.name || (this.name = "Empty Area");
  }
  
  get Description() {
    return this.description || (this.description = "This area is empty. There are no features or objects.");
  }
}

let Attackable = (superclass) => class extends superclass {
  
  get HP() {
    return this.hp || (this.hp = 1);
  } 

  get Defense() {
    return this.defense || (this.defense = 1);
  }

  get Evasion() {
    return this.evasion || (this.evasion = 1);
  }
}

let Statable = (superclass) => class extends superclass {
  get Difficulty() {
    return this.difficulty || (this.difficulty = 1);
  }
  
  get Bypassed() {
    return this.bypassed || (this.bypassed = false);
  }
  
  get ByPassedMessage() {
    return this.bypassed_description || (this.bypassed_description = "Open");
  }
  
  get NonBypassedMessage() {
    return this.nonbypassed_description || (this.nonbypassed_description = "Closed");
  }
  
  get BypassSkill() {
    return this.bypass_stat || (this.bypass_stat = "lockpicking");
  }
}

let Atmospheric = (superclass) => class extends superclass {
  get Breathable() {
    return this.breathable || (this.breathable  = true);
  }
  
  get Toxicity() {
    return this.toxicity || (this.toxicity = 0);
  }
  
  get Pressure() {
    return this.pressure || (this.pressure = 1);
  }
  
  get Temperature() {
    return this.temperature || (this.temperature = 20);
  }
}

let Container = (superclass) => class extends superclass {
  get InventorySize() {
    return this.inventory_size || (this.inventory_size = 1);
  }
  
  get Inventory() {
    return this.inventory || (this.inventory = []);
  }
}

let Ownable = (superclass) => class extends superclass {
  get Faction() {
    return this.faction || (this.faction = null);
  }
  
  get Owner() {
    return this.owner || (this.owner = null);
  }
}

let Takeable = (superclass) => class extends superclass {
  
  get Taken() {
    return this.taken || (this.taken = false);
  }
  
  get Given() {
    return this.take_item || (this.take_item = null);
  }
}

let Usable = (superclass) => class extends superclass {
  
  get Uses() {
    return this.uses || (this.uses = 1);
  }
  
  get MaxUses() {
    return this.max_uses || (this.max_uses = 1);
  }
  
  get RegenTime() {
    return this.regen_time || (this.regen_time = 0);
  }
}

let Tradeable = (superclass) => class extends superclass {
  
  get Value() {
    return this.value || (this.value = 1);
  }
}

let Equipment = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this.equipment_slot = "None";
  }
}

let Equipable = (superclass) => class extends superclass {
  
  constructor(...args) {
    super(...args);
    this.equipment_slots = [];
  } 
}

let Trigger = (superclass) => class extends superclass {
  
  get Triggered() {
    return this.triggered || (this.triggered = false);
  }
  
  get ResetTime() {
    return this.reset_time || (this.reset_time = 0);
  }
}

let Triggerable = (superclass) => class extends superclass {
  
  get Triggers() {
    return this.triggers || (this.triggers = []);
  }
  
  get TriggerLogic() {
    this.trigger_logic || (this.trigger_logic = "AND"); //OR, NOR, XOR
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
  
  get ResetTime() {
    return this.reset_time || (this.reset_time = 0);
  }
}

let Lockable = (superclass) => class extends superclass {

  get Locks() {
    return this.locks || (this.locks = []);
  }
  
  get isOpen() {
    return this.open || (this.open = false);
  }
  
  get LockedDescription() {
    return this.locked_description || (this.locked_description = "Locked");
  }
  
  get UnlockedDescription() {
    return this.unlocked_description || (this.unlocked_description = "Unlocked");
  }
}

let Transporter = (superclass) => class extends superclass {
  
  get ForwardLink() {
    return this.forward || (this.forward = null);
  }
  
  get BackwardLink() {
    return this.backward || (this.backward = null);
  }
}

let Intelligent = (superclass) => class extends superclass {
  
  get AIState() {
    return this.aistate || (this.aistate = "Idle");
  }
  
  get Morale() {
    return this.morale || (this.morale = 0);
  }
  
  get AIScript() {
    return this.ai_script || (this.ai_script = "ai.js");
  }
}

let Enchantable = (superclass) => class extends superclass {
  
  get MagicRating() {
    return this.magic_rating || (this.magic_rating = 0);
  }
  
  get MagicEffects() {
    return this.magic_effects || (this.magic_effects = []);
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
    this.forward_doors = [];
    this.backward_doors = [];
  }
}

class Combat {
}

class Encounter {
}

class Adventure {
}

class Item extends mixwith(Object).with(
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
  "knowledge",
  "awareness",
  "will",
  "creativity",
  "corruption",
  "spirit",
  "fate",
  "luck",
  "psionic_generation",
  "psionic_circulation",
  "psionic_retention",
  "psionic_manipulation"
];


let StatBlock = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    for(var stat in stat_names) {
      this[stat] = 1;
    }
  }

  statBlockMessage() {
    var str = "Stats\n```";
    for(var stat in stat_names) {
      str += "\n" + stat +":"+"         ".substr(stat.length-4) + this[stat];
    }
    return str + "```";
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
  
  get Level() {
    return Math.floor(this.past_xp / 25);
  }
  
  Tier(stat) {
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
  }
  
  
}

class Player extends mixwith.mix(Levelable).with(Describable, Trigger, Attackable) {
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
          this.Whisper(user_id, "LevelUp Complete.");
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
  Lock: Lock
};
