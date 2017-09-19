var StarlitExpanse = function(discord_bot, guild, channel) {
  this.bot = discord_bot;
  this.guild = guild;
  this.channel = channel;
  this.players = {};
  this.parties = {};
  this.adventures = {};
  this.questions = {};
  this.commands = {
    'leave party' : {
      help_text: "Leave your current party. Will be disbanded if you are leader.",
      usage: "leave party",
      process: function(user_id, command) {
        this.Confirmation(user_id, "Really abandon the party?", function() {
          this.removeUserFromParty(user_id, this.players[user_id].party);
        }.bind(this));
        return true;
      }.bind(this)
    },
    'form party': {
      help_text: "Forms a party with you as leader.",
      usage: "form party",
      process: function(user_id, command) {
        if (this.players[user_id].party != null) {
          this.Whisper(user_id, "You must leave your party before starting a new one.");
        } else {
          
        }
        return true;
      }.bind(this)
    },
    'adventure': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'stop': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'retire': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'new character': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        if (this.players.contains(user_id)) {
          this.Confirmation(user_id, "Overwrite " + this.players[user_id].name + "?", function() {
            this.players[user_id] = StarlitExpanse.Player(user_id);
            this.CharacterGen(this.players[user_id]);
          }.bind(this));
        } else {
          this.players[user_id] = StarlitExpanse.Player(user_id);
          this.CharacterGen(this.players[user_id]);
        }
        return true;
      }.bind(this)
    },
    'attack': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'talk': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'protect': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }
    },
    'cast': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'enter': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'leave': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'exit': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'board': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'climb': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'descend': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'ascend': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }
    },
    'look': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'glance': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'examine': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'describe': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'check': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'exits': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'doors': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'inventory': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'sell': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'buy': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'lock': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'unlock': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'destroy': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    //"repair",
    //"build",
    'close': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'open': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    //"connect",
    //"join",
    'get': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'take': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'put': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'drop': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }
    },
    'make leader': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'level': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }
    },
    'status': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'stats': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'character': {
      help_text: "Prints all charater info.",
      usage: "charater",
      process: function(user_id, command) {
        this.Whisper(user_id, this.players[user_id].ToMessage());
        return true;
      }.bind(this)
    },
    'eat': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'drink': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'use': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'give': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'sleep': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'quaff': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'apply': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'skills': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'defend': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'quest': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'challenge': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'accept': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'reject': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'cancel': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'level up': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'advance': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'throw': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'identify': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'appraise': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'list': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'pray': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'follow': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'abandon': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'vote': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'found': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'pay': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'donate': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'deposit': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'withdraw': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'craft': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'enchant': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    },
    'claim': {
      help_text: "",
      usage: "",
      process: function(user_id, command) {
        return true;
      }.bind(this)
    }
  };
}

StarlitExpanse.prototype.Whisper = function(user_id, message) {
  this.guild.members[user_id].send(message);
}

StarlitExpanse.prototype.Shout = function(message) {
  this.channel.send(message);
}

StarlitExpanse.prototype.ProcMessage = function(msg) {
  if (this.questions.contians(msg.author)) {
    this.TranslateAnswer(msg.author, msg.content);
  } else {
    console.log("SLEX: Got \"" + msg.content + "\" from " + msg.author);
    var cmdTxt = msg.content.split(" ")[0].substring(1).toLocaleLowerCase();
    var suffix = msg.content.substring(cmdTxt.length+1);//add one for the ! and one for the space
   
    var cmd = this.commands[cmdTxt];
    if(cmdTxt === "help"){
      //help is special since it iterates over the other commands
      msg.author.send("RPG Commands:\n");
      for(var cmd in commands) {
          var help_str = "`" + cmd + "`:";
          var usage = commands[cmd].usage;
          if(usage){
            help_str += " " + usage;
          }
          var description = commands[cmd].help_text;
          if(description){
            help_str += "\n\t" + description;
          }
          msg.author.send(help_str);
      }
    } else if(cmd) {
      try{
        cmd.process(msg.author, suffix);
      } catch(e){
        msg.channel.send( "command " + cmdTxt + " failed :(\n" + e.stack);
      }
    } else {
      msg.channel.send( "Invalid RPG command " + cmdTxt);
    }
  }
}

