let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["băț"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: "băț", power: 5 },
  { name: "pumnal", power: 30 },
  { name: "ciocan mare rau", power: 50 },
  { name: "sabie", power: 100 },
];
const monsters = [
  {
    name: "Emoloaica",
    level: 2,
    health: 15,
  },
  {
    name: "Crina Lup",
    level: 8,
    health: 60,
  },
  {
    name: "Cristina Dragon Owner",
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: "town square",
    "button text": ["Magazin", "Pesteră", "Big boss"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Esti in lojă. Vezi un semn care spune "Magazin". Ce alegi sa faci?',
  },
  {
    name: "store",
    "button text": [
      "Ia 10 viata (10 biștari)",
      "Ia o arma nice (30 biștari)",
      "Inapoi in loja",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: 'Intri in magazin si-l auzi pe Vaiol: "Ia zi viata mea cu ce te servesc?"',
  },
  {
    name: "cave",
    "button text": ["Bati monstru mic", "Bati lup cu colți", "Inapoi in loja"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Pfaaaa, ca esti in pestera si e plin de monstrii, ti-o arzi cu cineva sau nah?",
  },
  {
    name: "fight",
    "button text": ["Lovesc", "Feresc", "Fug"],
    "button functions": [attack, dodge, goTown],
    text: "Te iei la trantă.",
  },
  {
    name: "kill monster",
    "button text": [
      "Mergi in loja",
      "Mergi in magazin",
      "Mergi in loja",
    ],
    "button functions": [goTown, goStore, easterEgg],
    text: 'Monstrul zice "Arg!" și moare incet dupa tine. Primesti viatsa si biștari',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "N-ai tupeu?", "Smr io?"],
    "button functions": [restart, restart, restart],
    text: "Ai murit hahaha ☠️",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "Bravo tată", "Ia uite ce baiat"],
    "button functions": [restart, restart, restart],
    text: "L-ai batut pe big boss 🎉",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: " Find da ball uer da ball, fii atent asta e ou de paste secret, nebunie ce sa mai, alege un numar de mai sus si eu trag altele 10 de la 0 la 10, daca numarul tau e printre ele castigi.",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Vaiol: N-ai bani saracule da-i drumu de aici";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Acum ai " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In inventarul tau bengos ai " + inventory;
    } else {
      text.innerText = "Vaiol: N-ai bani de arma saracule da-i drumu de aici";
    }
  } else {
    text.innerText = "Vaiol: Ai deja cea mai smechera arma bossule";
    button2.innerText = "Vine arma pentru 15 biștari";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Ai vandut " + currentWeapon + ".";
    text.innerText += " In inventarul tau bengos ai " + inventory;
  } else {
    text.innerText = "Un băț ai si pe ala in vinzi?";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = monsters[fighting].name + " ti-o dă.";
  text.innerText +=
    " Îi dai in cap cu " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
  } else {
    text.innerText += "Ratezi hahaha";
  }
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += inventory.pop() + " s-a rupt :( .";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}
function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}
function dodge() {
  text.innerText = "Te-ai ferit de atacul de la " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["băț"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Ai ales " + guess + ". Ia vezi astea 10 numere:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Tank! Primesti 20 de biștari!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Tzeapa! Pierzi 10 veatsa";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
