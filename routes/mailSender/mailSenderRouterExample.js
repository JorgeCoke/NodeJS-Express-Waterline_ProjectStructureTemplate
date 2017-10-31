var express = require('express');
var router = express.Router();
var mailSender = require('../../modules/mailSender/mailSender');

router.use('/', function(req,res){
    console.log("sendMail...");
    if (mailSender.sendMail('Starter Template','emailTo@gmail.com','Testing Subject','Data...')){
        res.status(500).send('ERROR. Email not sent');
    } else {
        res.status(200).send('Email sent');
    }
});

module.exports = router;
