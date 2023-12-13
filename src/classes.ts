export interface SkillData {
  target1: "self" | "boss" | "allies" | "none";
  effect1: "damage" | "heal" | "set";
  value1: number;

  target2: "self" | "boss" | "allies" | "none";
  effect2: "damage" | "heal" | "set";
  value2: number;
}

export interface BaseClass {
  name: string;
  health: number;
  attack: number;
  skill1Description: string;
  skill2Description: string;

  skill1(): SkillData;
  skill2(): SkillData;
}

class Berserker implements BaseClass {
  name: string;
  health: number;
  attack: number;
  skill1Description: string;
  skill2Description: string;

  constructor() {
    this.name = "Berserker";
    this.health = 100;
    this.attack = 30;
    this.skill1Description =
      "Takes some damage to deal heavy damage to the boss";
    this.skill2Description = "Damage all allies to massively damage the boss";
  }

  skill1(): SkillData {
    return {
      target1: "self",
      effect1: "damage",
      value1: 10,

      target2: "boss",
      effect2: "damage",
      value2: 100,
    };
  }

  skill2(): SkillData {
    return {
      target1: "allies",
      effect1: "damage",
      value1: 10,

      target2: "boss",
      effect2: "damage",
      value2: 200,
    };
  }
}

class Gambler implements BaseClass {
  name: string;
  health: number;
  attack: number;
  skill1Description: string;
  skill2Description: string;

  constructor() {
    this.name = "Gambler";
    this.health = 125;
    this.attack = 20;
    this.skill1Description =
      "50% to hurt the boss and heal, 50% to take damage";
    this.skill2Description =
      "50% to massively damage the boss, 50% to hurt all allies";
  }

  skill1(): SkillData {
    if (Math.random() < 0.5) {
      return {
        target1: "self",
        effect1: "heal",
        value1: 25,

        target2: "boss",
        effect2: "damage",
        value2: 50,
      };
    } else {
      return {
        target1: "self",
        effect1: "damage",
        value1: 25,

        target2: "none",
        effect2: "damage",
        value2: 0,
      };
    }
  }

  skill2(): SkillData {
    if (Math.random() < 0.5) {
      return {
        target1: "boss",
        effect1: "damage",
        value1: 500,

        target2: "none",
        effect2: "damage",
        value2: 0,
      };
    } else {
      return {
        target1: "allies",
        effect1: "damage",
        value1: 25,

        target2: "none",
        effect2: "damage",
        value2: 0,
      };
    }
  }
}

class Guardian implements BaseClass {
  name: string;
  health: number;
  attack: number;
  skill1Description: string;
  skill2Description: string;

  constructor() {
    this.name = "Guardian";
    this.health = 200;
    this.attack = 10;
    this.skill1Description = "Use your own health to heal all other allies";
    this.skill2Description = "Heavily damage the boss but take some damage";
  }

  skill1(): SkillData {
    return {
      target1: "allies",
      effect1: "heal",
      value1: 25,

      target2: "self",
      effect2: "damage",
      value2: 10,
    };
  }

  skill2(): SkillData {
    return {
      target1: "boss",
      effect1: "damage",
      value1: 100,

      target2: "self",
      effect2: "damage",
      value2: 10,
    };
  }
}

class Mage implements BaseClass {
  name: string;
  health: number;
  attack: number;
  skill1Description: string;
  skill2Description: string;

  constructor() {
    this.name = "Mage";
    this.health = 150;
    this.attack = 20;
    this.skill1Description = "Use your own health to heavily damage the boss";
    this.skill2Description = "Damage all of your allies to heal";
  }

  skill1(): SkillData {
    return {
      target1: "boss",
      effect1: "damage",
      value1: 150,

      target2: "self",
      effect2: "damage",
      value2: 10,
    };
  }

  skill2(): SkillData {
    return {
      target1: "allies",
      effect1: "damage",
      value1: 10,

      target2: "self",
      effect2: "heal",
      value2: 50,
    };
  }
}

class Judge implements BaseClass {
  name: string;
  health: number;
  attack: number;
  skill1Description: string;
  skill2Description: string;

  constructor() {
    this.name = "Judge";
    this.health = 175;
    this.attack = 20;
    this.skill1Description =
      "Take damage to set the health of all allies to 100";
    this.skill2Description =
      "Deals damage to all allies to do massive damage to the boss";
  }

  skill1(): SkillData {
    return {
      target1: "self",
      effect1: "damage",
      value1: 25,

      target2: "allies",
      effect2: "set",
      value2: 100,
    };
  }

  skill2(): SkillData {
    return {
      target1: "boss",
      effect1: "damage",
      value1: 300,

      target2: "allies",
      effect2: "damage",
      value2: 25,
    };
  }
}

class Cleric implements BaseClass {
  name: string;
  health: number;
  attack: number;
  skill1Description: string;
  skill2Description: string;

  constructor() {
    this.name = "Cleric";
    this.health = 150;
    this.attack = 10;
    this.skill1Description = "Heals all allies and the boss";
    this.skill2Description = "Use your own health to greatly heal your allies";
  }

  skill1(): SkillData {
    return {
      target1: "allies",
      effect1: "heal",
      value1: 25,

      target2: "boss",
      effect2: "heal",
      value2: 200,
    };
  }

  skill2(): SkillData {
    return {
      target1: "allies",
      effect1: "heal",
      value1: 50,

      target2: "self",
      effect2: "damage",
      value2: 25,
    };
  }
}

export const classList: string[] = [
  "berserker",
  "gambler",
  "guardian",
  "mage",
  "cleric",
  "judge",
];

export function getClassFromString(type: string): BaseClass {
  switch (type) {
    case "berserker":
      return new Berserker();
    case "gambler":
      return new Gambler();
    case "guardian":
      return new Guardian();
    case "mage":
      return new Mage();
    case "judge":
      return new Judge();
  }
  return new Cleric();
}
