const jwt = require("jsonwebtoken");
const express = require("express");

const app = express();

const createToken = async() => {
    const token = await jwt.sign({_id : "639ffa9c8e9df4cc30eddbea"} , "hellomynameisaryandevshouriewwejohncena");
    console.log(token);

    const userVerify = await jwt.verify(token , "hellomynameisaryandevshouriewwejohncena");
    console.log(userVerify);
};

createToken();

app.listen(80 , () => {
    console.log("App started at port 80");
});