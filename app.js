const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config({ path: ".env" });

const db = require('./db');

app.use(express.json());
app.use(cors());
app.use(cors({
    origin: '*'
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/', (req, res) => {
    try {
        console.log('JSCMS API is running.........');
        res.send('<h1>JSCMS API is running.........</h1>');
    }
    catch {

    }
})

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const careerRoute = require('./routes/career');
app.use('/career', careerRoute);

const contactRoute = require('./routes/contact');
app.use('/contact', contactRoute);

const blogRoute = require('./routes/blog');
app.use('/blog', blogRoute);


app.listen(process.env.PORT || 4000, function () {
    console.log('App running on port 4000.');
    db.connect(function (err) {
        if (err) {
            console.log('db connection error', err);
        }
        else {
            console.log('db connected');
        }
    })

});