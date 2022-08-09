const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const file = require('./file/index.js');
const util = require('./util/util.js');

const initApp = require('./network');
const app = initApp();

let modelId = 0;

const successJsonFunc = (data) => ({
  code: 0,
  data: data,
  msg: '',
});

const failJsonFunc = (code, data, msg) =>
  JSON.stringify({
    code: code,
    data: data,
    msg: msg,
  });

const filterDelete = (array) => array.filter((item) => !item.isDelete);

const CrossDomain = (req, res) => {
  //设置允许跨域请求
  const reqOrigin = req.header('origin');
  // console.log(reqOrigin);
  console.log(req.url);
  if (reqOrigin != undefined > -1) {
    //设置允许 http://localhost:3000 这个域响应
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
    );
  }
};

const configRequestGet = (req, res) => {
  CrossDomain(req, res);
  //获取返回的url对象的query属性值
  const arg = url.parse(req.url).query;
  //将arg参数字符串反序列化为一个对象
  const params = querystring.parse(arg);
  return params;
};

const configRequestPost = (req, res) => {
  CrossDomain(req, res);
  return req.body;
};

app.get('/read_restrain_card', (req, res) => {
  const params = configRequestGet(req, res);
  file
    .readRestrainCardInfo()
    .then((dataObj) => {
      res.send(successJsonFunc(dataObj));
    })
    .catch((err) => {
      res.send(failJsonFunc(err.errno, err, err));
    });
});

app.get('/read_restrain_deck', (req, res) => {
  const params = configRequestGet(req, res);
  file
    .readRestrainDeckInfo()
    .then((dataObj) => {
      res.send(successJsonFunc(dataObj));
    })
    .catch((err) => {
      res.send(failJsonFunc(err.errno, err, err));
    });
});

app.get('/read_history_duel', (req, res) => {
  const params = configRequestGet(req, res);
  file
    .readHistoryDuelInfo()
    .then((dataObj) => {
      res.send(successJsonFunc(filterDelete(dataObj)));
    })
    .catch((err) => {
      res.send(failJsonFunc(err.errno, err, err));
    });
});

/**
 * post
 * duelInfo: 对战信息
 */
app.post('/add_history_duel', (req, res) => {
  const params = configRequestPost(req, res);
  let duelInfoOne = params.duelInfo;
  file
    .readHistoryDuelInfo()
    .then(async (dataObj) => {
      return {
        configObject: await file.readConfigData(),
        dataObj,
      };
    })
    .then(({ configObject, dataObj }) => {
      const { modelId } = configObject;
      const maxId = util.findMaxId(dataObj.map((item) => item.id));
      duelInfoOne = {
        ...duelInfoOne,
        id: maxId + 1,
        modelId: modelId,
        updateTime: Date.parse(new Date()),
      };
      console.log('duelInfoOne', duelInfoOne); // todos
      dataObj.push(duelInfoOne);
      console.log('dataObj', dataObj); // todos
      file.writeHistoryDuelInfo(dataObj);
      return filterDelete(dataObj);
    })
    .then((dataObj) => {
      res.send(successJsonFunc(dataObj));
    })
    .catch((err) => {
      res.send(failJsonFunc(err.errno, err, err));
    });
});

/**
 * get
 * 添加新的决斗模块。模块是用于数据分析的单元
 */
// todos 可以写成async/await形式的
app.get('/add_duel_new_model', (req, res) => {
  configRequestGet(req, res);
  file
    .readConfigData()
    .then(async (configObject) => {
      console.log('configObject', configObject); // todos
      const { modelId } = configObject;
      return file.writeConfigData({
        ...configObject,
        modelId: modelId + 1,
      });
    })
    .then(() => {
      res.send(successJsonFunc(null));
    });
});

/**
 * post
 * deleteId: 删除的信息id
 */
app.post('/delete_history_duel', (req, res) => {
  const params = configRequestPost(req, res);
  const deleteId = params.deleteId;
  console.log('deleteId', deleteId); // todos
  file
    .readHistoryDuelInfo()
    .then((dataObj) => {
      console.log('dataObj1', dataObj); // todos
      let duelInfo = dataObj.find((item) => item.id == deleteId);
      if (!duelInfo)
        res.send(failJsonFunc(1001, null, `没找到目标id: ${deleteId}`));
      duelInfo.isDelete = true;
      console.log('duelInfo', duelInfo); // todos
      console.log('dataObj', dataObj); // todos
      file.writeHistoryDuelInfo(dataObj);
      return filterDelete(dataObj);
    })
    .then((dataObj) => {
      res.send(successJsonFunc(dataObj));
    })
    .catch((err) => {
      res.send(failJsonFunc(err.errno, err, err));
    });
});

/**
 * post
 * deleteId: 删除的信息id
 */
app.post('/clear_delete_history_duel', async (req, res) => {
  configRequestPost(req, res);
  let historyArray = await file.readHistoryDuelInfo();
  historyArray = historyArray.filter((item) => !item.isDelete);
  await file.writeHistoryDuelInfo(historyArray);
  res.send(successJsonFunc(null));
});

/**
 * post
 * targetId: 修改信息id
 * changeDuelInfo: 修改的内容
 */
