const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const db = require('./src/config/config');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




db.connect();

const cors = require("cors")
app.use(cors());
app.use(express.json());




const routes = require('./src/route/route')
app.use('/smr', routes)

const port = 3240
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})
