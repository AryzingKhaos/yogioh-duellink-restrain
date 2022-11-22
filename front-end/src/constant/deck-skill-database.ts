interface deckAttribute {
  defaultSkill: string;
  otherSkill: string[];
  allSkill?: string[];
}

const deckSkillDatabase: Record<string, deckAttribute> = {
  小角龙: {
    defaultSkill: '化学反应',
    otherSkill: ['生命值增加a', '注定一抽'],
  },
  黑魔导: {
    defaultSkill: '羁绊之力',
    otherSkill: ['注定一抽'],
  },
  破坏剑: {
    defaultSkill: '抽卡预感：低星',
    otherSkill: ['注定一抽', '无尽陷阱地狱', '羁绊之力'],
  },
  永火: {
    defaultSkill: '永火业火',
    otherSkill: ['虚无的波动'],
  },
  炎星: {
    defaultSkill: '宝玉之力',
    otherSkill: ['羁绊之力'],
  },
  核成: {
    defaultSkill: '羁绊之力',
    otherSkill: [],
  },
  忍者: {
    defaultSkill: '援军',
    otherSkill: ['平衡'],
  },
  真红眼: {
    defaultSkill: '心灵扫描',
    otherSkill: ['羁绊之力'],
  },
  骑兵: {
    defaultSkill: '强攻压制',
    otherSkill: ['羁绊之力', '融合大师', '融合时刻！'],
  },
  不死: {
    defaultSkill: '墓穴大军',
    otherSkill: ['放马过来！', '羁绊之力'],
  },
  黑羽: {
    defaultSkill: '攀登高峰',
    otherSkill: ['神鹰狩猎场', '羁绊之力'],
  },
  古代机械: {
    defaultSkill: '中世纪机械',
    otherSkill: [],
  },
  白龙: {
    defaultSkill: '强攻压制',
    otherSkill: ['羁绊之力'],
  },
  混沌战士: {
    defaultSkill: '仪式大师',
    otherSkill: ['仪式大师2', '注定一抽'],
  },
  空牙团: {
    defaultSkill: '羁绊之力',
    otherSkill: [],
  },
  甲虫: {
    defaultSkill: '注定一抽',
    otherSkill: ['羁绊之力'],
  },
  水产: {
    defaultSkill: '神秘深渊',
    otherSkill: [],
  },
  运动员: {
    defaultSkill: '羁绊之力',
    otherSkill: ['注定一抽'],
  },
  英雄: {
    defaultSkill: '融合大师',
    otherSkill: ['平衡', '融合时刻！', '奇迹融合时刻！', '羁绊之力'],
  },
  剑斗: {
    defaultSkill: '心灵扫描',
    otherSkill: ['平衡', '羁绊之力'],
  },
  其他: {
    defaultSkill: '羁绊之力',
    otherSkill: ['平衡', '心灵扫描', '注定一抽'],
  },
};

export const allSkill = [
  '未知',
  // normal
  '羁绊之力',
  '注定一抽',
  '生命值增加a',
  '秘密交换',
  '墓穴大军',
  '神圣守卫',
  '毅力',
  '援军',
  '强攻压制',
  '平衡',
  '心灵扫描',
  // DM
  '连锁反应',
  '无尽陷阱地狱',
  '墓地封印',
  '中世纪机械',
  // 场地
  '神鹰狩猎场',
  '神秘深渊',
  '战士的领域',
  '攀登高峰',
  // 抽卡预感
  '抽卡预感：风',
  '抽卡预感：火',
  '抽卡预感：水',
  '抽卡预感：土',
  '抽卡预感：高星',
  '抽卡预感：低星',
  '抽卡预感：魔陷',
  // gx
  '仪式大师',
  '仪式大师2',
  '我的名字是尤贝尔',
  '放马过来！',
  '宝玉之力',
  '融合大师',
  '融合时刻！',
  '奇迹融合时刻！',
  // 5ds
  '虚无的波动',
  '永火业火',
];

Object.keys(deckSkillDatabase).forEach((item) => {
  deckSkillDatabase[item].allSkill = allSkill;
});

export default deckSkillDatabase;
