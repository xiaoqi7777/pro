var mysql = require('mysql')

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'studb'
})
connection.connect();
connection.query('SELECT * FROM course', function (error, results, fields) {
  if (error) throw error;
  console.log('查看course表的所有信息', results);
});
