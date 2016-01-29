var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zoo_db'
});
 
connection.connect(function(err) {
  if (err){
    console.log('err connection ' +err.stack);
  }else{
    console.log("I worked");
  }return
});
 
var prompt = require('prompt');
prompt.start();
prompt.message= "";
