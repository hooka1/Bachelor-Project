const express = require('express');
const port = process.env.PORT || 8000;
const app=express();
const cors= require('cors');

const bodyParser = require('body-parser');

// 
require('./db');
require('./Models/User');
require('./Models/ApprovedSessions');
require('./Models/RequestedSessions');
require('./Models/PreviousSessions');
//

//
const authController = require('./Routes/authController');
const clientController= require('./Routes/clientController');
const adminController= require('./Routes/adminController');
const translatorController=require('./Routes/translatorController')
const paymentController= require('./Routes/paymentController')

//
// app.use(bodyParser.json());
app.use (express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(authController);
app.use(clientController);
app.use(adminController);
app.use(translatorController);
app.use(paymentController);

//


app.get('/', (req, res) => {
    res.send('Welcome');
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })