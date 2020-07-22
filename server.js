
var attack;
var defense;
var vigor;
var agility;
var elements;
var armorClass;
var health;
var priority;
var damage;
var strike;
var atkElem;
var defElem;
var res;
var d20roll;
var d8roll;
var toHit;
var chosenPlayer;
var chosenOpp;
var playerWent;
var oppWent;
var playerInitiative;
var oppInitiative;
var tooSlow;
var roundCount = 1;





// armorClass = (10 + Math.floor((defense + agility) * .5));
//health = 5 * vigor;
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

//Make into a table in MYSQL
var sword = new Weapon("Sword", "attack", "Fire");
var bow = new Weapon("Bow", "agility", "Air");
var spear = new Weapon("Spear", "defense", "Water");
var axe = new Weapon("Axe", "vigor", "Earth");

var gauntlet = new Accessory("Gauntlet", "attack", "Fire");
var ring = new Accessory("Ring", "agility", "Air");
var shield = new Accessory("Shield", "defense", "Water");
var amulet = new Accessory("Amulet", "vigor", "Earth");


function d20() {
  d20roll = Math.ceil(Math.random() * Math.ceil(20));
}

function d8() {
  d8roll = Math.ceil(Math.random() * Math.ceil(8));
}

resCheck = function (atkElem, defElem) {

  switch (true) {

    // Weaknesses
    case (atkElem == "Fire") && (defElem == "Earth"):
      res = 2;
      break;

    case (atkElem == "Air") && (defElem == "Water"):
      res = 2;
      break;

    case (atkElem == "Water") && (defElem == "Fire"):
      res = 2;
      break;

    case (atkElem == "Earth") && (defElem == "Air"):
      res = 2;
      break;

    // Resistances
    case (atkElem == "Earth") && (defElem == "Fire"):
      res = 0.5;
      break;

    case (atkElem == "Water") && (defElem == "Air"):
      res = 0.5;
      break;

    case (atkElem == "Fire") && (defElem == "Water"):
      res = 0.5;
      break;

    case (atkElem == "Air") && (defElem == "Earth"):
      res = 0.5;
      break;

    // Defaults to no advantage
    default:
      res = 1

  }
}




function Character(name, pic, Attributes, Weapon, Accessory, armorClass, health, elements) {
  this.name = name;
  this.pic = pic;
  this.Attributes = Attributes
  this.Weapon = Weapon;
  this.Accessory = Accessory;
  this.armorClass = armorClass;
  this.health = health;
  this.elements = elements;

  //method which determines whether or not a character's "hitpoints" are less than zero
  //and returns true or false depending upon the outcome

  /*
  this.isAlive = function () {
    if (this.hitpoints > 0) {
      console.log(this.name + " is still alive!");
      console.log("\n-------------\n");
      return true;
    }
    console.log(this.name + " has died!");
    return false;
  };

  */

  // method which takes in a second object and decreases their "hitpoints" by this character's strength

  /* onclick event{
    initiative between two
    attack
    reduce damage
    enemy responds
 
   }

  */

  this.rollInitiative = function (opponentCharacter) {

    d20();
    playerInitiative = (d20roll + this.Attributes.agility);

    d20();
    oppInitiative = (d20roll + opponentCharacter.Attributes.agility);

    if (playerInitiative < oppInitiative) {
      tooSlow = true
    }

    else {tooSlow = false}
  }

  this.clash = function (opponentCharacter) {

    d20();
    d8();
    //atkElem set by button click


    defElem = opponentCharacter.elements[Math.floor(Math.random() * 2)];

    console.log(this.name + " attacks with " + atkElem);
    console.log("--------------------------------------")

    console.log(opponentCharacter.name + " defends with " + defElem);
    console.log("--------------------------------------")

    $("#defElem").html(defElem)

    resCheck(atkElem, defElem);

    toHit = (d20roll + this.Attributes.attack);
    console.log(this.name + " rolls " + toHit + " to hit!")


    if (toHit >= armorClass) {
      strike = (this.Attributes.attack + d8roll) - opponentCharacter.Attributes.defense;


      switch (true) {

        case (d20roll == 20 && strike >= 1):
          damage = Math.ceil((strike * res * 2));
          opponentCharacter.health -= damage;
          console.log("A critical hit!")
          break;

        case (d20roll == 20 && strike < 1):
          damage = Math.ceil((1 * res * 2));
          opponentCharacter.health -= damage;
          console.log("A critical hit!")
          break;

        case (d20roll !== 20 && strike >= 1):
          damage = Math.ceil((strike * res));
          opponentCharacter.health -= damage;
          break;

        default:
          damage = Math.ceil(1 * res);
          opponentCharacter.health -= damage;
      }

      $("#damage").html(damage)
      $("#defender").html(opponentCharacter.name)
      console.log(opponentCharacter.name + " takes " + damage + " damage!")
      console.log("--------------------------------------")
      console.log("--------------------------------------")
      //alive checker
    }

    else {
      $("#damage").html(0)
      console.log(this.name + "'s attack misses!")
      console.log("--------------------------------------")
      console.log("--------------------------------------")
      //alive checker
    }
  }
}

