const fs = require('fs');
const nodemailer = require('nodemailer');
const env = require('dotenv').config({ path: require('find-config')('.env') });
const transporter = nodemailer.createTransport({
    service: env.parsed.MAIL_SOURCE,
    auth: {
        user: env.parsed.MAIL_USER,
        pass: env.parsed.MAIL_PASSWORD
    }
});

// this will send templated mail to user 
function sendMail(userName, email, otp) {
    return new Promise((resolve, reject) => {
        getOTPTemplate(userName, otp).then((message) => {
            let details = {
                from: env.parsed.MAIL_USER,
                to: email,
                subject: 'Reset Password From MSF',
                html: message
            };
            transporter.sendMail(details, function (error, data) {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        }).catch(error => reject(error));
    });
}

function getOTPTemplate(userName, opt) {
    return new Promise((resolve, reject) => {

        // OtpMailUtil.html file and replace username and otp 
        fs.readFile('Utils/OtpMailUtil.html', 'utf8', function (error, data) {
            if (error) {
                reject(error);
            }

            // g for global : replace all occurance
            let result = data.replace(/userName/g, userName);
            resolve(result.replace(/oneTimePassword/g, opt));
        });
    });
}

module.exports = { sendMail };