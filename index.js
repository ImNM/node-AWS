require('dotenv').config();
const express =require('express');
const app =express();



var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : 'DBTEST'
});
 
connection.connect();
 
connection.query('select * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].name);
});
 
connection.end();


app.get('*',(req,res)=>{
    res.json("gdgdg");
})

app.listen(process.env.PORT || 5000,()=>console.log(`Example app listening on port 5000!`))