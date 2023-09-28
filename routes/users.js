const express = require('express');
const router = express.Router();
const db = require('../db');

// http://localhost:4000/users/adduser
router.post('/adduser', async(req, res) => {
    console.log('Inside request');
    try {
        
        const {name, email, mobile, whatsapp_mobile, city, hometown, college, university, passing_year, branch, linkedinid, referredby, islaptop, mern_knowledge} = req.body;
        // console.log(req.body);
        const userid = name.slice(0, 5) + parseInt(Math.random()*100000);
        let tempdate = new Date();
        const creationdate = tempdate.getDate()+'-'+tempdate.getMonth()+'-'+tempdate.getDay();
        const creationtime = tempdate.getHours()+'-'+tempdate.getMinutes()+'-'+tempdate.getSeconds();
        const password = parseInt(Math.random()*10000000000);

        const response = await db.promise().query(`INSERT INTO mern_oct_2023 (userid, name, email, mobile, whatsapp_mobile, city, hometown, college, university, passing_year, branch, creationdate, creationtime, password, linkedinid, referredby, islaptop, mern_knowledge ) VALUES ('${userid}','${name}',' ${email}','${mobile}', '${whatsapp_mobile}', '${city}', '${hometown}', '${college}', '${university}', '${passing_year}', '${branch}', '${creationdate}', '${creationtime}', '${password}', '${linkedinid}', '${referredby}', '${islaptop}', '${mern_knowledge}' )`);
        
        //const response2 = await db.promise().query(`SELECT userid FROM users WHERE username = '${req.body.username}' `);
        // console.log(response, response2[0]);

        res.status(201).json(response[0]);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})

module.exports = router;
