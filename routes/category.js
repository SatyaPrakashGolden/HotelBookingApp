const express = require('express');
const router = express.Router();
const db = require('../db');

// http://localhost:4000/category/fetchallcategories

router.get('/fetchallcategories', async(req,res) => {
    try{

        const [response] = await db.promise()
        .query(`select categorydisplayname 'Display Name',categoryname Name,count(*) Count from postcategory
         group by categoryname`);
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json({message:err});
    }
})
module.exports = router;