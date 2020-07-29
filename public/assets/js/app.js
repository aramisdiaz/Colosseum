var d20roll;
var d8roll;
var toHit;
var chosenPlayer;
var chosenOpp;
var playerWent;
var playerInitiative;
var oppInitiative;
var tooSlow;
var roundCount = 1;
var numberStrong = 0;
var numberWeak = 0;
var isValid = false;

var weaponIsEquipped = false;
var accessoryIsEquipped = false;
var equippedWeapon;
var equippedAccessory;

var editedAttack = 3;
var editedDefense = 3;
var editedVigor = 3;
var editedAgility = 3;



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
var sword = new Weapon("sword", "attack", "Fire");
var bow = new Weapon("bow", "agility", "Air");
var spear = new Weapon("spear", "defense", "Water");
var axe = new Weapon("axe", "vigor", "Earth");

var gauntlet = new Accessory("gauntlet", "attack", "Fire");
var ring = new Accessory("ring", "agility", "Air");
var shield = new Accessory("shield", "defense", "Water");
var amulet = new Accessory("amulet", "vigor", "Earth");


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



    console.log(this.name + " attacks with " + this.atkElem);
    console.log("--------------------------------------")

    console.log(opponentCharacter.name + " defends with " + opponentCharacter.defElem);
    console.log("--------------------------------------")

    $("#defElem").html(opponentCharacter.defElem)

    this.resCheck(opponentCharacter);
    console.log("Resistance = " + res)

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

//Ai in here
function playGame() {

  chosenPlayer.rollInitiative(chosenOpp);

  switch (true) {

    case (chosenPlayer.health <= 0):
      $(".atkButton").prop('disabled', true);
      console.log("You lose!")
      //Game Over Screen

      break;

    case (chosenOpp.health <= 0):
      $(".atkButton").prop('disabled', true);
      console.log("You win!")
      //Next Round Function

      break;

    case (playerWent):

      $(".atkButton").prop('disabled', true);
      playerWent = false;


      chosenOpp.atkElem = chosenOpp.elements[Math.floor(Math.random() * 2)];
      $("#atkElem").html(chosenOpp.atkElem);
      chosenOpp.defElem = chosenOpp.atkElem;

      console.log(chosenOpp.name + " is attacking with " + chosenOpp.atkElem + "...")
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
        $("#pHealth").html(chosenPlayer.health);
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
    console.log("You lose!")}
  
    else if (chosenOpp.health <= 0) {
    $(".atkButton").prop('disabled', true);
    console.log("You win!")}
}

$(".charCreate").chosen({
  disable_search: true,
  max_selected_options: 2
});


var checkStrong = function (evt) {
  numberStrong = evt.currentTarget.selectedOptions.length;
}

var checkWeak = function (evt) {
  numberWeak = evt.currentTarget.selectedOptions.length;
}

var updateStat = function (evt, params) {

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

  console.log(evt.currentTarget.value);
  console.log(evt)
  console.log(params);

  updateStat(evt, params);

  console.log(numberStrong);
  console.log(numberWeak);

  $(".charCreate").trigger("chosen:updated");
});


$("#submit").on("click", function (event) {
  event.preventDefault();

  console.log(event)

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
    
    $("#submit").hide();

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

    console.log(editedAttack);
    console.log(editedDefense);
    console.log(editedAgility);
    console.log(editedVigor);

    var creationAttributes = new Attributes((editedAttack), (editedDefense), (editedVigor), (editedAgility));

    var answers = {
      name: $("#name").val(),
      pic: $("#pic").val(),
      weapon: equippedWeapon,
      accessory: equippedAccessory,
      attributes: creationAttributes,
      armorClass: (10 + Math.floor((creationAttributes.defense + creationAttributes.agility) * .5)),
      health: (creationAttributes.vigor * 5),
      elements: [equippedWeapon.element, equippedAccessory.element]
    };
    console.log(answers)

    var newCharacter = new Character(
      answers.name,
      answers.pic,
      answers.attributes,
      answers.weapon,
      answers.accessory,
      answers.armorClass,
      answers.health,
      answers.elements,
    );

    for (i = 0; i < newCharacter.elements.length; i++) {
      $( "#buttonField" ).append( "<button type='button' id='" + newCharacter.elements[i] + "Button' class='btn btn-primary atkButton'>" + newCharacter.elements[i] + "</button>" );
    }

    chosenPlayer = newCharacter;
    $("#pHealth").html(chosenPlayer.health);
    $("#playerPortrait").attr("src", chosenPlayer.pic);
    gameInit();

    $(".atkButton").click(function () {

      if (roundCount == 1) {
        chosenOpp.defElem = chosenOpp.elements[Math.floor(Math.random() * 2)];
      }
    
      if (tooSlow == true) {
        roundCount++;
        $("#round").html(roundCount)
        tooSlow = false;
      }
      else { playerWent = true }
    
      chosenPlayer.atkElem = $(this).html();
      $("#atkElem").html(chosenPlayer.atkElem);
      chosenPlayer.clash(chosenOpp);
      $("#oHealth").html(chosenOpp.health);
      chosenPlayer.defElem = chosenPlayer.atkElem
    
    
      playGame();
    });
    
  }

  console.log(isValid);


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



//Test code, remove later

davAtr = new Attributes(3, 4, 4, 3);
Death = new Character("Death", "https://art.pixilart.com/98bb7b11fc00cf1.gif", davAtr, axe, ring, 13, 20, [axe.element, ring.element])
chosenOpp = Death;
$("#opponentPortrait").attr("src", chosenOpp.pic);
$("#oHealth").html(chosenOpp.health);

//1.Attack 2.Defense 3.Vigor 4.Agility
//End Test Code



// Round 1

gameInit = function () {
  //Assign Opponent
  $("#round").html(roundCount)
  playGame();
}



