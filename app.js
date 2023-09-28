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

app.get('/', (req, res) => {
    try {
        console.log('JSCMS API is running.........');
        res.send('<h1>JSCMS API is running.........</h1>');
    }
    catch{

    }
})

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// const questionsRoute = require('./routes/questions');
// app.use('/questions', questionsRoute);

// const examsRoute = require('./routes/exams');
// app.use('/exams', examsRoute);


app.listen(process.env.PORT || 4000, function() {
    console.log('App running on port 4000.');
    db.connect(function(err) {
        if(err) {
            console.log('db connection error', err);
        }
    })

});