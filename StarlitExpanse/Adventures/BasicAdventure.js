'used strict';
exports.id='BasicAdventure';
var Adventure = require('StarlitExpanse').Adventure;
var Room = require('StarlitExpanse').Room;
var Door = require('StarlitExpanse').Door;
var Item = require('StarlitExpanse').Item;
var Difficulty = require('StarlitExpanse').Difficulties;
var Chest = require("StarlitExpanse").Chest;

var BasicAdventure = new Adventure();
BasicAdventure.name = "Scavengers at Newstar Station";
BasicAdventure.description = "A quick adventure for new players!".

BasicAdventure.intro = `You have been hired by Orlando Quates to secure an item 
on a recently abandoned space station. Little is known about the evacuation, 
only that the station is currently owned by the Russian Federation, and empty.
The job pays 1000Cr on delivery of the item. Anything else you loot is yours.`;

BasicAdventure.reward = {
  'Cr' : 1000,
  'xp' : 1
};

var cargo_box = new Chest();
cargo_box.name = "A magsealed cargo box";

var newStarStationKeycard = new Item();
newStarStationKeycard.name = "Newstar Station Security Keycard";

var newStarStationElevatorCode = new Item();
newStarStationElevatorCode.name = "Newstar Station OBS Elevator Code";

var entrance = new Room();
BasicAdventure.addRoom(entrance);
entrance.name = "Entrance";
entrance.description = "A long entrance hall hung with tapestry.";
var security_checkpoint = new Room();
BasicAdventure.addRoom(security_checkpoint);
security_checkpoint.name = "Security Checkpoint 1";
security_checkpoint.description = "A checkpoint between security doors with a small booth. The defensive turrets have been torn apart.";
security_checkpoint.addFeature(newStarStationKeycard);
var promenade = new Room();
BasicAdventure.addRoom(promenade);
promenade.name = "Promenade";
promenade.description = "A large open space with numerous retail and communal spaces branching off of it. The main hub of the station.";
var looted_shop = new Room();
BasicAdventure.addRoom(looted_shop);
looted_shop.name = "Looted Shop";
looted_shop.description = "This shop has been torn apart. Damaged mechandise litters the floor and sparks fly from broken consoles.";
var trashed_bar = new Room();
BasicAdventure.addRoom(trashed_bar);
trashed_bar.name = "Trashed Bar";
trashed_bar.description = "A ravaged bar. Tables and chairs have been upendend, bottles and glasses smashed. The entire place is covered in various alcohol-smelling liquids.";
var observation_deck = new Room();
BasicAdventure.addRoom(observation_deck);
observation_deck.name = "Observation Deck";
observation_deck.description = "This deck looks out on the stars and over the various rings and spires of the station. Several benches allow stargazers to relax.";
var main_elevator = new Room();
BasicAdventure.addRoom(main_elevator);
main_elevator.name = "The Main Spire Elevator";
main_elevator.description = "A large turbolift. A panel allows one to select a deck.";
var quarters = new Room();
BasicAdventure.addRoom(quarters);
quarters.name = "Private Quarters";
quarters.description = "A long slowly curving corridor with many doors off of it. Some have been busted open, others remain sealed.";
var maintence = new Room();
BasicAdventure.addRoom(maintence);
maintence.name = "Maintence";
maintence.description = "The maintence bay. Home of various tools, busted or backup machines, and diagnostic equipment.";
var generator = new Room();
BasicAdventure.addRoom(generator);
generator.name = "Power Generator";
generator.description = "A large fusion generator sits behind the glass of the control room. Rythmic bass pulses eminate from the large sphere and arcs of electricity occasionall connect between the various cylinders extending from the machine.";
var lifesupport = new Room();
BasicAdventure.addRoom(lifesupport);
lifesupport.name = "Life Support";
lifesupport.description = "Various life support and HVAC equipment fills this room: A nexus of filters, fans, and ducts.";
var cargo_bay = new Room();
BasicAdventure.addRoom(cargo_bay);
cargo_bay.name = "Cargo Bay";
cargo_bay.description = "A room filled with boxes and storage containers. Many have barcode labels that give ownership and contents. A small booth holds a records terminal and scanning equipment.";
var freight_docking = new Room();
BasicAdventure.addRoom(freight_docking);
cargo_bay.name = "Freight Docking";
cargo_bay.description = "Industrial docking ports allowing the movement of shipping contianers and large crates. Heavy moving, weighing, and scanner equipment fills the space.";
var freight_security = new Room();
BasicAdventure.addRoom(freight_security);
freight_security.name = "Freight Security";
freight_security.description = "A monitoring booth controlling the scanners and defensive turrets in this room.";
freight_security.addFeature(newStarStationElevatorCode);

