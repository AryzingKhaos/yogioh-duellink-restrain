/**
 * attackLine指卡组的攻击力上限；对于没有理论上限的卡组，则写比较容易达到的攻击力
 * defenseAttackLine指他人回合，这个卡组被压制的时候的攻击线；null表示无意义
 * effect指卡组主轴有的能力，目前不在构筑内的也可以考虑。泛用卡不算。
 * 需要注意的是，计算的是包括技能、技能场地等合计的数值
 * 效果评分，有几个点，每个点+1分：
 *  1.具备功能+1分；
 *  2.可以检索+2分；
 *  3.可以二次检索+1分（比如阵出黑森林女巫，杖解放女巫检索乌鸦）；
 *  4.在3的基础上，二速以上再+1分；（攻宣、召唤时等具体时点的永远不认为是2速）
 *  5.在4的基础上，需要较大cost的-1分；比如雷破
 *  6.如果是展开方面的，陷阱卡类-1分；
 *  7.取对象可能-0.5分；
 *  8.无条件的人物技能+3分；有一般条件或弱自肃的人物技能+2分；有苛刻条件的人物技能或强自肃+1分；加减攻击力的技能+1分
 */

export const deckAttribute = {
  小角龙: {
    attackLine: 6000,
    defenseAttackLine: 2000,
    effect: {
      二速解场: 3, // 有检索+2分
      '4000以上攻击力': 4, // 有检索+2分， 攻击可达八千+1分
      爆发伤害: 3, // 有检索+2分
      效果破坏: 2, // 不取对象+1分
    },
    generalCard: [],
  },
  黑魔导: {
    attackLine: 4800, // 2500(黑魔导)+2000(黑妹)+300(技能)
    defenseAttackLine: 2500,
    effect: {
      除外限制: 2, // 二速+1分
      除外: 1,
      爆发伤害: 2, // 二速+1分
      无效魔陷效果: 4, // 二速+1分，有检索+2分
    },
    generalCard: ['银幕的镜壁'],
  },
  永火: {
    attackLine: 3000, // 百目龙
    defenseAttackLine: null,
    effect: {
      爆发伤害: 4, // 技能检索+3分
      复数破坏: 2, // 主要是破坏数太多+1分
    },
  },
  炎星: {
    attackLine: 3100, // 2200+300(永续魔法)+600(技能)
    defenseAttackLine: 2400,
    effect: {
      爆发伤害: 3, // 有检索+2分
    },
  },
  核成: {
    attackLine: 3300, // 3000+300(技能)
    defenseAttackLine: 3000,
    effect: {},
  },
  忍者: {
    attackLine: 3000,
    defenseAttackLine: 2800,
    effect: {},
  },
  真红眼: {
    attackLine: 3800, // 理论上2800+200+800+800 = 4600
    defenseAttackLine: 3000,
    effect: {},
  },
  黑羽: {
    attackLine: 3000, // 2800(黑羽龙)+200(场地)
    defenseAttackLine: 2800,
    effect: {},
  },
  古代机械: {
    attackLine: 3300, // 3000+300(技能永续)，理论上还能+200复活
    defenseAttackLine: 3300,
    effect: {},
  },
  骑兵: {
    attackLine: 5900, // 3000+2000(黑妹)+900(技能)，还能更高
    defenseAttackLine: 3100, // 可变数值
    effect: {},
  },
  不死: {
    attackLine: 2500, // 2000+500(场地)
    defenseAttackLine: 2500,
    effect: {
      改变种族或属性: 2, // 技能
    },
  },
  其他: {
    attackLine: 3000,
    defenseAttackLine: 2500,
    effect: {},
  },
  // 白龙: {
  //   attackLine: 3900, // 3000+900(技能)
  //   defenseAttackLine: 3000,
  //   effect: {

  //   }
  // },
  // 混沌战士: {
  //   attackLine: 4500, // 3000+1500(怪兽)
  //   defenseAttackLine: 3000,
  //   effect: {

  //   }
  // },
  // 空牙团: {
  //   attackLine: 3300, // 2500(戴拿)+500(效果)+300(技能)
  //   defenseAttackLine: 2800, // 薇姿防御力
  //   effect: {

  //   }
  // },
  // 甲虫: {
  //   attackLine: 2400,
  //   defenseAttackLine: 2400,
  //   effect: {

  //   }
  // },
  // 水产: {
  //   attackLine: 2600,
  //   defenseAttackLine: 2600,
  //   effect: {

  //   }
  // },
  // 运动员: {
  //   attackLine: 3000, // todos 没确定具体数值
  //   defenseAttackLine: 2600, // todos 没确定具体数值
  //   effect: {

  //   }
  // },

  // 英雄: {
  //   attackLine: 5000, // 三一人
  //   defenseAttackLine: 2800,
  //   effect: {

  //   }
  // },
  // 剑斗: {
  //   attackLine: 3800, // 两个小海龙
  //   defenseAttackLine: 3300, // 一个小海龙
  //   effect: {
  //     '二速解场': 1,
  //     '无效怪兽效果': 1,
  //   },
  // },
};

export const generalCardEffect = {
  银幕的镜壁: {
    加减攻击力: 2, // 二速+1分
  },
  禁忌的圣杯: {
    加减攻击力: 0.5,
    无效怪兽效果: 1.5, // 二速+1分, 同时加攻击力-0.5
    不受效果影响: 0.5,
  },
};
