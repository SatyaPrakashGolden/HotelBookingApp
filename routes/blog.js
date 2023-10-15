const express = require('express');
const router = express.Router();
const db = require('../db');



// http://localhost:4000/blog/fetchblogs/0
router.get('/fetchblogs/:pageid', async(req,res) => {
    const pageid = req.params.pageid;
    const offset = pageid*10;
    const min = pageid*10 + 1;
    const max = pageid*10 + 10;
    try{
        const response = await db.promise().query(`select * from posts ORDER BY srno DESC LIMIT 10 OFFSET ${offset}`);
        res.status(200).json(response[0]);
    }
    catch(err){
        res.status(400).json({message: err});
    }
});


// http://localhost:4000/blog/fetchblogdetail/1
router.get('/fetchblogdetail/:blogid', async(req,res) => {
    const blogid = req.params.blogid;
    try{
        const response = await db.promise().query(`select * from posts WHERE postid = ${blogid}`);
        res.status(200).json(response[0]);
    }
    catch(err){
        res.status(400).json({message: err});
    }
});

// http://localhost:4000/blog/recentblogs
router.get('/recentblogs/', async(req,res) => {
    try{
        const response = await db.promise().query(`select * from posts ORDER BY srno DESC LIMIT 5`);
        res.status(200).json(response[0]);
    }
    catch(err){
        res.status(400).json({message: err});
    }
});

// http://localhost:4000/blog/categoryblogs/ai
router.get('/categoryblogs/:categoryname', async(req,res) => {
    const categoryname = req.params.categoryname;
    console.log(categoryname);
    try{
        const response = await db.promise().query(`select * from posts where category = ${categoryname} ORDER BY srno DESC `);
        res.status(200).json(response[0]);
    }
    catch(err){
        res.status(400).json({message: err});
    }
});

module.exports = router;