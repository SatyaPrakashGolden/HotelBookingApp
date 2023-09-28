const express = require('express');

const router = express.Router();

const db = require('../db');

//http://localhost:4000/users/allusers
router.get('/allusers', async(req, res) => {
    console.log('test---------------');
    // if data available in cache mem
    // return data
    // else
    try{
        const response = await db.promise().query('SELECT * FROM users');
        console.log(response[0]);
        console.log('test---------------');
        //store in cache memory for 10 min
        res.status(200).json(response[0]);
    }
    catch(err){
        console.log('Error - ', err)
        res.status(400).json(err);
    }
})

// http://localhost:4000/users/login
router.post('/login', async(req, res) => {
    try {
        const response = await db.promise().query(`SELECT password, userid, username,  case when usertype = 1 then "admin"
        when usertype = 2 then "student" else ""
        end as usertype FROM codeapzu_nssexam.users where status = 1 and 
        ( username = '${req.body.username}' or email = '${req.body.username}')`);
        // user found in db
        if(response[0].length > 0) {
            //password matched
            // console.log(response[0][0].password, req.body.password);
            if(response[0][0].password == req.body.password) {
              let obj = {};
              obj.loginStatus = true;
              obj.userType = response[0][0].usertype;
              obj.userId = response[0][0].userid;
                res.status(202).json(obj);
               //res.status(202).json({message: 'Successfully logged in'});
            }
            //password not matched
            else {
                res.status(401).json({message: 'Incorrect Password',loginStatus : false});
            }
        }
        // user not found
        else {
            res.status(422).json({message: 'User Not Found', loginStatus : false});
        }        
    } catch(err) {
        // console.log(err);
        res.status(400).json(err);
    }
})


module.exports = router;
