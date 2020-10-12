
let newCharacter;
let d20roll;
let d8roll;
let toHit;
let chosenPlayer;
let chosenOpp;
let playerWent;
let playerInitiative;
let oppInitiative;
let tooSlow;
let roundCount = 1;
let numberStrong = 0;
let numberWeak = 0;
let isValid = false;
let battleCount = 0;
let damageTaken = 0;
let res = 0;
let strike = 0;
let damage = 0;

let weaponIsEquipped = false;
let accessoryIsEquipped = false;
let equippedWeapon;
let equippedAccessory;
let newOpponentWeapon;
let newOpponentAccessory;

let editedAttack = 3;
let editedDefense = 3;
let editedVigor = 3;
let editedAgility = 3;


$("#bannerField").hide();
$("#battleField").hide();
$("#buttonField").hide();
$("#healthField").hide();


function Attributes(attack, defense, vigor, agility) {
  this.attack = attack;
  this.defense = defense;
  this.vigor = vigor;
  this.agility = agility;
}

function Weapon(id, name, attribute, element) {
  this.id = id;
  this.name = name;
  this.attribute = attribute;
  this.element = element
}

function Accessory(id, name, attribute, element) {
  this.id = id;
  this.name = name;
  this.attribute = attribute;
  this.element = element
}

//Make into a table in MYSQL
let sword = new Weapon("1", "sword", "attack", "Fire");
let bow = new Weapon("4", "bow", "agility", "Air");
let spear = new Weapon("2", "spear", "defense", "Water");
let axe = new Weapon("3", "axe", "vigor", "Earth");

let gauntlet = new Accessory("1", "gauntlet", "attack", "Fire");
let ring = new Accessory("4", "ring", "agility", "Air");
let shield = new Accessory("2", "shield", "defense", "Water");
let amulet = new Accessory("3", "amulet", "vigor", "Earth");


function d20() {
  d20roll = Math.ceil(Math.random() * Math.ceil(20));
}

function d8() {
  d8roll = Math.ceil(Math.random() * Math.ceil(8));
}


function Character(name, pic, attributes, weapon, accessory, armorClass, health, elements, atkElem, defElem) {
  this.name = name;
  this.pic = pic;
  this.attributes = attributes
  this.weapon = weapon;
  this.accessory = accessory;
  this.armorClass = armorClass;
  this.health = health;
  this.elements = elements;
  this.atkElem = atkElem;
  this.defElem = defElem;

  this.maxHealth = health;


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


  this.resCheck = function (opponentCharacter) {

    switch (true) {

      // Weaknesses
      case (this.atkElem == "Fire") && (opponentCharacter.defElem == "Earth"):
        res = 2;
        break;

      case (this.atkElem == "Air") && (opponentCharacter.defElem == "Water"):
        res = 2;
        break;

      case (this.atkElem == "Water") && (opponentCharacter.defElem == "Fire"):
        res = 2;
        break;

      case (this.atkElem == "Earth") && (opponentCharacter.defElem == "Air"):
        res = 2;
        break;

      // Resistances
      case (this.atkElem == "Earth") && (opponentCharacter.defElem == "Fire"):
        res = 0.5;
        break;

      case (this.atkElem == "Water") && (opponentCharacter.defElem == "Air"):
        res = 0.5;
        break;

      case (this.atkElem == "Fire") && (opponentCharacter.defElem == "Water"):
        res = 0.5;
        break;

      case (this.atkElem == "Air") && (opponentCharacter.defElem == "Earth"):
        res = 0.5;
        break;

      // Defaults to no advantage
      default:
        res = 1

    }
  }

  this.clash = function (opponentCharacter) {

    d20();
    d8();



    $("#bannerField").html(this.name + " attacks with " + this.atkElem);
    console.log(this.name + " attacks with " + this.atkElem)
    console.log("--------------------------------------")

    console.log(opponentCharacter.name + " defends with " + opponentCharacter.defElem);
    console.log("--------------------------------------")

    $("#defElem").html(opponentCharacter.defElem)

    this.resCheck(opponentCharacter);
    console.log("Resistance = " + res)

    toHit = (d20roll + this.attributes.attack);
    $("#bannerField").html(this.name + " rolls " + toHit + " to hit!")
    console.log(this.name + " rolls " + toHit + " to hit!");


    if (toHit >= armorClass) {
      strike = (this.attributes.attack + d8roll) - opponentCharacter.attributes.defense;


      switch (true) {

        case (d20roll == 20 && strike >= 1):
          damage = Math.ceil((strike * res * 2));
          opponentCharacter.health -= damage;
          damageTaken += damage;
          console.log("A critical hit!")
          break;

        case (d20roll == 20 && strike < 1):
          damage = Math.ceil((1 * res * 2));
          opponentCharacter.health -= damage;
          damageTaken += damage;
          console.log("A critical hit!")
          break;

        case (d20roll !== 20 && strike >= 1):
          damage = Math.ceil((strike * res));
          opponentCharacter.health -= damage;
          damageTaken += damage;
          break;

        default:
          damage = Math.ceil(1 * res);
          opponentCharacter.health -= damage;
          damageTaken += damage;
      }

      $("#damage").html(damage)
      $("#defender").html(opponentCharacter.name)
      $("#bannerField").html(opponentCharacter.name + " takes " + damage + " damage!")
      console.log(opponentCharacter.name + " takes " + damage + " damage!")
      console.log("--------------------------------------")
    }

    else {
      $("#damage").html(0)
      $("#bannerField").html(this.name + "'s attack misses!")
      console.log(this.name + "'s attack misses!")
      console.log("--------------------------------------")
    }
  }
}

