
var attack;
var defense;
var vigor;
var agility;
var elements;
var weapon = ["sword", "bow", "spear", "axe"];
var accessory = ["gauntlet", "ring", "shield", "amulet"];
var armorClass;
var health;
var priority;
var damage;
var strike;
var res;

//armorClass = (10 + Math.floor((defense + agility) * .5));
//health = 2 * vigor;
//elements = [Weapon.element, Accessory.element];



function Attributes(attack, defense, vigor, agility) {
    this.attack = attack;
    this.defense = defense;
    this.vigor = vigor;
    this.agility = agility;
}

function Weapon(name, attribute, element) {
    this.name = name;
    this.attribute = attribute;
    this.element = element
}

function Accessory(name, attribute, element) {
    this.name = name;
    this.attribute = attribute;
    this.element = element
}

// Make into a table in MYSQL
var sword = new Weapon("Sword", "attack", "fire");
var bow = new Weapon("Bow", "agility", "air");
var spear = new Weapon("Spear", "defense", "water");
var axe = new Weapon("Axe", "vigor", "earth");

var gauntlet = new Accessory("Gauntlet", "attack", "fire");
var ring = new Accessory("Ring", "agility", "air");
var shield = new Accessory("Shield", "defense", "water");
var amulet = new Accessory("Amulet", "vigor", "earth");


function Character(name, pic, Attributes, Weapon, Accessory, armorClass, health, elements) {
    this.name = name;
    this.pic = pic;
    this.Attributes = Attributes
    this.Weapon = Weapon;
    this.Accessory = Accessory;
    this.armorClass = armorClass;
    this.health = health;
    this.elements = elements;
  
    this.equip = function() {
       

    }

    this.printStats = function() {
        console.log("Name: " + this.name);
        console.log("\n-------------\n");
      };
    
      // method which determines whether or not a character's "hitpoints" are less than zero
      // and returns true or false depending upon the outcome
      this.isAlive = function() {
        if (this.hitpoints > 0) {
          console.log(this.name + " is still alive!");
          console.log("\n-------------\n");
          return true;
        }
        console.log(this.name + " has died!");
        return false;
      };
    
      // method which takes in a second object and decreases their "hitpoints" by this character's strength
      this.clash = function(opponentCharacter) {
        
        //Priority = d20 + Agility
        //element = choice
        //To hit = (d20 + Attack >= AC)
        // Attack - Defense = Strike
        // if ((Strike) >= 1)
        //  Strike * Res = Damage
        // Else
        //  Math.ceil(1 * Res) = Damage
        opponentCharacter.health -= damage;
      };
    
      this.levelUp = function() {
        this.age += 1;
        this.strength += 5;
        this.hitpoints += 25;
      };



    //  attack Element vs Defender Elements
    //switch (clash.element) {
    //    case fire:
    //      if (defender.element = earth) {
    //       element.weak = true;
    //      }
    //      break;
    //    case air:
    //      if (defender.element = water) {
    //       element.weak = true;
    //      }
    //      break;
    //    case water:
    //      if (defender.element = fire) {
    //       element.weak = true;
    //      }
    //      break;
    //    case earth:
    //      if (defender.element = air) {
    //       element.weak = true;
    //      }
    //      break;
    //    default:
    //      false
    //  }



}
function creation(answers) {
    // Runs the constructor and places the new player object into the variable `player`
    // Turns the offense and defense variables into integers as well with parseInt
    var playerCharacter = new Character(
        answers.name,
        answers.pic,
        answers.Attributes,
        answers.Weapon,
        answers.Accessory,
        answers.armorClass,
        answers.health,
        answers.elements,
    );

}

function d20() {
    toHit = Math.ceil(Math.random() * Math.ceil(20));
  }


// 3
// 3
// 3
// 3

// 4
// 4
// 2
// 2


//Fire>Earth>Air>Water>Fire

d20();

$("#attributes").html("5")
$("#weapon").html("Sword")
$("#accessory").html("Shield")

console.log(toHit);