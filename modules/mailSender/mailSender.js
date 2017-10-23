const nodemailer = require('nodemailer');
var config = require('../../config');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(config.mailSender);

function sendMail(from, to, subject, data) {
    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: '<b>Testing mail sender. Data:</b>' + '<br></br>' + '<p>' + data + '</p>'
    };

    // send mail with defined transport object
    return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('ERROR:', error);
            return false;
        }
        console.log('Mail sent.', 'messageId:', info.messageId, 'response:', info.response);
    });
}

module.exports = {
    sendMail: sendMail
};