//Ai in here
function playGame() {

  chosenPlayer.rollInitiative(chosenOpp);

  switch (true) {

    case (chosenPlayer.health <= 0):
      $(".atkButton").prop('disabled', true);
      $("#bannerField").html("You lose!")
      //Game Over Screen

      break;

    case (chosenOpp.health <= 0):
      $(".atkButton").prop('disabled', true);
      $("#bannerField").html("You win!")
      //Next Round Function
      battleCount += 1;
      nextRound();

      break;

    case (playerWent):

      $(".atkButton").prop('disabled', true);
      playerWent = false;


      chosenOpp.atkElem = chosenOpp.elements[Math.floor(Math.random() * 2)];
      $("#atkElem").html(chosenOpp.atkElem);
      chosenOpp.defElem = chosenOpp.atkElem;

      $("#bannerField").html(chosenOpp.name + " is attacking with " + chosenOpp.atkElem + "...")
      console.log(chosenOpp.name + " is attacking with " + chosenOpp.atkElem + "...")
      console.log("--------------------------------------")

      //Add Animations Here

      setTimeout(function () {
        chosenOpp.clash(chosenPlayer);
        $("#playerHealthButton").html(chosenPlayer.health);
        roundCount++;
        $("#roundField").html("Round: " + roundCount)
        playGame();

      }, 3000);



      break;

    case (tooSlow):

      $(".atkButton").prop('disabled', true);


      if (roundCount == 1) {
        chosenPlayer.defElem = chosenPlayer.elements[Math.floor(Math.random() * 2)];
      }

      chosenOpp.atkElem = chosenOpp.elements[Math.floor(Math.random() * 2)];
      $("#atkElem").html(chosenOpp.atkElem);
      chosenOpp.defElem = chosenOpp.atkElem;

      console.log(chosenOpp.name + " is attacking with " + chosenOpp.atkElem + "...")
      console.log("--------------------------------------")

      //Add Animations Here

      setTimeout(function () {
        chosenOpp.clash(chosenPlayer);
        $("#playerHealthButton").html(chosenPlayer.health);
        $(".atkButton").prop('disabled', false);
      }, 3000);

      if (chosenPlayer.health <= 0) {
        $(".atkButton").prop('disabled', true);
        console.log("You lose!")
        //Game Over Screen

      }

      break;

    default:
    //pass
  }
  if (chosenPlayer.health <= 0) {
    $(".atkButton").prop('disabled', true);
    console.log("You lose!")
  }

  else if (chosenOpp.health <= 0) {
    $(".atkButton").prop('disabled', true);
    console.log("You win!")
    battleCount += 1;
    nextRound();
  }
}

$(".charCreate").chosen({
  disable_search: true,
  max_selected_options: 2
});


let checkStrong = function (evt) {
  numberStrong = evt.currentTarget.selectedOptions.length;
}

