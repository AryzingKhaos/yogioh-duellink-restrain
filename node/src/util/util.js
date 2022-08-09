const util = {
  findMaxId: (array) => {
    let maxId = -1;
    array.forEach((item) => {
      if (parseInt(item, 10) > maxId) maxId = parseInt(item, 10);
    });
    return maxId;
  },
  findMaxModelId: (array) => {
    let maxId = 0;
    array.forEach((item) => {
      if (parseInt(item, 10) >= maxId) maxId = parseInt(item, 10);
    });
    return maxId;
  },
};

module.exports = util;
