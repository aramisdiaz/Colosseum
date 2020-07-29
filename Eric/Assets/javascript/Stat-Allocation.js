const trunc = v => {
    if (v >= 0) {
        return Math.trunc(v);
    } else {
        const truncated = Math.trunc(v);

        if (truncated === v) {
            return truncated;
        } else {
            return truncated - 1;
        }
    }
};

export const abilityModifier = ability => {
    if (ability < 3) {
        throw new Error("Ability scores must be at least 3");
    }

    if (ability > 18) {
        throw new Error("Ability scores can be at most 18");
    }

    return trunc((ability - 10) / 2);
};

const randomInt = limit => trunc(Math.random() * limit);

const sum = l => l.reduce((a, b) => a + b, 0, l);

export class Character {
    static rollAbility() {
        const rolls = [];

        for (let i = 0; i < 4; i++) {
            rolls.push(randomInt(6) + 1);
        }

        return sum(
            rolls
                .sort()
                .reverse()
                .slice(0, 3),
        );
    }

    constructor() {
        this.strength = Character.rollAbility();
        this.dexterity = Character.rollAbility();
        this.constitution = Character.rollAbility();
        this.intelligence = Character.rollAbility();
        this.wisdom = Character.rollAbility();
        this.charisma = Character.rollAbility();
        this.hitpoints = 10 + abilityModifier(this.constitution);
    }
}