let checkWeak = function (evt) {
  numberWeak = evt.currentTarget.selectedOptions.length;
}

let updateStat = function (evt, params) {

  switch (params.selected) {

    case ("strongAttack"):
      $("#chosenWeakAttack").attr("disabled", "disabled");
      editedAttack += 1
      checkStrong(evt);
      break;

    case ("strongDefense"):
      $("#chosenWeakDefense").attr("disabled", "disabled");
      editedDefense += 1
      checkStrong(evt);
      break;

    case ("strongAgility"):
      $("#chosenWeakAgility").attr("disabled", "disabled");
      editedAgility += 1
      checkStrong(evt);
      break;

    case ("strongVigor"):
      $("#chosenWeakVigor").attr("disabled", "disabled");
      editedVigor += 1
      checkStrong(evt);
      break;

    case ("weakAttack"):
      $("#chosenStrongAttack").attr("disabled", "disabled");
      editedAttack -= 1
      checkWeak(evt);
      break;

    case ("weakDefense"):
      $("#chosenStrongDefense").attr("disabled", "disabled");
      editedDefense -= 1
      checkWeak(evt);
      break;

    case ("weakAgility"):
      $("#chosenStrongAgility").attr("disabled", "disabled");
      editedAgility -= 1
      checkWeak(evt);
      break;

    case ("weakVigor"):
      $("#chosenStrongVigor").attr("disabled", "disabled");
      editedVigor -= 1
      checkWeak(evt);
      break;

    case ("sword"):
      $(".accessories").removeAttr("disabled");
      $("#chosenGauntlet").attr("disabled", "disabled");
      equippedWeapon = sword;
      weaponIsEquipped = true;
      break;


    case ("spear"):
      $(".accessories").removeAttr("disabled");
      $("#chosenShield").attr("disabled", "disabled");
      equippedWeapon = spear;
      weaponIsEquipped = true;
      break;

    case ("bow"):
      $(".accessories").removeAttr("disabled");
      $("#chosenRing").attr("disabled", "disabled");
      equippedWeapon = bow;
      weaponIsEquipped = true;
      break;

    case ("axe"):
      $(".accessories").removeAttr("disabled");
      $("#chosenAmulet").attr("disabled", "disabled");
      equippedWeapon = axe;
      weaponIsEquipped = true;
      break;

    case ("gauntlet"):
      $(".weapons").removeAttr("disabled");
      $("#chosenSword").attr("disabled", "disabled");
      equippedAccessory = gauntlet;
      accessoryIsEquipped = true;
      break;

    case ("shield"):
      $(".weapons").removeAttr("disabled");
      $("#chosenSpear").attr("disabled", "disabled");
      equippedAccessory = shield;
      accessoryIsEquipped = true;
      break;

    case ("ring"):
      $(".weapons").removeAttr("disabled");
      $("#chosenBow").attr("disabled", "disabled");
      equippedAccessory = ring;
      accessoryIsEquipped = true;
      break;

    case ("amulet"):
      $(".weapons").removeAttr("disabled");
      $("#chosenAxe").attr("disabled", "disabled");
      equippedAccessory = amulet;
      accessoryIsEquipped = true;
      break;

    default:


  }

  switch (params.deselected) {
    case ("strongAttack"):
      $("#chosenWeakAttack").removeAttr("disabled");
      editedAttack -= 1;
      checkStrong(evt);
      break;

    case ("strongDefense"):
      $("#chosenWeakDefense").removeAttr("disabled");
      editedDefense -= 1;
      checkStrong(evt);
      break;

    case ("strongAgility"):
      $("#chosenWeakAgility").removeAttr("disabled");
      editedAgility -= 1;
      checkStrong(evt);
      break;

    case ("strongVigor"):
      $("#chosenWeakVigor").removeAttr("disabled");
      editedVigor -= 1;
      checkStrong(evt);
      break;

    case ("weakAttack"):
      $("#chosenStrongAttack").removeAttr("disabled");
      editedAttack += 1;
      checkWeak(evt)
      break;

    case ("weakDefense"):
      $("#chosenStrongDefense").removeAttr("disabled");
      editedDefense += 1;
      checkWeak(evt)
      break;

    case ("weakAgility"):
      $("#chosenStrongAgility").removeAttr("disabled");
      editedAgility += 1;
      checkWeak(evt)
      break;

    case ("weakVigor"):
      $("#chosenStrongVigor").removeAttr("disabled");
      editedVigor += 1;
      checkWeak(evt)
      break;

    default:
  }

}


