var json2xls = require('json2xls');
var fs = require("fs");
var mysql = require('mysql');
const mysqlConfig = {

  };
let connection = mysql.createConnection(mysqlConfig);
//查询
connection.connect();
connection.query('SELECT * FROM `fresh`', function (err, rows, fields) {
  if (err) throw err;
  console.log('查询结果为: ', rows);
  let freshMessage = [];
  rows.forEach(function (element) {
    element.fresh_item = JSON.parse(element.fresh_item)

    element.fresh_item.num = element.fresh_id

    freshMessage.push(element.fresh_item);
  }, this);
    let xls = json2xls(freshMessage);
    fs.writeFileSync('data.xlsx', xls, 'binary');
}); //异步，要使用Promise
connection.end();
