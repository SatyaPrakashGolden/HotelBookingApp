const express = require('express');

const router = express.Router();

const db = require('../db');

// http://localhost:4000/contact/alluser
router.get('/alluser', async(req,res) => {
    try{
        const response = await db.promise()
        .query(`select name,email,subject,message from contact where isactive = 1`);
        res.status(200).json(response[0]);
    }
    catch(err){
        res.status(400).json({message: err});
    }
});

// http://localhost:4000/contact/register

router.post("/register", async(req,res) => {
    try{
        const {name,email,subject,message} = req.body;
        const response = await db.promise()
        .query(`insert into contact (name,email,subject,message)
        values('${name}','${email}','${subject}','${message}')`);
        res.status(200).json(response[0]);
        
    }
    catch(err){
        res.status(400).json({message: err});
    }
});

module.exports = router;