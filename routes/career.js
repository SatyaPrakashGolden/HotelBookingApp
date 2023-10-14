const express = require("express");
const router = express.Router();
const db = require("../db");



// http://localhost:4000/career/alluser
router.get('/alluser', async(req,res) => {
  try{
    const response = await db.promise()
    .query(`select * from career
    where isactive = 1`);
    res.status(200).json(response[0]);
  }
  catch(err){
    res.status(400).json({message: err});
  }
});

// http://localhost:4000/career/register
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      whatsapp_mobile,
      city,
      hometown,
      college,
      university,
      passing_year,
      branch,
      linkedinid,
      githubid,
      referredby,
      currentcompany,
      yearsOfExperience,
      currentDesignation,
      noticePeriod,
      currentSalary,
      skills,
      dob,
      workLocation,
      typePartFull,
      typeFullIntern,
      jobType,
    } = req.body;
    //console.log(req.body);
    const username = name.toLowerCase().split(" ").join("").slice(0, 5) + parseInt(Math.random() * 100000);
    const regid = 'HB'+parseInt(Math.random() * 10000000000);
    const password = parseInt(Math.random() * 10000000000);

    const response = await db.promise()
      .query(`INSERT INTO career(regid,username,password,name,email,mobile,whatsapp_mobile,city,hometown,college,university,passing_year,branch,linkedinid,githubid,referredby,
                currentcompany,yearsOfExperience,currentDesignation,noticePeriod,currentSalary,skills,dob,workLocation,typePartFull,
                typeFullIntern,jobType)
                VALUES('${regid}','${username}','${password}','${name}','${email}','${mobile}','${whatsapp_mobile}','${city}','${hometown}','${college}','${university}','${passing_year}','${branch}','${linkedinid}','${githubid}','${referredby}','${currentcompany}','${yearsOfExperience}','${currentDesignation}',
                '${noticePeriod}','${currentSalary}','${skills}','${dob}','${workLocation}','${typePartFull}','${typeFullIntern}',
                '${jobType}')`);
    
    //console.log(response[0]);
    res.status(201).json(response[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// http://localhost:4000/career/updatecareer

router.put('/updatecareer', async(req,res) => {
  try{
    const {name,email,mobile,whatsapp_mobile,city,hometown,college,university,passing_year,branch,linkedinid,
      githubid,referredby,currentcompany,yearsOfExperience,currentDesignation,noticePeriod,currentSalary,skills,
      dob,workLocation,typePartFull,typeFullIntern,jobType,uploadCV}=req.body;
    const response = await db.promise()
    .query(`update career set name='${name}',email='${email}',mobile='${mobile}',whatsapp_mobile='${whatsapp_mobile}',
    city='${city}',hometown='${hometown}',college='${college}',university='${university}',passing_year='${passing_year}',
    branch='${branch}',linkedinid='${linkedinid}',githubid='${githubid}',referredby='${referredby}',
    currentcompany='${currentcompany}',yearsOfExperience='${yearsOfExperience}',currentDesignation='${currentDesignation}',
    noticePeriod='${noticePeriod}',currentSalary='${currentSalary}',skills='${skills}',dob='${dob}',
    workLocation='${workLocation}',typePartFull='${typePartFull}',typeFullIntern='${typeFullIntern}',
    jobType='${jobType}',uploadCV='${uploadCV}'
    where srno = ${req.body.srno} `);
    res.status(200).json(response[0]);
  }
  catch(err){
    res.status(400).json({message:err});
  }
});







module.exports = router;
