var http = require('http');
var url = require('url');
var util = require('util');

var $m = require('./random');

//不变性
const invariance = false;

//数组
const url_data = [];

for (let urlindex = 0; urlindex < 10; urlindex++) {
  url_data.push([{
    url: '/',
    data: 'enter config first'
  }, {
    //对象
    url: '/object',
    data: $m.obj({ name: 'str|5,6' })
  }, {
    //数组
    url: '/array',
    data: $m.arr(10, 10, 'str', 1, 100)
  },{
    //对象里数组
    url: '/objinarr',
    data: [ $m.obj({ name: 'arr|5,6,`str`,1,2' }), $m.obj({ name: 'arr|5,6,`str`,1,2' })]
  },{
    //数组里对象
    url: '/arrinobj',
    data: $m.obj({arr:$m.arr(5,6,`str`,1,2)})
  }])
}


var srv = http.createServer(function (req, res) {
  var params = url.parse(req.url, true).query;
  var path = url.parse(req.url, true).pathname;
  let endTime = new Date().getTime().toString().slice(-1);
  //不变性
  if (invariance) {
    endTime = 0;
  }
  url_data[endTime].forEach((v) => {
    if (path === v.url) {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify(v.data));
      console.log(JSON.stringify(params) + ' >>> ' + JSON.stringify(v.data));
      return;
    }
  })

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 error! File not found.");
});

srv.listen(8080, function () {
  console.log('listening on localhost:8080');
});