//NULL->Entrance
var entrance_airlock = new Door();
entrance_airlock.name = "Airlock";
entrance_airlock.description = `A large airlock door. Made of metal with an 
intergrated control panel. Leads back to the ship.`;
entrance_airlock.exit = true;
entrance.airlock.connectRooms(null, entrance);

//Entrance<->Security_Checkpoint
var entrance_blast_doors = new Door();
entrance_blast_doors.name = "Blast Shutter A";
entrance_blast_doors.description = `A sealed security shutter. Pocked with 
scorchmarks, the shutter is in locked mode. 
Block letters spell out \`SECURITY\`. A control pad glows next to it.`;
entrance_blast_doors.addBypassStat('strength', Difficulty['trivial']);
entrance_blast_doors.addBypassStat('intellect', Difficulty['easy']);
entrance_blast_doors.connectRooms(entrance, security_checkpoint);

//Security Checkpoint <-> Promenade
var security_blast_doors = new Door();
security_blast_doors.name = "Blast Shutter B";
security_blast_doors.description = `A breached security shutter. Blast scarred
and torn partially open by claws or blades. Looks into the \`PROMENADE\`.
The control system seems inoperable.`;
security_blast_doors.addBypassStat('strength', Difficulty['trivial']);
security_blast_doors.connectRooms(security_checkpoint, promenade);

//Promenade <-> Looted Shop
var looted_shop_door = new Door();
looted_shop_door.name = "Broken Shop Door";
looted_shop_door.description = `A broken plasteel door. Shattered open and 
hanging on it's frame.`;
looted_shop_door.open = true;
looted_shop_door.connectRooms(promenade, looted_shop);

//Promenade <-> Trashed Bar
var trashed_bar_door = new Door();
trashed_bar_door.name = "Bar Door";
trashed_bar_door.description = `A plasteel door. Scratched and blast-scored by 
intact. Has a mechanical deadbolt. The smart lock pannel shows screen corruption.`;
trashed_bar_door.addBypassStat('strength', Difficulty['easy']);
trashed_bar_door.addBypassStat('intellect', Difficulty['easy']);
trashed_bar_door.addBypassStat('acuity', Difficulty['trivial']);
trashed_bar_door.connectRooms(promenade, trashed_bar);

//Promenade <-> Observation Deck
var observation_deck_elevator = new Door();
observation_deck_elevator.name = "Observation Elevator";
observation_deck_elevator.description = `A small elevator with a safety railing. 
Leads to an upper part of the deck closer to the windows. 
Requires a code, \`open\` to try code.`;
observation_deck_elevator.uses = 3;
observation_deck_elevator.addKey("Newstar Station OBS Elevator Code");
observation_deck_elevator.addAction(
  "open",
  "attempts", 
  function(player, action, parent) {
    if (parent.checkKey(player) || parent.open) {
      parent.open = true;
      return "Elevator: Authorization Granted.";
    } else {
      return "Elevator: Access Denied, " + action.uses + " attempts until locked.";
    }
  }.bind(observation_deck_elevator),
  3);
observation_deck_elevator.connectRooms(promenade, observation_deck);

//Promenade <-> Main Elevator
var promenade_elevator_doors = new Door();
promenade_elevator_doors.name = "Promenade Elevator Stop";
promenade_elevator_doors.description = `Main Elevator to the Promenade`;
promenade_elevator_doors.open = true;
promenade_elevator_doors.connectRooms(promenade, main_elevator);

