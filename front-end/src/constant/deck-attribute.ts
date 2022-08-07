/**
 * attackLine指卡组的攻击力上限；对于没有理论上限的卡组，则写比较容易达到的攻击力
 * 需要注意的是，计算的是包括技能、技能场地等合计的数值
 * 效果评分，有几个点，每个点+1分：
 *  1.可以检索+2分；
 *  2.可以二次检索+1分（比如阵出黑森林女巫，杖解放女巫检索乌鸦）；
 *  3.具备功能+1分；
 *  4.在3的基础上，二速以上再+1分；（攻宣、召唤时等具体时点的永远不认为是2速）
 *  5.在4的基础上，需要较大cost的-1分；比如雷破
 *  6.如果是展开方面的，陷阱卡类-1分；
 *  7.取对象-0.5分；
 */


const deckAttribute = {
  小角龙: {
    attackLine: 6000,
    effect: {

    }
  },
  黑魔导: {
    attackLine: 4800, // 2500(黑魔导)+2000(黑妹)+300(技能)
    effect: {

    }
  },
  永火: {
    attackLine: 3000, // 百目龙
    effect: {

    }
  },
  炎星: {
    attackLine: 3100, // 2200+300(永续魔法)+600(技能)
    effect: {

    }
  },
  核成: {
    attackLine: 3300, // 3000+300(技能)
    effect: {

    }
  },
  忍者: {
    attackLine: 3000,
    effect: {

    }
  },
  真红眼: {
    attackLine: 3800, // 理论上2800+200+800+800 = 4600
    effect: {

    }
  },
  黑羽: {
    attackLine: 3000, // 2800(黑羽龙)+200(场地)
    effect: {

    }
  },
  白龙: {
    attackLine: 3900, // 3000+900(技能)
    effect: {

    }
  },
  混沌战士: {
    attackLine: 4500, // 3000+1500(怪兽)
    effect: {

    }
  },
  古代机械: {
    attackLine: 3300, // 3000+300(技能永续)，理论上还能+200复活
    effect: {

    }
  },
  空牙团: {
    attackLine: 3300, // 2500(戴拿)+500(效果)+300(技能)
    effect: {

    }
  },
  甲虫: {
    attackLine: 2400,
    effect: {

    }
  },
  水产: {
    attackLine: 2600,
    effect: {

    }
  },
  运动员: {
    attackLine: 3000, // todos 没确定具体数值
    effect: {

    }
  },
  骑兵: {
    attackLine: 5900, // 3000+2000(黑妹)+900(技能)，还能更高
    effect: {

    }
  },
  不死: {
    attackLine: 2500, // 2000+500(场地)
    effect: {

    }
  },
  英雄: {
    attackLine: 5000, // 三一人
    effect: {

    }
  },
  剑斗: {
    attackLine: 3800, // 两个小海龙
    effect: {

    }
  },

}

export default deckAttribute;