$('.charCreate').on('change', function (evt, params) {



  updateStat(evt, params);
  $("#attackDisplay").html(editedAttack);
  $("#defenseDisplay").html(editedDefense);
  $("#vigorDisplay").html(editedVigor);
  $("#agilityDisplay").html(editedAgility);


  $(".charCreate").trigger("chosen:updated");
});




$("#gameStart").on("click", function (event) {
  event.preventDefault();

  switch (false) {
    case ($("#name").val() != ""):
      console.log("You must enter a name!")
      break;

    case ($("#pic").val() != ""):
      console.log("You must submit an image link!")
      break;


    case (numberStrong === numberWeak):
      console.log("You must choose an equal number of Strengths and Weaknesses!")
      break;

    case (weaponIsEquipped):
      console.log("You must equip a weapon!")
      break;

    case (accessoryIsEquipped):
      console.log("You must equip an accessory!")
      break;

    default:
      isValid = true
  }

  if (isValid == true) {

    $("#creationMenu").hide();
    $("#bannerField").show();
    $("#battleField").show();
    $("#buttonField").show();
    $("#healthField").show();



    switch (equippedWeapon.attribute) {
      case ("attack"):
        editedAttack += 1;
        break;

      case ("defense"):
        editedDefense += 1;
        break;

      case ("vigor"):
        editedVigor += 1;
        break;

      case ("agility"):
        editedAgility += 1;
        break;

      default:

    }

    switch (equippedAccessory.attribute) {
      case ("attack"):
        editedAttack += 1;
        break;

      case ("defense"):
        editedDefense += 1;
        break;

      case ("vigor"):
        editedVigor += 1;
        break;

      case ("agility"):
        editedAgility += 1;
        break;

      default:

    }



    let creationAttributes = new Attributes((editedAttack), (editedDefense), (editedVigor), (editedAgility));

    let answers = {
      name: $("#name").val(),
      pic: $("#pic").val(),
      weapon: equippedWeapon,
      accessory: equippedAccessory,
      attributes: creationAttributes,
      armorClass: (10 + Math.floor((creationAttributes.defense + creationAttributes.agility) * .5)),
      health: (creationAttributes.vigor * 5),
      elements: [equippedWeapon.element, equippedAccessory.element]
    };


    newCharacter = new Character(
      answers.name,
      answers.pic,
      answers.attributes,
      answers.weapon,
      answers.accessory,
      answers.armorClass,
      answers.health,
      answers.elements,
    );

    chosenPlayer = newCharacter;

    $("#healthField").append("<button type='button' id='playerHealthButton' class='btn btn-success'>" + chosenPlayer.health + "</button>")

    for (let i = 0; i < chosenPlayer.elements.length; i++) {
      $("#buttonField").append("<button type='button' id='" + chosenPlayer.elements[i] + "Button' class='btn btn-primary atkButton'>" + chosenPlayer.elements[i] + "</button>");
    }

    $("#playerHealthButton").html(chosenPlayer.health);
    $("#playerPortrait").attr("src", chosenPlayer.pic);
    gameInit();

  }

  $(".atkButton").click(function () {

    if (roundCount == 1) {
      chosenOpp.defElem = chosenOpp.elements[Math.floor(Math.random() * 2)];
    }

    if (tooSlow == true) {
      roundCount++;
      $("#roundField").html("Round: " + roundCount)
      tooSlow = false;
    }
    else { playerWent = true }

    chosenPlayer.atkElem = $(this).html();
    $("#atkElem").html(chosenPlayer.atkElem);
    chosenPlayer.clash(chosenOpp);
    $("#opponentHealthButton").html(chosenOpp.health);
    chosenPlayer.defElem = chosenPlayer.atkElem


    playGame();

  });




  /*
    //if (isValid === true) {
  
    $.post("/character/create:" + chosenOpp.id, newCharacter, function (data) {
  
  
      $("#match-name").text(data.name);
      $("#match-img").attr("src", data.pic);
      $("#results-modal").modal("toggle");
  
    });
  
    //}
  
    //else {}
  */
});




