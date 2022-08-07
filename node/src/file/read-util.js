const fs = require('fs');

module.exports = {
  getJsonObj: function (data) {
    // 如果可以转换成obj，那么返回obj；如果不能，返回string
    let dataStr = typeof data !== 'string' ? data.toString() : data; // 为了防止这段数据是二进制流
    try {
      return JSON.parse(dataStr);
    } catch (e) {
      return dataStr;
    }
  },
  readFile: function (fileSrc) {
    return new Promise(function (resolve, reject) {
      fs.readFile(fileSrc, function (err, data) {
        err && reject(err);
        resolve(data);
      });
    });
  },
  readFileGetObject: function (fileSrc) {
    return this.readFile(fileSrc).then((data) => {
      return this.getJsonObj(data);
    });
  },
  writeFile: function (fileSrc, data) {
    let _data = data;
    if (typeof _data === 'object') {
      _data = JSON.stringify(_data);
    } else if (typeof data === 'string') {
      _data = _data.toString();
    }
    return new Promise(function (resolve, reject) {
      fs.writeFile(fileSrc, _data, function (err, data) {
        err && reject(err);
        resolve(_data);
      });
    });
  },
};
