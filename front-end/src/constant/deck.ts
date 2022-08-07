interface deckAttribute {
  defaultSkill: string;
  otherSkill: string[];
}

const deck: Record<string, deckAttribute> = {
  小角龙: {
    defaultSkill: '1111',
    otherSkill: [
      '生命值增加a',
      '注定一抽'
    ],
  },
  黑魔导: {
    defaultSkill: '羁绊之力',
    otherSkill: [
      '注定一抽',
    ],
  },
  // 小角龙: {},
  // 小角龙: {},
  // 小角龙: {},
  // 小角龙: {},
  // 小角龙: {},
  // 小角龙: {},
  // 小角龙: {},
  // 小角龙: {},
  // 小角龙: {},
};

export default deck;