//Main Elevator <-> Quarters
var quarters_elevator_doors = new Door();
quarters_elevator_doors.name = "Quarters Elevator Stop";
quarters_elevator_doors.description = `Main Elevator to Quarters`;
quarters_elevator_doors.open = true;
quarters_elevator_doors.connectRooms(main_elevator, quarters);

//Main Elevator <-> Maintence
var maintence_elevator_doors = new Door();
maintence_elevator_doors.name = "Maintence Elevator Stop";
maintence_elevator_doors.description = `Main Elevator to Maintence`;
maintence_elevator_doors.open = true;
maintence_elevator_doors.connectRooms(main_elevator, maintence);

//Main Elevator <-> Cargo Bay
var cargo_bay_elevator_doors = new Door();
cargo_bay_elevator_doors.name = "Cargo Elevator Stop";
cargo_bay_elevator_doors.description = `Main Elevator to the Cargo`;
cargo_bay_elevator_doors.open = true;
cargo_bay_elevator_doors.connectRooms(main_elevator, cargo_bay);

function keycard_check(player, action, parent) {
  if (parent.checkKey(player) || parent.open) {
    parent.open = true;
    return "The Generator Door Slides Open.";
  } else {
    return "The door requires a keycard";
  }
}
//Maintence <-> Generator
var generator_door = new Door();
generator_door.name = "MAIN GENERATOR Door";
generator_door.description = `A large security door. The words MAIN GENERATOR 
are written in block letters on it. Has a keycard slot.`;
generator_door.uses = -1;
generator_door.addKey("Newstar Station Keycard");
generator_door.addAction(
  "open",
  "attempts",
  keycard_check,
  -1);
generator_door.addBypassStat('strength', Difficulty['easy']);
generator_door.addBypassStat('intellect', Difficulty['easy']);
generator_door.connectRooms(maintence, generator);

//Maintence <-> Life Support
var life_support_door = new Door();
life_support_door.name = "LIFE SUPPORT Door";
life_support_door.description = `A large security door. The words LIFE SUPPORT 
are written in block letters on it. Has a keycard slot.`;
life_support_door.uses = -1;
life_support_door.addKey("Newstar Station Keycard");
life_support_door.addAction(
  "open",
  "attempts",
  keycard_check,
  -1);

life_support_door.addBypassStat('strength', Difficulty['easy']);
life_support_door.addBypassStat('intellect', Difficulty['easy']);
life_support_door.connectRooms(maintence, lifesupport);

//Cargo Bay <-> Freight Docking
var freight_docking_door = new Door();
freight_docking_door.name = "Freight Dock Door";
freight_docking_door.description = `A plasteel security door to freight docking.
 Normally open, has biometric maglocks.`;
freight_docking_door.addBypassStat('intellect', Difficulty['trivial']);
freight_docking_door.addBypassStat('strength', Difficulty['easy']);
freight_docking_door.connectRooms(cargo_bay, freight_docking);

//Freight Docking <-> Freight Security
var freight_security_door = new Door();
freight_security_door.name = "Frieght Security Room Door";
freight_security_door.description = `A reinforced plasteel security door to freight docking.
 Requires a keycard and biometric id.`;
freight_security_door.addKey("Newstar Station Security Keycard");
freight_security_door.addAction(
  "open",
  "attempts",
  function(player, action, parent) {
    if (parent.open) {
      return "The Security Door locks click open.";
    } else {
      if (parent.checkKey(player)) {
        if (!parent.bypass_stats.contains['intellect']) {
          parent.addBypassStat('intellect', Difficulty['easy']);
          return "The Keycard is accepted. The biometric scanner reads 'ready to scan'.";
        } else {
          return "The biometric scanner must be bypassed.";
        }
      }
    }
  },
  3);
freight_security_door.connectRooms(freight_docking, freight_security);

module.exports = BasicAdventure;
