require("dotenv").config();
const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const app = express();

const staticPath = path.join(__dirname , "../public");
const templatePath = path.join(__dirname , "../templates/views")
const partialsPath = path.join(__dirname , "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(staticPath));
app.set("views" , templatePath);
app.set("view engine" , "hbs");

hbs.registerPartials(partialsPath);

app.get("/" , (req,res) => {
    res.render("index");
});

app.get("/register" , (req,res) => {
    res.render("register");
});

app.post("/register" , async (req,res) => {
    try{

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
          const registerEmployee = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            gender : req.body.gender,
            phone : req.body.phone,
            age : req.body.age,
            password : password,
            confirmpassword : cpassword
          });

          const token = await registerEmployee.generateAuthToken();

          const registered = await registerEmployee.save();
          res.status(201).render("index");

        }else{
            res.send("Passwords are not matching!");
        }

    }catch(err){
        res.status(400).send(err);
    };
});

app.get("/login" , (req,res) => {
    res.render("login");
});

app.post("/login" , async (req,res) => {
    try{

        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({email : email});

        const isMatch = await bcrypt.compare(password , userEmail.password);

        const token = await userEmail.generateAuthToken();
        
        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("Invalid Login Details!");
        };

    }catch(err){
        res.status(400).send("Invalid Login Details!");
    };
});

app.get("/index" , (req,res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`App started at Port ${port}`);
});