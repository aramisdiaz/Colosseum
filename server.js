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




function Character(name, pic, attributes, weapon, accessory, armorClass, health, elements) {
  this.name = name;
  this.pic = pic;
  this.attributes = attributes
  this.weapon = weapon;
  this.accessory = accessory;
  this.armorClass = armorClass;
  this.health = health;
  this.elements = elements;


  this.rollInitiative = function (opponentCharacter) {

    d20();
    playerInitiative = (d20roll + this.attributes.agility);

    d20();
    oppInitiative = (d20roll + opponentCharacter.attributes.agility);

    if (playerInitiative < oppInitiative) {
      tooSlow = true
      $(".atkButton").prop('disabled', true);

    }

    else {
      tooSlow = false

      $(".atkButton").prop('disabled', false);
      //Show button
    }
  }

  this.clash = function (opponentCharacter) {

    d20();
    d8();



    console.log(this.name + " attacks with " + atkElem);
    console.log("--------------------------------------")

    console.log(opponentCharacter.name + " defends with " + defElem);
    console.log("--------------------------------------")

    $("#defElem").html(defElem)

    resCheck(atkElem, defElem);

    toHit = (d20roll + this.attributes.attack);
    console.log(this.name + " rolls " + toHit + " to hit!")


    if (toHit >= armorClass) {
      strike = (this.attributes.attack + d8roll) - opponentCharacter.attributes.defense;


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
    }

    else {
      $("#damage").html(0)
      console.log(this.name + "'s attack misses!")
      console.log("--------------------------------------")
    }
  }
}


function playGame() {

  chosenPlayer.rollInitiative(chosenOpp);

  switch (true) {

    case (chosenPlayer.health <= 0):

      console.log("You lose!")
      //Game Over Screen

      break;

    case (chosenOpp.health <= 0):

      console.log("You win!")
      //Next Round Function

      break;

    case (playerWent):

      playerWent = false;
      $(".atkButton").prop('disabled', true);

      atkElem = chosenOpp.elements[Math.floor(Math.random() * 2)];
      $("#atkElem").html(atkElem);

      console.log(chosenOpp.name + " is attacking...")
      console.log("--------------------------------------")

      //Add Animations Here

      setTimeout(function () {
        chosenOpp.clash(chosenPlayer);
        $("#pHealth").html(chosenPlayer.health);

        roundCount++;
        $("#round").html(roundCount)
        playGame();

      }, 3000);



      break;

    case (tooSlow):

      if (roundCount == 1) {
        defElem = chosenPlayer.elements[Math.floor(Math.random() * 2)];
      }

      $(".atkButton").prop('disabled', true);

      atkElem = chosenOpp.elements[Math.floor(Math.random() * 2)];
      $("#atkElem").html(atkElem);

      console.log(chosenOpp.name + " is attacking...")
      console.log("--------------------------------------")

      //Add Animations Here

      setTimeout(function () {
        chosenOpp.clash(chosenPlayer);
        $("#pHealth").html(chosenPlayer.health);
        $(".atkButton").prop('disabled', false);
      }, 3000);

      if (chosenPlayer.health <= 0) {

        console.log("You lose!")
        //Game Over Screen

      }

      break;

    default:
    //pass
  }
}

// Fire>Earth>Air>Water>Fire

d20();

var chosenSelectValue;
var chosenDeselectValue;

//Select Weapon, deselects Accessory of same element

$(".charCreate").chosen({
  disable_search: true,
  max_selected_options: 2
});