StarlitExpanse.prototype.PoseQuestion = function(user_id, question) {
  this.questions[user_id] = question;
  var q_text = question['text'];
  if (!question['silent']) {
    for(var choice in question['choices']) {
      q_text += "\n" + choice['index'];
      q_text += ": ";
      q_text += choice['text'].replace(
        choice['keyword'],
        "`" + choice['keyword'] + "`");
    }
  }
  this.Whisper(user_id, q_text);
}

StarlitExpanse.prototype.TranslateAnswer = function(user_id, result) {
  var q = this.questions[user_id];
  if (q['choices'] == null ||
      result == q['choices']['index'] ||
      result == q['choices']['keyword'] ||
      result == q['choices']['text']) {
    this.questions.remove(user_id);
    if (q['callback'] == null) {
      return q['choices']['callback'](user_id, q, result);
    }
  } else {
    return undefined;
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
  if (party.players.contains(this.players[user_id])) {
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
  party.leader_id = null;
  for(var player in party.players) {
    player.party = null;
    this.Whisper(player.user_id, "The party is disbanded");
  }
  party.player = [];
  this.parties.remove(party);
}

StarlitExpanse.prototype.MakeQuestion = function(text, choices) {
  var q = {
    'text' : text,
    'choices' : choices,
    'silent' : false
  };
  return q;
}

StarlitExpanse.prototype.MakeChoices = function(options) {
  var choices = {};
  var i = 1;
  for(var option in options) {
    choices['index'] = i++;
    choices['keyword'] = option['text'].split(" ")[0];
    choices['text'] = option['text'];
    choices['callback'] = option['callback'];
  }
  return choices;
}

StarlitExpanse.prototype.inviteToParty = function(party, user_ids) {
  var question_text = this.players[party.leader_id].name +
    " has invited you to a party with";
  for(var user_id in user_ids) {
    question_text += " " + this.players[user_id].name;
  }
  question_text += ".";

  for(var user_id in user_ids) {
    var q = this.MakeQuestion(question_text, this.MakeChoices([{ 
      'text' : "Join the party",
      'callback': function(user_id, q, result) {
        if(this.players[user_id].party == null) {
          party.addPlayer(user_id);
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
StarlitExpanse.prototype.Describable = function() {
  this.name = "Empty Area";
  this.description = "This area is empty. There are no features or objects.";
}

StarlitExpanse.prototype.Attackable = function(hp) {
  this.hp = hp;
  this.armor = StarlitExpanse.Armor();
  this.on_death = function() {
    return true;
  };
}

StarlitExpanse.prototype.Skillable = function(difficulty) {
  this.difficulty = difficulty;
  this.bypassed = false;
  this.bypassed_description = "Open";
  this.nonbypassed_description = "Closed";
  this.skill_used = null;
}

StarlitExpanse.prototype.Atmospheric = function() {
  this.breathable = true;
  this.toxicity = 0;
  this.pressure = 1;
  this.temperature = 20;
}

StarlitExpanse.prototype.Container = function(size) {
  this.inventory_size = size;
  this.inventory = [];
}

StarlitExpanse.prototype.Ownable = function(faction, player) {
  this.faction = faction;
  this.player = player;
  this.deeded = false;
  this.deed = null;
}

StarlitExpanse.prototype.Takeable = function(item) {
  this.taken = false;
  this.take_item = item;
}

StarlitExpanse.prototype.Usable = function() {
  this.uses = 1;
  this.max_uses = 1;
  this.regen_time = 0;
}

StarlitExpanse.prototype.Valuable = function() {
  this.value = 1;
}

StarlitExpanse.prototype.Trigger = function(conditions) {
  this.triggered = false;
  this.reset_time = 0;
}

StarlitExpanse.prototype.Triggerable = function(triggers) {
  this.triggers = triggers;
  this.trigger_logic = "AND"; //OR, NOR, XOR
  this.reset_time = 0;
}

StarlitExpanse.prototype.Lockable = function(locks) {
  this.locks = locks;
  this.open = false;
  this.locked_description = "Locked";
  this.unlocked_description = "Unlocked";
}

StarlitExpanse.prototype.Transporter = function() {
  this.forward = null;
  this.backward = null;
}

StarlitExpanse.prototype.Intelligent = function() {
  
}

StarlitExpanse.prototype.AdventureLock = function() {
  
}

StarlitExpanse.AdventureLock.inherits(StarlitExpanse.Attackable);
StarlitExpanse.AdventureLock.inherits(StarlitExpanse.Skillable);
StarlitExpanse.AdventureLock.inherits(StarlitExpanse.Trigger);
StarlitExpanse.AdventureLock.inherits(StarlitExpanse.Discribable);

StarlitExpanse.prototype.AdventureTrap = function() {
  
}

StarlitExpanse.AdventureTrap.inherits(StarlitExpanse.Attackable);
StarlitExpanse.AdventureTrap.inherits(StarlitExpanse.Triggerable);
StarlitExpanse.AdventureTrap.inherits(StarlitExpanse.Discribable);

StarlitExpanse.prototype.AdventureChest = function() {
  
}

StarlitExpanse.AdventureChest.inherits(StarlitExpanse.Container);
StarlitExpanse.AdventureChest.inherits(StarlitExpanse.Attackable);
StarlitExpanse.AdventureChest.inherits(StarlitExpanse.Ownable);
StarlitExpanse.AdventureChest.inherits(StarlitExpanse.Trigger);
StarlitExpanse.AdventureChest.inherits(StarlitExpanse.Lockable);
StarlitExpanse.AdventureChest.inherits(StarlitExpanse.Discribable);

StarlitExpanse.prototype.AdventureDoor = function() {
  
}

StarlitExpanse.AdventureDoor.inherits(StarlitExpanse.Discribable);
StarlitExpanse.AdventureDoor.inherits(StarlitExpanse.Attackable);
StarlitExpanse.AdventureDoor.inherits(StarlitExpanse.Ownable);
StarlitExpanse.AdventureDoor.inherits(StarlitExpanse.Trigger);
StarlitExpanse.AdventureDoor.inherits(StarlitExpanse.Lockable);
StarlitExpanse.AdventureDoor.inherits(StarlitExpanse.Transporter);

StarlitExpanse.prototype.AdventureMob = function() {
  
}

//A physical room or place with features
StarlitExpanse.prototype.AdventureRoom = function() {
  this.forward_doors = [];
  this.backward_doors = [];
  
}
StarlitExpanse.prototype.AdventureRoom.inherits(StarlitExpanse.Atmospheric);
StarlitExpanse.prototype.AdventureRoom.inherits(StarlitExpanse.Ownable);

//A fight that takes place within a room
StarlitExpanse.prototype.AdventureFight = function(factions, room) {
  
}
StarlitExpanse.AdventureFight.inherits(StarlitExpanse.AdventureEncounter);

//A question to pose and an array of choices for the party
StarlitExpanse.prototype.AdventureBranch = function(question, choices) {
  
}
StarlitExpanse.AdventureBranch.inherits(StarlitExpanse.AdventureEncounter);

StarlitExpanse.prototype.Adventure = function(root_node, party) {
  
}

StarlitExpanse.prototype.StatBlock = function() {
  this.speed = 0;
  this.reaction = 0;
  this.acuity = 0;
  this.balance = 0;
  
  this.strength = 0;
  this.endurance = 0;
  this.resistance = 0;
  this.vitality = 0;
  
  this.knowledge = 0;
  this.awareness = 0;
  this.will = 0;
  this.creativity = 0;
  
  this.corruption = 0;
  this.spirit = 0;
  this.fate = 0;
  this.luck = 0;
  
  this.psionic_generation = 0;
  this.psionic_circulation = 0;
  this.psionic_retention = 0;
  this.psionic_manipulation = 0;
}

StarlitExpanse.prototype.StatBlockToMessage = function(stat_block) {
  var str = "Stats";
  str += "\nSpeed:            " + stat_block.speed;
  str += "\nReaction:         " + stat_block.reaction;
  str += "\nAcuity:           " + stat_block.acuity;
  str += "\nBalance:          " + stat_block.balance;
  
  str += "\nStrength:         " + stat_block.strength;
  str += "\nEndurance:        " + stat_block.endurance;
  str += "\nResistance:       " + stat_block.resistance;
  str += "\nVitality:         " + stat_block.vitality;
  
  str += "\nKnowledge:        " + stat_block.knowledge;
  str += "\nAwareness:        " + stat_block.awareness;
  str += "\nWill:             " + stat_block.will;
  str += "\nCreativity:       " + stat_block.creativity;
  
  str += "\nCorruption:       " + stat_block.corruption;
  str += "\nSpirit:           " + stat_block.spirit;
  str += "\nFate:             " + stat_block.fate;
  str += "\nLuck:             " + stat_block.luck;
  
  str += "\nPsi Generation:   " + stat_block.psionic_generation;
  str += "\nPsi Circulation:  " + stat_block.psionic_circulation;
  str += "\nPsi Retention:    " + stat_block.psionic_retention;
  str += "\nPsi Manipulation: " + stat_block.psionic_manipulation;
}

StarlitExpanse.prototype.Player = function(user_id) {
  this.name = "Emanon";
  this.wounds = 0;
  this.expertise = [];
  this.lore = [];
  this.skills = [];
  this.equipment = {};
  this.paragon_power = null;
  this.exemplar_power = null;
  this.status = [];  
  this.stats = StarlitExpanse.StatBlock();
  this.user_id = user_id;
  this.players[user_id] = this;
  this.xp = 20;
  this.inventory = [];
  
  this.party = null;
}

StarlitExpanse.Player.inherits(StarlitExpanse.Attackable);
StarlitExpanse.Player.inherits(StarlitExpanse.Discribable);

StarlitExpanse.prototype.LevelUp = function(player) {
  if (player.xp <= 0) {
    return true;
  } else {
    this.Whisper(player.user_id, "You have " + player.xp + " points remaining.");
    var c = [];
    
    var question = {
      'text' : 'Spend a point... (\"list\" to list)',
      'silent' : true,
      'choices' : MakeChoices([
        {
          'text': 'List Options',
          'callback' : function(user_id, q, result) {
            this.Whisper(user_id, this.StatBlockToMessage(this.players[user_id].stats));
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'speed',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.speed += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'reaction',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.reaction += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'acuity',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.acuity += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'balance',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.balance += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'strength',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.strength += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'endurance',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.endurance += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'resistance',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.resistance += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'vitality',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.vitality += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'knowledge',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.knowledge += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'awareness',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.awareness += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'will',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.will += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'creativity',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.creativity += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'corruption',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.corruption += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'spirit',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.spirit += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'fate',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.fate += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'luck',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.luck += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'psionic_generation',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.psionic_generation += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'psionic_circulation',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.psionic_circulation += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'psionic_retention',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.psionic_retention += 1;
            this.LevelUp(player);
          }.bind(this)
        },
        {
          'text': 'psionic_manipulation',
          'callback' : function(user_id, q, result) {
            var player = this.players[user_id];
            if (player.xp <= 0) return;
            player.xp -= 1;
            player.psionic_manipulation += 1;
            this.LevelUp(player);
          }.bind(this)
        }
      ])
    };
    this.PoseQuestion(player.user_id, question);
  }
}

StarlitExpanse.prototype.CharacterGen = function(player) {
  //Name
  var q = this.MakeQuestion('What is your name?', null);
  q['callback'] = function(user_id, q, result) {
    player.name = result;
    this.LevelUp(player);
  };
  this.PoseQuestion(player.user_id, q);
}
