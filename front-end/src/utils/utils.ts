export const formatTime = (date: Date, fmt: string) => {
  //author: meizz
  const o = {
    'Y+': date.getFullYear(), // 年
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substring(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? // @ts-ignore
            o[k]
          : // @ts-ignore
            ('00' + o[k]).substring(('' + o[k]).length)
      );
  return fmt;
};

export const removeDuplicate = (array: string[] | number[]) => {
  // @ts-ignore
  return Array.from(new Set(array));
};

export const isDef = (val: any) => val !== undefined && val !== null;

export const pureReverse = (array: any[]) => [...array].reverse();
