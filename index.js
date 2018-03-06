var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');

var $m = require('./random');

const needLog = false;

if(needLog) {
  var logger = require('tracer').colorConsole({
    transport: function (data) {
      console.log(data.output);
      fs.appendFile('./file.log', data.output + '\n', (err) => {
        if (err) throw err;
      });
    }
  });
} else {
  var logger = console;
}
 

//数组

// for (let urlindex = 0; urlindex < 10; urlindex++) {
//   url_data.push([{
//     url: '/',
//     data: 'enter config first'
//   }, {
//     //对象
//     url: '/object',
//     data: $m.obj({ name: 'str|5,6' })
//   }, {
//     //数组
//     url: '/array',
//     data: $m.arr(10, 10, 'str', 1, 100)
//   }, {
//     //对象里数组
//     url: '/objinarr',
//     data: [$m.obj({ name: 'arr|5,6,`str`,1,2' }), $m.obj({ name: 'arr|5,6,`str`,1,2' })]
//   }, {
//     //数组里对象
//     url: '/arrinobj',
//     data: $m.obj({ arr: $m.arr(5, 6, `str`, 1, 2) })
//   }, {
//     //bdid
//     url: '/bdid',
//     data: $m.obj({
//       manager: true,
//       bd_name: $m.cstr(3, 4),
//       bd_id: $m.rint(1, 300),
//       dep_name: $m.cstr(3, 4),
//       group_name: $m.arr(4, 4, 'cstr', 4, 4),
//       time_range: $m.arr(30, 30, 'str_low', 8, 8),
//       data_detail: [$m.arr(30, 30, 'rint', 1, 100), $m.arr(30, 30, 'rint', 1, 100), $m.arr(30, 30, 'rint', 1, 100), $m.arr(30, 30, 'rint', 1, 100)],
//       data_dep: $m.arr(30, 30, 'rint', 1, 100),
//     })
//   }])
// }


var srv = http.createServer(function (req, res) {
  var params = url.parse(req.url, true).query;
  var path = url.parse(req.url, true).pathname;
  // let endTime = new Date().getTime().toString().slice(-1);
  logger.log(params.$m_message)
  // 不变性
  // let invariance = params.invariance || true;
  // if (invariance) {
  //   endTime = 0;
  // }
  const url_data = [];
  // console.log(params);
  var validParam = true;
  // console.log(validParam)

  
  if(!params.$m_message) {
    logger.log('\n[TypeError] no params $m_message from %s  ' , path);
    
    res.writeHead(404, { "Content-Type": "text/plain" });
    // res.setHeader(404, { "Content-Type": "text/plain" });
    res.end("404 error! File not found.");
    return ;
  }

  try {
    var mel = eval(params.$m_message)
  } catch (e) {
    validParam = false;
    logger.log('\n[TypeError] transform $m_message to expect type but get (%s)', e.$m_message)
    //  res.setHeader("Access-Control-Expose-Headers", "*");
  }

  if (validParam) {
      url_data.push({
        data: mel
      });
    // logger.log('\n%d', url_data.length)
    url_data.forEach((v) => {
      if (path) {
        // res.setHeader("Access-Control-Allow-Origin", "*");
        //  res.setHeader("Access-Control-Allow-Credentials", "true");
        //  res.setHeader("Access-Control-Allow-Methods", "*");
        //  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
        //  res.setHeader("Access-Control-Expose-Headers", "*");
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' });
        res.write(JSON.stringify(v.data));
        res.end();
        logger.log('\n%s >>> %j', path, JSON.stringify(v.data));
        return;
      }
    })
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' });
    res.end();
    return;
  }


});

srv.listen(9000, function () {
  logger.log('\n---------------------\n----====START====----\n---------------------\n');

});
