require('dotenv').config();
const express =require('express');
const app =express();
const AWS = require("aws-sdk");
const fs  = require('fs');
AWS.config.region = 'ap-northeast-2';
const S3 = new AWS.S3({
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME ;



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
//asdfasdf


AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

var lists = [] ;

S3.listObjectsV2(
    {
        Bucket:BUCKET_NAME,
    },
    (err, data) => {
        if (err) {
            throw err;
        }
        console.log("data",data)
        let contents = data.Contents;
        contents.forEach((content) => {
            lists.push(content.Key); // "ex) content.Key => assets/images/1.png"
        });
        console.log(lists);
    }
);
S3.getSignedUrl(
    "getObject",
    {
        Bucket: BUCKET_NAME,
        Key: "Image1.svg" // ex) assets/
    },
    (err, url) => {
        if (err) {
            throw err;
        }
        console.log(url);
    }
);


//------------------------------------------------------파일생성
S3.putObject({
    Bucket: BUCKET_NAME,
    ACL:'public-read',  //ACL을 통해 접근 권한 생성해야함
    Key: "user11000220/images/TESTImage.png", // ex) 폴더 지정은 끝에 / 붙이셈!
    ContentType:'image/svg', //콘텐트 타입을 지정안하면 파일이 다운로드 된다잉..
    Body:fs.createReadStream('TESTImage2.svg'),
},((err,data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data);
    }
}));




app.get('*',(req,res)=>{
    res.json("gdgdg");
})

app.listen(process.env.PORT || 5000,()=>console.log(`Example app listening on port 5000!`))