let contestants = []




for (let i = 0; i < 4; i++) {

  let selector = Math.ceil(Math.random() * Math.ceil(7));

  switch ($("#" + selector + "Weapon").html()) {

    case ("1"):
      newOpponentWeapon = sword
      break

    case ("2"):
      newOpponentWeapon = spear
      break

    case ("3"):
      newOpponentWeapon = axe
      break

    case ("4"):
      newOpponentWeapon = bow
      break

    default:

  }

  switch ($("#" + selector + "Accessory").html()) {

    case ("1"):
      newOpponentAccessory = gauntlet
      break

    case ("2"):
      newOpponentAccessory = shield
      break

    case ("3"):
      newOpponentAccessory = amulet
      break

    case ("4"):
      newOpponentAccessory = ring
      break

    default:

  }


  let newAttributes = new Attributes(parseInt($("#" + selector + "Attack").html()), parseInt($("#" + selector + "Defense").html()), parseInt($("#" + selector + "Vigor").html()), parseInt($("#" + selector + "Agility").html()))

  let newOpponent = new Character(
    $("#" + selector + "Name").html(),
    $("#" + selector + "Pic").html(),
    newAttributes,
    newOpponentWeapon,
    newOpponentAccessory,
    (10 + ((parseInt($("#" + selector + "Defense").html()) + parseInt($("#" + selector + "Agility").html())) * 0.5)),
    (parseInt($("#" + selector + "Vigor").html()) * 5),
    [newOpponentWeapon.element, newOpponentAccessory.element]
  )

  contestants.push(newOpponent)

}
console.log(contestants)

/*
  davAtr = new Attributes(3, 4, 4, 3);
  Death = new Character("Death", "https://img.itch.zone/aW1nLzIxNzM5OTkuZ2lm/original/NvDD48.gif", davAtr, axe, ring, 13, 20, [axe.element, ring.element])
  chosenOpp = Death;*/


//$("#opponentHealthButton").html(chosenOpp.health);

//1.Attack 2.Defense 3.Vigor 4.Agility
//End Test Code

const nextRound = function () {

  if (battleCount < 4) {
    $("#roundField").html("Round: " + roundCount)
    roundCount = 1;

    chosenPlayer.health = chosenPlayer.maxHealth
    chosenOpp = contestants[battleCount];
    $("#playerHealthButton").html(chosenPlayer.health);
    $("#opponentHealthButton").html(chosenOpp.health);
    $("#opponentPortrait").attr("src", chosenOpp.pic);
    playGame();
  }

  else if (battleCount = 4) {
    $("#roundField").html("Round: " + roundCount)
    roundCount = 1;

    let selector = 8
    let newAttributes = new Attributes(parseInt($("#" + selector + "Attack").html()), parseInt($("#" + selector + "Defense").html()), parseInt($("#" + selector + "Vigor").html()), parseInt($("#" + selector + "Agility").html()))

    const finalBoss = new Character(
      $("#" + selector + "Name").html(),
      $("#" + selector + "Pic").html(),
      newAttributes,
      newOpponentWeapon,
      newOpponentAccessory,
      (10 + ((parseInt($("#" + selector + "Defense").html()) + parseInt($("#" + selector + "Agility").html())) * 0.5)),
      (parseInt($("#" + selector + "Vigor").html()) * 5),
      [newOpponentWeapon.element, newOpponentAccessory.element]
    )

    chosenPlayer.health = chosenPlayer.maxHealth
    chosenOpp = finalBoss;
    $("#playerHealthButton").html(chosenPlayer.health);
    $("#opponentHealthButton").html(chosenOpp.health);
    $("#opponentPortrait").attr("src", chosenOpp.pic);
    playGame();
  }

}



// Round 1
const gameInit = function () {
  chosenOpp = contestants[0]
  $("#opponentPortrait").attr("src", chosenOpp.pic);
  $("#healthField").append("<button type='button' id='opponentHealthButton' class='btn btn-success'>" + chosenOpp.health + "</button>")
  $("#roundField").html("Round: " + roundCount)
  playGame();
}



