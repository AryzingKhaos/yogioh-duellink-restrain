interface deckAttribute {
  defaultSkill: string;
  otherSkill: string[];
  allSkill?: string[];
}

const deckSkillDatabase: Record<string, deckAttribute> = {
  // T1
  圣夜: {
    defaultSkill: '我也能决斗吗？',
    otherSkill: ['希望的战士编号39', '心灵扫描', '生命值增加a', '天使的微笑', '墓地封印'],
  },
  星兹: {
    defaultSkill: '等级调整',
    otherSkill: ['注定一抽', '羁绊之力', '心灵扫描'],
  },
  机皇: {
    defaultSkill: '机皇精致',
    otherSkill: ['注定一抽', '羁绊之力', '心灵扫描'],
  },
  // T2
  破坏剑: {
    defaultSkill: '抽卡预感：低星',
    otherSkill: ['注定一抽', '无尽陷阱地狱', '羁绊之力'],
  },
  水产: {
    defaultSkill: '鲨鱼的领域',
    otherSkill: ['注定一抽', '羁绊之力'],
  },
  化石: {
    defaultSkill: '古生代的化石骑士',
    otherSkill: [],
  },
  光天使: {
    defaultSkill: '古生代的化石骑士',
    otherSkill: [],
  },
  流星龙: {
    defaultSkill: '流星之路',
    otherSkill: [],
  },
  盖亚: {
    defaultSkill: '走向龙骑士之路',
    otherSkill: [],
  },
  黑羽: {
    defaultSkill: '攀登高峰',
    otherSkill: ['心灵扫描', '注定一抽'],
  },
  口吃: {
    defaultSkill: '抽卡预感：高星',
    otherSkill: ['羁绊之力', '心灵扫描', '注定一抽'],
  },
  甘多拉: {
    defaultSkill: '战斗的决心',
    otherSkill: ['羁绊之力', '心灵扫描', '注定一抽'],
  },
  // T3
  水晶机巧: {
    defaultSkill: '化学反应',
    otherSkill: ['羁绊之力', '心灵扫描', '抽卡预感：高星', '注定一抽', '神秘深渊'],
  },
  白龙: {
    defaultSkill: '进化后的最强龙族',
    otherSkill: ['注定一抽'],
  },
  黑魔导: {
    defaultSkill: '卡套上的玄机',
    otherSkill: ['羁绊之力', '注定一抽'],
  },
  电子龙: {
    defaultSkill: '电子流派',
    otherSkill: ['注定一抽'],
  },
  六武众: {
    defaultSkill: '羁绊之力',
    otherSkill: ['注定一抽'],
  },
  英雄: {
    defaultSkill: '伤痕累累的英雄',
    otherSkill: ['注定一抽', '羁绊之力', '英雄闪耀！'],
  },
  妖仙兽: {
    defaultSkill: '羁绊之力',
    otherSkill: ['注定一抽', '心灵扫描'],
  },
  新宇侠: {
    defaultSkill: '新生宇宙！',
    otherSkill: ['心灵扫描', '羁绊之力'],
  },
  TG: {
    defaultSkill: '同调飞行控制',
    otherSkill: ['放置！三角加速', '羁绊之力'],
  },
  炎王: {
    defaultSkill: '注定一抽',
    otherSkill: ['心灵扫描', '羁绊之力'],
  },
  重坑阿莱: {
    defaultSkill: '叠放移除',
    otherSkill: ['心灵扫描', '羁绊之力'],
  },
  三金: {
    defaultSkill: '[任意场地]',
    otherSkill: ['新生宇宙！', '心灵扫描', '羁绊之力'],
  },
  不知火: {
    defaultSkill: '生命增加a',
    otherSkill: ['注定一抽', '心灵扫描', '羁绊之力'],
  },
  先史遗产: {
    defaultSkill: '连接异次元',
    otherSkill: ['心灵扫描', '羁绊之力'],
  },
  
  守墓: {
    defaultSkill: '心灵扫描',
    otherSkill: ['羁绊之力', '注定一抽'],
  },
  红莲魔龙: {
    defaultSkill: '恶魔共鸣',
    otherSkill: ['羁绊之力', '注定一抽'],
  },
  巨石遗物: {
    defaultSkill: '仪式大师II',
    otherSkill: ['仪式大师', '羁绊之力', '注定一抽'],
  },
  孤独勇者: {
    defaultSkill: '仪式大师II',
    otherSkill: ['仪式大师', '羁绊之力', '注定一抽'],
  },
  圣骑士: {
    defaultSkill: '羁绊之力',
    otherSkill: ['战士的领域', '心灵扫描', '注定一抽'],
  },
  
  // T4以下非主流
  机巧: {
    defaultSkill: '强攻压制',
    otherSkill: ['抽卡预感：低星', '羁绊之力', '心灵扫描'],
  },
  邪心盖亚: {
    defaultSkill: '霸王城显现',
    otherSkill: ['支配邪恶之力'],
  },
  邪心英雄: {
    defaultSkill: '恶意神召',
    otherSkill: ['霸王城显现', '支配邪恶之力'],
  },
  运动员: {
    defaultSkill: '抽卡预感：低星',
    otherSkill: ['怪兽变身：进化', '羁绊之力', '心灵扫描', '注定一抽'],
  },
  龙骑兵团: {
    defaultSkill: '注定一抽',
    otherSkill: ['心灵扫描', '生命值增加a'],
  },
  永火: {
    defaultSkill: '永火业火',
    otherSkill: ['虚无的波动'],
  },
  真红眼: {
    defaultSkill: '真红眼轮盘',
    otherSkill: ['心灵扫描', '羁绊之力'],
  },
  堕天使: {
    defaultSkill: '注定一抽',
    otherSkill: ['生命值增加a', '强攻压制'],
  },
  其他: {
    defaultSkill: '羁绊之力',
    otherSkill: ['平衡', '心灵扫描', '注定一抽'],
  },
};

