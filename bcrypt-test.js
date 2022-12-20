const bcrypt = require("bcryptjs");
const express = require("express");

const app = express();

const securePassword = async (password) => {
     const passwordHash = await bcrypt.hash(password , 10);
     console.log(passwordHash);
};

securePassword("aryan123");

app.listen(80, () =>{
    console.log("App started at port 80");
});