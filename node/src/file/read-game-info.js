const readUtil = require('./read-util');

const RESTRAIN_CARD_JSON_PATH = './src/data/restrain-card.json';
const RESTRAIN_DECK_JSON_PATH = './src/data/restrain-deck.json';
const HISTORY_DUEL_JSON_PATH = './src/data/history-duel.json';

const readGameInfo = {
  // 写入文件
  writeData: function (path, dataJsonStr) {
    return this.readMock()
      .then(function (data) {
        return readUtil.writeFile(
          path,
          typeof dataJsonStr === 'object'
            ? JSON.stringify(dataJsonStr)
            : dataJsonStr.toString()
        );
      })
      .then(function (data) {
        return readUtil.getJsonObj(data);
      })
      .catch(function (err) {
        return console.error(err);
      });
  },
  // 读取克制的卡的json文件
  readRestrainCardInfo: () => {
    return readUtil.readFileGetObject(RESTRAIN_CARD_JSON_PATH);
  },
  readRestrainDeckInfo: () => {
    return readUtil.readFileGetObject(RESTRAIN_DECK_JSON_PATH);
  },
  readHistoryDuelInfo: () => {
    return readUtil.readFileGetObject(HISTORY_DUEL_JSON_PATH);
  },
  writeHistoryDuelInfo: (dataJsonStr) => {
    return readGameInfo.writeData(HISTORY_DUEL_JSON_PATH, dataJsonStr);
  },
};

module.exports = readGameInfo;