const deckNotUseDatabase: Record<string, deckAttribute> = {
  小角龙: {
    defaultSkill: '化学反应',
    otherSkill: ['生命值增加a', '注定一抽'],
  },
  文具人: {
    defaultSkill: '心灵扫描',
    otherSkill: ['注定一抽', '生命值增加a'],
  },
  忍者: {
    defaultSkill: '援军',
    otherSkill: ['心灵扫描', '平衡'],
  },
  枪龙: {
    defaultSkill: '心灵扫描',
    otherSkill: ['注定一抽', '袖口藏卡'],
  },
  亚马逊: {
    defaultSkill: '神圣护卫',
    otherSkill: ['心灵扫描', '注定一抽'],
  },
  命运女郎: {
    defaultSkill: '时间推移',
    otherSkill: ['心灵扫描', '注定一抽'],
  },
  剑斗: {
    defaultSkill: '心灵扫描',
    otherSkill: ['平衡', '羁绊之力'],
  },
  炎星: {
    defaultSkill: '宝玉之力',
    otherSkill: ['羁绊之力'],
  },
  骑兵: {
    defaultSkill: '强攻压制',
    otherSkill: ['羁绊之力', '融合大师', '融合时刻！'],
  },
  核成: {
    defaultSkill: '羁绊之力',
    otherSkill: [],
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
  英雄: {
    defaultSkill: '融合大师',
    otherSkill: ['平衡', '融合时刻！', '奇迹融合时刻！', '羁绊之力'],
  },
  不死: {
    defaultSkill: '墓穴大军',
    otherSkill: ['放马过来！', '羁绊之力'],
  },
}

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
  '怪兽变身：进化',
  '怪兽变身：退化',
  '无尽陷阱地狱',
  '墓地封印',
  '中世纪机械',
  '进化后的最强龙族',
  '走向龙骑士之路',
  '战斗的决心',
  // 场地
  '神鹰狩猎场',
  '神秘深渊',
  '战士的领域',
  '攀登高峰',
  '不动如地！',
  '侵掠如火！',
  '其徐如水！',
  '其疾如风！',
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
  '新生宇宙！',
  '宝玉之力',
  '融合大师',
  '融合时刻！',
  '奇迹融合时刻！',
  '恶意神召',
  '支配邪恶之力',
  '霸王城显现',
  '电子流派',
  // 5ds
  '虚无的波动',
  '永火业火',
  '时间推移',
  '等级提升',
  '恶魔共鸣',
  '流星之路',
  '放置！三角加速',
  // zexal
  '决斗餐',
  '鲨鱼的领域',
  '希望的战士编号39',
  '机皇精致',
  '我也能决斗吗？',
  '等级调整',
  '古生代的化石骑士',
];

Object.keys(deckSkillDatabase).forEach((item) => {
  deckSkillDatabase[item].allSkill = allSkill;
});

export default deckSkillDatabase;