/*
this.levelUp = function() {
this.age += 1;
this.strength += 5;
this.hitpoints += 25;
};
*/

function creation(answers) {
  /*
   Runs the constructor and places the new player object into the variable `player`
   Turns the offense and defense variables into integers as well with parseInt
   */
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


function playGame() {

  chosenPlayer.rollInitiative(chosenOpp);

  switch (true) {

    case (chosenPlayer.health <= 0):

      console.log("You lose!")

      break;

    case (chosenOpp.health <= 0):

      console.log("You win!")

      break;

    case (playerWent):

      playerWent = false;

      atkElem = chosenOpp.elements[Math.floor(Math.random() * 2)];

      console.log(chosenOpp.name + " is attacking...")
      console.log("--------------------------------------")


      setTimeout(function () {
        chosenOpp.clash(chosenPlayer);
        $("#pHealth").html(chosenPlayer.health);

        roundCount++;
        $("#round").html(roundCount)
        playGame();

      }, 3000);



      break;

    case (tooSlow):


      atkElem = chosenOpp.elements[Math.floor(Math.random() * 2)];

      console.log(chosenOpp.name + " is attacking...")
      console.log("--------------------------------------")


      setTimeout(function () {
        chosenOpp.clash(chosenPlayer);
        $("#pHealth").html(chosenPlayer.health);
      }, 3000);

      if (chosenPlayer.health <= 0) {

        console.log("You lose!")

      }


      break;

    default:
    //pass
  }
}


// 3 3 3 3
// 4 4 2 2

// Fire>Earth>Air>Water>Fire

d20();




//health = vigor * 5

ramosAtr = new Attributes(3, 3, 3, 3);
davAtr = new Attributes(2, 4, 4, 2);
Ramos = new Character("Ramos", "", ramosAtr, sword, shield, 13, 15, [sword.element, shield.element])
Davriel = new Character("Davriel", "", davAtr, axe, ring, 14, 20, [axe.element, ring.element])

chosenPlayer = Ramos;

$("#pHealth").html(chosenPlayer.health);

chosenOpp = Davriel;

$("#oHealth").html(chosenOpp.health);

// Round 1
$("#round").html(roundCount)
playGame();

$("#atkButton1").click(function () {

  $("#atkElem").html(atkElem);

  if (tooSlow == true) {
    tooSlow = false;
    roundCount++;
    $("#round").html(roundCount)
  }
  else { playerWent = true }

  atkElem = $("#atkButton1").html();
  chosenPlayer.clash(chosenOpp);

  $("#oHealth").html(chosenOpp.health);
  playGame();
});

$("#atkButton2").click(function () {

  $("#atkElem").html(atkElem);

  if (tooSlow == true) {
    tooSlow = false;
    roundCount++;
    $("#round").html(roundCount)
  }
  else { playerWent = true }

  atkElem = $("#atkButton2").html();
  chosenPlayer.clash(chosenOpp);

  $("#oHealth").html(chosenOpp.health);
  playGame();
});