var updateStat = function (params) {

  switch (params.selected) {

    case ("0"):
      $("#chosenGauntlet").removeAttr("disabled");
      $("#chosenShield").removeAttr("disabled");
      $("#chosenRing").removeAttr("disabled");
      $("#chosenAmulet").removeAttr("disabled");
      break;

    case ("00"):
      $("#chosenSword").removeAttr("disabled");
      $("#chosenSpear").removeAttr("disabled");
      $("#chosenBow").removeAttr("disabled");
      $("#chosenAxe").removeAttr("disabled");
      break;

    case ("1"):
      $("#chosenWeakAttack").attr("disabled", "disabled");
      break;

    case ("2"):
      $("#chosenWeakDefense").attr("disabled", "disabled");
      break;

    case ("3"):
      $("#chosenWeakAgility").attr("disabled", "disabled");
      break;

    case ("4"):
      $("#chosenWeakVigor").attr("disabled", "disabled");
      break;

    case ("13"):
      $("#chosenStrongAttack").attr("disabled", "disabled");
      break;

    case ("14"):
      $("#chosenStrongDefense").attr("disabled", "disabled");
      break;

    case ("15"):
      $("#chosenStrongAgility").attr("disabled", "disabled");
      break;

    case ("16"):
      $("#chosenStrongVigor").attr("disabled", "disabled");
      break;

    case ("5"):
      $("#chosenGauntlet").removeAttr("disabled");
      $("#chosenShield").removeAttr("disabled");
      $("#chosenRing").removeAttr("disabled");
      $("#chosenAmulet").removeAttr("disabled");
      $("#chosenGauntlet").attr("disabled", "disabled");
      break;


    case ("6"):
      $("#chosenGauntlet").removeAttr("disabled");
      $("#chosenShield").removeAttr("disabled");
      $("#chosenRing").removeAttr("disabled");
      $("#chosenAmulet").removeAttr("disabled");
      $("#chosenShield").attr("disabled", "disabled");
      break;

    case ("7"):
      $("#chosenGauntlet").removeAttr("disabled");
      $("#chosenShield").removeAttr("disabled");
      $("#chosenRing").removeAttr("disabled");
      $("#chosenAmulet").removeAttr("disabled");
      $("#chosenRing").attr("disabled", "disabled");
      break;

    case ("8"):
      $("#chosenGauntlet").removeAttr("disabled");
      $("#chosenShield").removeAttr("disabled");
      $("#chosenRing").removeAttr("disabled");
      $("#chosenAmulet").removeAttr("disabled");
      $("#chosenAmulet").attr("disabled", "disabled");
      break;

    case ("9"):
      $("#chosenSword").removeAttr("disabled");
      $("#chosenSpear").removeAttr("disabled");
      $("#chosenBow").removeAttr("disabled");
      $("#chosenAxe").removeAttr("disabled");
      $("#chosenSword").attr("disabled", "disabled");
      break;

    case ("10"):
      $("#chosenSword").removeAttr("disabled");
      $("#chosenSpear").removeAttr("disabled");
      $("#chosenBow").removeAttr("disabled");
      $("#chosenAxe").removeAttr("disabled");
      $("#chosenSpear").attr("disabled", "disabled");
      break;

    case ("11"):
      $("#chosenSword").removeAttr("disabled");
      $("#chosenSpear").removeAttr("disabled");
      $("#chosenBow").removeAttr("disabled");
      $("#chosenAxe").removeAttr("disabled");
      $("#chosenBow").attr("disabled", "disabled");
      break;

    case ("12"):
      $("#chosenSword").removeAttr("disabled");
      $("#chosenSpear").removeAttr("disabled");
      $("#chosenBow").removeAttr("disabled");
      $("#chosenAxe").removeAttr("disabled");
      $("#chosenAxe").attr("disabled", "disabled");
      break;

    default:


  }

  switch (params.deselected) {
    case ("1"):
      $("#chosenWeakAttack").removeAttr("disabled");
      break;

    case ("2"):
      $("#chosenWeakDefense").removeAttr("disabled");

      break;

    case ("3"):
      $("#chosenWeakAgility").removeAttr("disabled");

      break;

    case ("4"):
      $("#chosenWeakVigor").removeAttr("disabled");

      break;

    case ("13"):
      $("#chosenStrongAttack").removeAttr("disabled");

      break;

    case ("14"):
      $("#chosenStrongDefense").removeAttr("disabled");

      break;

    case ("15"):
      $("#chosenStrongAgility").removeAttr("disabled");

      break;

    case ("16"):
      $("#chosenStrongVigor").removeAttr("disabled");

      break;


    default:

  }

  //Check for enabled item

}

$('.charCreate').on('change', function (evt, params) {

  console.log(evt.currentTarget.value);
  console.log(evt)
  console.log(params);

  updateStat(params);
  $(".charCreate").trigger("chosen:updated");
});

$("#creatorSubmit").click(function () {

//On submit weaponBonus += attribute
//statDisplay = attribute + weaponBonus + accBonus

  function creation(answers) {
    /*
     Runs the constructor and places the new player object into the variable `player`
     Turns the offense and defense variables into integers as well with parseInt
     */

    // armorClass = (10 + Math.floor((defense + agility) * .5));
    //health = 5 * vigor;
    //elements = [Weapon.element, Accessory.element];

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
});

//health = vigor * 5


//Go into charCreate


//chosenPlayer = new Character(answers.name, answers.pic, answers.playerAtr, answers.weapon, answers.accessory, answers.armorClass, answers.health, [answers.weapon.element, answers.accessory.element])


//Test code, remove later

ramosAtr = new Attributes(3, 3, 3, 3);
davAtr = new Attributes(2, 4, 4, 2);

Ramos = new Character("Ramos", "", ramosAtr, sword, shield, 13, 15, [sword.element, shield.element])
Davriel = new Character("Davriel", "", davAtr, axe, ring, 14, 20, [axe.element, ring.element])

chosenPlayer = Ramos;
$("#pHealth").html(chosenPlayer.health);

chosenOpp = Davriel;
$("#oHealth").html(chosenOpp.health);

//End Test Code





// Round 1

gameInit = function () {
  //Assign Opponent
  $("#round").html(roundCount)
  playGame();
  //Add Generate Buttons function
}

gameInit();

$(".atkButton").click(function () {

  if (roundCount == 1) {
    defElem = chosenOpp.elements[Math.floor(Math.random() * 2)];
  }

  if (tooSlow == true) {
    roundCount++;
    $("#round").html(roundCount)
    tooSlow = false;
  }
  else { playerWent = true }

  atkElem = $(this).html();
  $("#atkElem").html(atkElem);
  chosenPlayer.clash(chosenOpp);
  defElem = atkElem;

  $("#oHealth").html(chosenOpp.health);
  playGame();
});





