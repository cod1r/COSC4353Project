var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'database-1.cyt5qx5ieqdg.us-east-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'wCPfNZmcK$8w*h',
  database : 'projectdb'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;