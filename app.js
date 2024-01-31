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


app.post('/register',(req,res) =>{
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
 
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = "SELECT * FROM signup WHERE email = ? AND password = ?";
    const values = [email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.json("Error");
        }

        if (result.length > 0) {
            // User found, login successful
            const user = result[0];
            return res.json({ message: "Login successful", user });
        } else {
            // User not found or password incorrect
            return res.status(401).json({ error: "Invalid credentials" });
        }
    });
});

app.listen(3005,()=> {
    console.log("Listening on 3005")
})