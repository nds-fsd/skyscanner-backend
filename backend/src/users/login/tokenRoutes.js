const express = require ('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt = require ('jsonwebtoken');

app.post('/', req ,res =>{
    const token = jwt.sign({user_id:"blbla"}, process.env.JWT_SECRET);
    res.send(token);
})


app.post('/', req, res =>{
    const token = req.headers.authorization.split(' ')[1];
    let verificationResult;

    try{
        verificationResult = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error){
        return res.status(400).send("invalid user");
    }
})
//module.exports = token;