app.post('/change_history_duel', (req, res) => {
  const params = configRequestGet(req, res);
  const targetId = params.targetId;
  const changeDuelInfo = params.duelInfo;
  // todos changeDuelInfo的内容要校验
  file
    .readHistoryDuelInfo((dataObj) => {
      let duelInfo = dataObj.find((item) => item.id === targetId);
      if (!duelInfo)
        res.send(failJsonFunc(1001, null, `没找到目标id: ${targetId}`));
      duelInfo = {
        ...duelInfo,
        ...changeDuelInfo,
      };
      return file.writeHistoryDuelInfo(dataObj);
    })
    .then(() => {
      res.send(successJsonFunc(null));
    })
    .catch((err) => {
      res.send(failJsonFunc(err.errno, err, err));
    });
});

// todos
// app.get('/todo/read', function (req, res) {
//   const id = params.id;
//   file
//     .readMock()
//     .then(function (dataObj) {
//       // const dataObj = JSON.parse(dataStr);
//       let findTodo = util.findTodoById(dataObj, parseInt(id));
//       if (findTodo) {
//         findTodo.todo = JSON.parse(findTodo.todo);
//         res.send(successJsonFunc(findTodo.todo));
//       } else {
//         res.send(failJsonFunc(1009, {}, '没有找到这个id的todo'));
//       }
//     })
//     .catch(function (err) {
//       if (err) {
//         res.send(1005, null, '读取文件失败');
//         return console.error(err);
//       }
//     });
// });

// todos remove
app.post('/todo/save', function (req, res) {
  file
    .readMock()
    .then(function (data) {
      // console.log(dataStr);
      // 获取请求的内容
      let finalStr, todoJsonStr, todoId;
      // let data = JSON.parse(dataStr);
      console.log(req.body);
      if (req.body) {
        todoJsonStr = JSON.stringify(req.body.todo);
        todoId = req.body.id;
      } else {
        res.send(failJsonFunc(1005, null, '请求没有body'));
        return console.error('请求没有body');
      }
      if (!todoJsonStr) {
        return console.error('todoJsonStr为空');
      }
      let changeTodo = util.findTodoById(data, todoId);
      changeTodo.updateTime = Date.parse(new Date());
      changeTodo.todo = todoJsonStr;
      // console.log(data);
      finalStr = JSON.stringify(data);

      return finalStr;
    })
    .then(function (finalStr) {
      // 写入todo.json文件
      return file
        .writeMockTodo(finalStr)
        .then(function (data) {
          console.log('————————————保存todo成功————————————');
          res.send(successJsonFunc(null));
        })
        .catch(function (err) {
          res.send(1005, null, '写入文件失败');
          return console.error(err);
        });
    })
    .catch(function (err) {
      res.send(1005, null, '读取文件失败');
      return console.error(err);
    });

  fs.readFile('./src/mock/todo.json', function (err, data) {
    if (err) {
      res.send(1005, null, '读取文件失败');
      return console.error(err);
    }
  });
});

// todos
// app.post('/todo/add', function (req, res) {
//   file
//     .readMock()
//     .then(function (data) {
//       // 获取请求的内容
//       console.log(data);
//       // let finalStr, todoListTitle, todoListDesc;
//       // let data = JSON.parse(dataStr);
//       console.log(req.body);
//       if (req.body) {
//         todoListTitle = req.body.title;
//         todoListDesc = req.body.desc;
//       } else {
//         res.send(failJsonFunc(1005, null, '请求没有body'));
//         return console.error('请求没有body');
//       }

//       let id = parseInt(util.getMaxIdIteratorFromArr(data)) + 1;

//       data.push({
//         id: id,
//         name: todoListTitle,
//         desc: todoListDesc,
//         updateTime: Date.parse(new Date()),
//         todo: '[]',
//       });

//       console.log(data);
//       return data;
//     })
//     .then(function (finalData) {
//       // 写入todo.json文件
//       return file
//         .writeMockTodo(finalData)
//         .then(function (data) {
//           console.log('————————————保存todo成功————————————');
//           res.send(successJsonFunc(data));
//         })
//         .catch(function (err) {
//           res.send(1005, null, '写入文件失败');
//           return console.error(err);
//         });
//     })
//     .catch(function (err) {
//       res.send(1005, null, '读取文件失败');
//       return console.error(err);
//     });
// });

// app.get('/todo/list', function (req, res) {
//   //设置允许跨域请求
//   const reqOrigin = req.header('origin');
//   // console.log(reqOrigin);
//   console.log(req.url);

//   //获取返回的url对象的query属性值
//   const arg = url.parse(req.url).query;
//   //将arg参数字符串反序列化为一个对象
//   const params = querystring.parse(arg);
//   console.log(params);

//   if (reqOrigin != undefined > -1) {
//     //设置允许 http://localhost:3000 这个域响应
//     // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
//     );
//   }

//   file.readMock().then(function (dataObj) {
//     if (dataObj) {
//       res.send(successJsonFunc(dataObj));
//     } else {
//       res.send(failJsonFunc(1010, {}, '没有todo列表'));
//     }
//   });
// });

const server = app.listen(5000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
