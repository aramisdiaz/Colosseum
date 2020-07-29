INSERT INTO weapon (weapon_name, attribute, element)
VALUES
  ("sword", "attack", "Fire"),
  ("spear", "defense", "Water"),
  ("axe", "vigor", "Earth"),
  ("bow", "agility", "Air");


INSERT INTO accessory (accessory_name, attribute, element)
VALUES
  ("gauntlet", "attack", "Fire"),
  ("shield", "defense", "Water"),
  ("amulet", "vigor", "Earth"),
  ("ring", "agility", "Air");


INSERT INTO attributes (attack, defense, vigor, agility)
VALUES
  (5, 2, 2, 5),
  (5, 2, 5, 2),
  (2, 5, 5, 2),
  (2, 5, 2, 5),
  (5, 5, 2, 2),
  (2, 2, 5, 5),
  (4, 4, 3, 3),
  (3, 3, 4, 4);


INSERT INTO characters (character_name, pic, attributes_id, weapon_id, accessory_id, champ)
VALUES ("Shiro", 
"https://vignette.wikia.nocookie.net/katana-zero/images/2/26/DrawSword.gif/revision/latest/top-crop/width/300/height/300?cb=20190726170605",
 1, 1, 4, false),
  ("Brigitte", "https://i2.wp.com/lost-fortress.com/wp-content/uploads/2017/08/tutorial_dwarf_women_attack_original.gif?resize=320%2C320",
 2, 3, 1, false),
  ("Reginald", "https://www.cageclaypool.com/uploads/8/0/4/6/8046705/00_orig.gif",
 3, 2, 3, false),
  ("Matilda", "https://lh3.googleusercontent.com/proxy/gOjoZal75Ti8T727a1AcJTtTgqGPOYha3Mt4PJ-YetdvN-I5yUxaS3CpgxzcJdIq0sXY49_SjF7Sc120avh_BvHYS833heaYJNfm80U4SAu2QP3QdBbLhDUeGYUiIa6GfDHyY8j1za_RuR_xMp6x5GEGuCKyKlkVBvDwr9h1xUvZ5jmvfQSpctM",
 4, 4, 2, false),
  ("Tikal", "https://i.imgur.com/S5AZdUj.gif",
 5, 1, 2, false),
  ("Strider", "https://i.pinimg.com/originals/87/6f/67/876f6717676e98ada475e59a2860d13f.gif",
 6, 4, 3, false),
  ("Emiril", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/82743ade-a85f-483f-854e-d8091a7c621f/da2yu72-02af75ac-aac4-42fb-adc4-452f8d113d57.gif",
 7, 2, 1, false),
  ("Death", "https://art.pixilart.com/98bb7b11fc00cf1.gif",
 8, 3, 4, true);