"use strict";

var fs = require('fs');
var 
var Rpg = function() {}

Rpg.prototype.load_character = function(discord_id) {
  var charPath = "/var/cache/djrpg/" + discord_id + ".json";
  fs.exists(carPath, function(exists){

    var characterData = {};
    if(exists)
    {
      characterData = require(charPath);
    }else{
      characterData = {
      name : "",
      id : discord_id,
      hp : 10,
      mhp : 10,
      xp : 0,
      lv : 1,
      job : null,
      equipment : {
        feet : {left: null, right: null},
        legs : {left: null, right: null},
        waist : {},
        chest : {},
        shoulders : {left: null, right: null},
        arms : {left: null, right: null},
        hand : {left: null, right: null},
        head : {}
      },
      stats : {
        body : 10,
        mind : 10,
        soul : 10,
      },
      skills: {
        strike : 0,
        archery : 0,
        parry: 0,
        block: 0,
        sneaking: 0,
        reading: 0,
        wizardy: 0,
        sorcery: 0,
        pray: 0,
      },
      ap : 0,
      map : 3,
    }
  });

}

Rpg.commands = {
  "attack" : null,
  "parry" : null,
  "block" : null,
  "hide" : null,
  "read" : null,
  "cast" : null,
  "pray" : null
}



var Characters = require('characters.json');

module.exports = Rpg;