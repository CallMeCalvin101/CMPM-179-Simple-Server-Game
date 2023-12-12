interface SkillData {
  target1: "self" | "boss" | "allies" | "none";
  effect1: "damage" | "heal" | "set";
  value1: number;

  target2: "self" | "boss" | "allies" | "none";
  effect2: "damage" | "heal" | "set";
  value2: number;
}

interface BaseClass {
  name: string;
  health: number;
  attack: number;

  skill1(): SkillData;
  skill2(): SkillData;
}

class Berserker implements BaseClass {
  name: string;
  health: number;
  attack: number;

  constructor() {
    this.name = "Berserker";
    this.health = 100;
    this.attack = 30;
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

  constructor() {
    this.name = "Gambler";
    this.health = 125;
    this.attack = 20;
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
