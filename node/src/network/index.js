const bodyParser = require('body-parser');
const express = require('express');

module.exports = () => {
  const app = express();

  const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now());
    },
  };

  app.all('*', function (req, res, next) {
    console.log(req.method);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header(
      'Access-Control-Allow-Methods',
      'PUT,POST,GET,DELETE,OPTIONS,PATCH'
    );
    res.header('Access-Control-Max-Age', 1728000); //预请求缓存20天
    next();
  });

  app.use(express.static('public', options));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', function (req, res) {
    res.send('hello world');
  });

  return app;
};
