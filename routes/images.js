const express = require("express");
const router = express.Router();
const path = require("path")
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    console.log('---------------file-------------', file)
    console.log('---------------req file-------------', req.file)
    cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    console.log('Image uploaded')
  }
})

const maxSize = 1 * 1000 * 1000;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {

    // Set the filetypes, it is optional 
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(
      file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error: File upload only supports the "
      + "following filetypes - " + filetypes);
  }

  // mypic is the name of file attribute 
}).single("mypic");

// http://localhost:4000/images/uploadImage
router.post("/uploadImage", function (req, res, next) {

  // console.log('req.body', req.body);
  // console.log('req.file', req.file);

  // Error MiddleWare for multer file upload, so if any 
  // error occurs, the image would not be uploaded! 
  upload(req, res, function (err) {

    if (err) {

      // ERROR occurred (here it can be occurred due 
      // to uploading image of size greater than 
      // 1MB or uploading different file type) 
      console.log('err', err)
      res.send(err)
    }
    else {
      console.log("Success, Image uploaded!")
      // SUCCESS, image successfully uploaded 
      res.send("Success, Image uploaded!");
    }
  })
})

// http://localhost:4000/images/allimages
router.get('/allimages', async (req, res) => {
  try {

    var fs = require('fs');
    var tempfiles = []

    fs.readdir(`${process.cwd()}/uploads/`, (err, files) => {
      if (err)
        console.log(err);
      else {
        console.log("\nCurrent directory filenames:");
        files.forEach(file => {

          tempfiles = [...tempfiles, file]
          //tempfiles.push(file);
          console.log(file);
        })

        console.log('tempfiles', tempfiles);
        res.status(200).json(tempfiles);
      }
    })
  }
  catch (err) {
    res.status(400).json({ message: err });
  }
});


module.exports = router;
