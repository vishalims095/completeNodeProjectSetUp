var constants = require ('./constant');
var async = require ('async');
var _ = require ('lodash');
var FCM = require('fcm-node');
var config = require ('../Config/development');
var twilio = require('twilio');


/*
------------------------------------------------
              Send OTP
------------------------------------------------      
*/

exports.sendotp = function(varification_code, mobile_number) {
    // var accountSid = ''; // Your Account SID from www.twilio.com/console
    //     var authToken = '';   // Your Auth Token from www.twilio.com/console

    var twilio = require('twilio');
    var client = new twilio(config.accountSid, config.authToken);
    client.messages.create({
            body: "your tangoride one time password(OTP) is  " + varification_code + "  valid for 3 minutes do not disclose it",
            to: mobile_number, // Text this number
            from: 'no insert' // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));

}


/*
-------------------------------------------------
    send mail
-------------------------------------------------
*/

exports.sendmail = function(help_text, email_id) {
    var nodemailer = require("nodemailer");
    var smtpTransport = require("nodemailer-smtp-transport");
    var config = {
        "SMTP_HOST": "smtp.sendgrid.net",
        "SMTP_PORT": 25,
        "SMTP_USER": "apikey", //default
        "SMTP_PASS": "==============keys=============="
        //"SMTP_PASS" : config.SMTP_PASS
    }
    var mailer = nodemailer.createTransport(smtpTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        auth: {
            user: config.SMTP_USER,
            pass: config.SMTP_PASS
        }
    }));
    mailer.sendMail({
        from: "techfluper@gmail.com",
        to: email_id,
        cc: "vishalims095@gmail.com",
        subject: "Tangoride verification code",
        template: "text",
        html: " Your verification code is :" + help_text
    }, (error, response) => {
        if (error) {
            console.log(error);
            // resolve({ message: "Email not send " });
        } else {
            console.log(response);
            // resolve({ message: "Email send successfully" });
        }
        mailer.close();
        //res.send("Response send successfully");
    });
}




exports.verifyData = (data = {}) => {
    var result = {};
    var count = 0;
    _.map(data, (val, key) => {
        if (val && val.length || _.isInteger(val)) {
            result[key] = val;
        }
    })
    return result;
}
// Android push notification

exports.sendPushNotification = function (serverKey, token, device_type, payload, notify) {
    //console.log({payload});
console.log("send notification Android calling")
     //console.log(serverKey, token, device_type, payload, notify);
        var fcm = new FCM(serverKey);
        var message = {
            to: token,
            collapse_key: 'your_collapse_key',
            //notification: notify,
            data: payload,
         };
         // console.log(message)
         console.log(' a => ');
        fcm.send(message, function(err, response) {
            if (err) {

                console.log("=======================Android error comming===================")
                console.log(null, err);
                console.log('Vishal')
            } else {
                console.log("=======================Android===================")
                console.log(null, response)
            }
        });        
}

//Ios push notification

 exports.sendPushNotificationForIos = function (serverKey, token, device_type, payload, notify) {
    var fcm = new FCM(serverKey);
    var message = {
        to: token,
        collapse_key: 'your_collapse_key',
        notification: notify,
        data: payload,
     };
     //console.log(message)
    fcm.send(message, function(err, response) {
        if (err) {
            console.log("=======================IOS===================")
            console.log(null, err);
        } else {
            console.log("=======================IOS===================")
            console.log(null, response)
        }
    }); 
}