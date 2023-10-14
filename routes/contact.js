const express = require('express');

const router = express.Router();

const db = require('../db');

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
// http://localhost:4000/contact/updatecontact
router.put('/updatecontact', async(req,res) => {
    try{
        //console.log(req.body.srno);
        const {name,email,subject,message,responseStatus,responseMessage,responseNextStep,
        responseNextPerson,finalStatus}=req.body;
        const response = await db.promise()
        .query(`update contact set name='${name}',email='${email}',subject='${subject}',message='${message}',
        responseStatus='${responseStatus}',responseMessage='${responseMessage}',responseNextStep='${responseNextStep}',
        responseNextPerson='${responseNextPerson}',finalStatus='${finalStatus}'
        where  srno = ${req.body.srno}`);
        res.status(400).json(response[0]);
    }
    catch(err){
        res.status(400).json({message: err});
    }
});



module.exports = router;