var StarlitExpanse = function() {
  this.players = {};
  this.parties = {};
  this.adventures = {};
}

StarlitExpanse.prototype.StatBlock = function() {
  this.speed = 0; //Speed
  this.reaction = 0;
  this.acuity = 0;
  this.balanice = 0;
  
  this.strength = 0; //Melee
  this.endurance = 0;
  this.resistance = 0;
  this.resolve = 0;
  
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
  this.psionic_retension = 0;
  this.psionic_manipulation = 0;
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
  this.user_id = user_id;
}
