
require('dotenv').config()

const mysql = require('mysql');

const connection = mysql.createConnection({
  host:process.env.HOST,
  database:process.env.DB,
  user: process.env.USER,
  password: process.env.PASS ,
  multipleStatements: true
});


connection.connect(function(error){
   if(error) {
    console.log('Mysql is working not good'); 
   } else {
    console.log('Mysql is working good');
   }
});

module.exports = connection;