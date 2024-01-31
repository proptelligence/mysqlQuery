const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json())
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"auth"
});


app.post('/signup',(req,res) =>{
    const sql = "INSERT INTO signup (`name`,`mobile`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.mobile,
        req.body.email,
        req.body.password
    ] 

    db.query(sql, [values], (err, data) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          return res.json("Error");
        }
        return res.json(data);
      });
      
})


app.listen(3006,()=> {
    console.log("Listening on 3005")
})