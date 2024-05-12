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


// create PDF

var pdf = require("pdf-creator-node");

 exports.invoiceTemplate = () =>{
        
        return `
        <!doctype html>
        <html lang="en">
        {{#each users}}
        
        <head>
          <meta charset="utf-8">
          <title>Geem</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" type="image/x-icon" href="http://3.28.109.93:8086/fav_ic.png">
          <link rel="preconnect" href="https://fonts.gstatic.com">
        </head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:wght@400;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800&family=Roboto:ital,wght@0,900;1,700;1,900&display=swap');
        
          * {
            font-family: montserrat !important;
          }
        
          @font-face {
            font-family: mvboli;
            src: url('./assets/fonts/mvboli.ttf');
            src: url('assets/mvboli.ttf')
          }
        
          .mainn {
            font-family: mvboli !important;
            font-size: 30px;
          }
        
          .image-footer {
            display: inline-block !important;
          }
        
          .foot-img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
        
          p {
            font-size: 12px;
            margin-bottom: 10px;
            margin-top: 0px;
          }
        
          .note {
            font-size: 10px;
            font-weight: 600;
            margin-bottom: 1px;
          }
        
          .w-100 {
            width: 100%;
          }
        
          .commn-space {
            margin-bottom: 1px;
          }
        
          .light {
            color: #a7a8a8;
            font-weight: 400;
          }
        
          .dark {
            color: #000000bd;
            font-weight: 700;
            position: relative;
          }
        
          .nw-mrgn {
            margin-top: 0px;
            line-height: 1;
            margin-bottom: 0;
          }
        
          .header {
            padding: 1rem 1rem;
          }
        
          .billing p {
            font-size: 12px;
          }
        
          .inv-p {
            padding: 0rem 1rem;
          }
        
          .itm-head td {
            font-size: 12px;
            color: black;
            font-weight: bold;
          }
        
          .tble-mrgn {
            margin-top: 2rem;
          }
        
          .f-orange {
            color: #FF5E39;
            font-weight: 600;
          }
        
          .nw-clr {
            color: #FF5E39;
            font-weight: 600;
            font-size: 26px;
          }
        
          .total p {
            margin-bottom: 10px;
          }
        
          .m-0 {
            margin: 0;
          }
        
          ul {
            margin: 0px;
            margin-bottom: 10px;
          }
        
          .instructions {
            margin-top: 7rem;
            border-bottom: 1px solid #FF5E39;
        
          }
        
          .advice {
            color: #0d6ad4;
            margin-bottom: 5px;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 0.9;
          }
        
          .foot {
            font-weight: 600;
            display: inline-block;
            font-size: 10px;
          }
        
          .invoice-title {
            margin-bottom: 0px;
            font-size: 14px;
          }
        
        
        
          .blue {
            font-size: 30px;
            color: #304f73;
            margin: 0px;
        
            font-weight: bold;
          }
        
          .list {
            font-size: 10px;
            font-weight: 400;
            color: black;
        
          }
        
          .tax {
            margin: 5px;
          }
        
          .colon ::before {
            content: ':';
            margin-left: -15px;
            font-size: 17px;
            margin-right: 4px;
        
            top: -5px;
        
            display: inline-block;
            position: absolute;
          }
        
          .borderbtm:after {
            content: '';
            display: block;
            border-bottom: 1px solid #0d6ad4;
            width: 85%;
            position: absolute;
            margin-left: 110px;
            margin-top: -8px;
          }
        
          table {
            border-collapse: collapse;
          }
        
          .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
          }
        
          @page {
            size: A4;
            margin: 1rem;
          }
        
          @media print {
        
            html,
            body {
              width: 210mm;
              height: 297mm;
            }
            
            .blue {
              font-size: 25px;
              margin-left: 40px;
            }
        
            .logo {
              background: #fff;
            }
        
            .mainn {
              font-family: mvboli !important;
              font-size: 30px;
            }
        
            .image-footer {
              display: inline-block !important;
            }
        
            .borderbtm:after {
              content: '';
              display: block;
              border-bottom: 1px solid #0d6ad4;
              width: 90%;
              position: absolute;
              margin-left: 80px;
              margin-top: -8px;
            }
        
            .footer {
              position: fixed;
              bottom: 0;
              width: 100%;
            }
        
        
          }
        </style>
        
        <body class="page">
          <div class="invoice page">
            <!--invoice head -->
            <table class="w-100 header  aftr-img borderbtm">
              <tr class="" style="height: 10px;">
        
                <td class="logo" style="width: 10%;">
                  <img class="w-100" src="http://3.28.109.93:8086/geem_logo_large.png" alt="" srcset="">
                </td>
                <td style="width: 80%;">
                  <div class="geemp" style="margin-left: 40px;">
                    <h4 class="blue">GEEM Facilities Management
                    </h4>
                    <h4 class="blue ">Services Co. L.L.C</h4>
                  </div>
                </td>
                <td style="width: 9%;  ">
                  <img class="w-100" src="http://3.28.109.93:8086/scanner.jpg" alt="" srcset="">
                </td>
        
              </tr>
        
            </table>
            <!--  -->
            <table class="w-100 headers">
              <tr>
                <td style="width: 100%; text-align: center; font-size: 22px; line-height: 12px;">
                  <h4 class="tax">TAX INVOICE <br>
                    <span style="font-size: 10px; text-decoration: underline;">104231344300001</span>
                  </h4>
        
                </td>
        
              </tr>
            </table>
            <div class="inv-p">
              <!-- billing-details -->
        
              <table class="w-100 items-d" style="padding-top: .1rem; ">
        
                <p class="dark invoice-title">Invoice To,</p>
                <tr class="" style="height: 10px;">
        
                  <td style="width: 10%; ">
                    <p class="dark"> Name </p>
                  </td>
                  <td style="width: 30%;" class="dot-border colon">
                    <p class="dark">{{this.name}}</p>
                  </td>
                  <td style="width: 60%; text-align: end;" class="dark ">
                    <p> Invoice No: <span>{{this.invoice_number}}</span></p>
                  </td>
        
                </tr>
                <tr class=" " style="height: 10px;">
                  <td style="width: 10%;  ">
                    <p class="dark "> Booking Ref </p>
                  </td>
                  <td style="width: 30%;" class="dot-border colon">
                    <p class="dark colon">{{this.invoice_number}}</p>
                  </td>
                  <td style="width: 60%; text-align: end;" class="dark ">
                    <p>Date of Issue <span>{{this.date}}</span></p>
                  </td>
                </tr>
                <tr class=" " style="height: 10px;" class="colon">
                  <td style="width: 10%; ">
                    <p class="dark"> Tell./Mobile </p>
                  </td>
                  <td style="width: 30%;" class="dot-border colon">
                    <p class="dark">{{this.phoneNumber}}</p>
                  </td>
                </tr>
                <tr class=" " style="height: 10px;">
                  <td style="width: 10%; ">
                    <p class="dark"> Address</p>
                  </td>
                  <td style="width: 30%;" class="dot-border colon">
                    <p class="dark"> {{this.nearBy}}</p>
                  </td>
                  <td style="width: 60%; text-align: end;" class="dark ">
                    <p> Invoice Total <br>
                    </p>
                  </td>
        
                </tr>
                <tr class=" " style="height: 10px;">
                  <td style="width: 10%; ">
                    <p class="dark"> TRN </p>
                  </td>
                  <td style="width: 30%;" class="dot-border colon">
                    <p class="dark">{{this.houseNo}}</p>
                  </td>
                  <td style="width: 60%; text-align: end;">
                    <div style="font-size: 30px;" class="nw-clr">AED {{this.total_amount}}</div>
                  </td>
        
        
                </tr>
                <tr class=" " style="height: 10px;">
                  <td style="width: 20%; ">
                    <p class="dark"> Payment Mode </p>
                  </td>
                  <td style="width: 30%;" class="dot-border colon">
                    <p class="dark">Cash</p>
                  </td>
        
                </tr>
              </table>
        
              <!-- items-details -->
              <table class="w-100 items-d tble-mrgn" style="border: 1px solid black; ">
                <tr class="itm-head " style="height: 30px;">
                  <td style="width: 5%; text-align: center; border: 1px solid black;">SN</td>
                  <td style="width: 50%;text-align: center; border: 1px solid black;">Item Description</td>
                  <td style="width:5%; text-align: center;border: 1px solid black;">QTY </td>
                  <td style="width: 10%; text-align: center;border: 1px solid black;">Unit Cost</td>
                  <td style="width: 10%;text-align: center; border: 1px solid black;">Amount(AED)</td>
        
        
                </tr>
                {{#each this.items}}
        
                <tr style="height: 20px; ">
                  <td style="height: 20px; border-right: 1px solid black;">
                    <p style="margin-bottom: 0px; text-align: center;" class="dark">1</p>
                  </td>
                  <td style="height: 20px; border-right: 1px solid black;">
                    <p class="dark">
                      {{this.item}}
                    </p>
                  </td>
                  <td style="height: 20px; border-right: 1px solid black;text-align: center;">
                    <p class="dark">{{this.quantity}} </p>
                  </td>
                  <td style="height: 20px; border-right: 1px solid black;text-align: end;">
                    <p class="dark">{{this.amount_per_item}}</p>
                  </td>
                  <td style="height: 20px; border-right: 1px solid black;text-align: end;">
                    <p class="dark">{{this.amount}}</p>
                  </td>
        
                </tr>
        
                {{/each}}
        
        
        
              </table>
              <!-- total-table -->
              <table class="w-100 total" style=" border-bottom: 1px solid #FF5E39;">
                <tr>
        
                  <td style="width: 50%;">
                    <!-- <P class="dark"> Said Dirhams"Seven Thousand Six Hundred Ninteen and 86/100"Fils</P> -->
                  </td>
                  <!-- <td style="width: 30%;"></td> -->
                  <td style="width: 20%;text-align: end;">
                    <p class="f-orange">Subtotal:</p>
                    <p class="f-orange">Vat Amount:</p>
                    <p class="f-orange">Total Including VAT:</p>
                  </td>
                  <td style="width: 20%;text-align: end;">
                    <p class="dark">AED {{this.sub_total_amt}}</p>
                    <p class="dark">AED {{VAT}}</p>
                    <p class="dark">AED {{this.total_amount}}</p>
                  </td>
                </tr>
              </table>
              <!-- invoive term -->
              <div class="footer">
                <div class="instructions">
                  <h5 class="advice">Advice: System Generated Invoice No Sign/Stamp Required</h5>
                  <p class="note">Note</p>
                  <div class="">
                    <ul>
                      <li class="list">The Limited Warranty applies to physical goods and workman ship, purchased or
                        service
                        received from
                        Geem.
                      </li>
                      <li class="list">The Limited Warranty covers any defects under normal use, within 30 days from
                        invoice date.
                      </li>
                      <li class="list">Products, Equipment and spare parts is subjected to Manufacture warranty terms
                        and
                        condition and
                        validity.
                      </li>
                      <li class="list">Paid amount is non refundable, terms and conditions applied to <a
                          href="">https://www.geem.ae/terms-conditions</a></li>
                    </ul>
                  </div>
        
                </div>
                <table class="w-100 items-d" style="padding-top: .1rem; ">
                  <tr class="dark " style="height: 20px;">
                    <td class="info-Iocn">
                      <div class="image-footer">
                        <img class="foot-img " src="http://3.28.109.93:8086/mail.jpeg" alt="" srcset="">
                        <div class="foot">info@geem.ae,</div>
                      </div>
                    </td>
                    <td class="info-Iocn">
                      <div class="image-footer">
                        <img class="foot-img " src="http://3.28.109.93:8086/phone.jpeg" alt="" srcset="">
                        <div class="foot">+971 54 22 55 220,</div>
                      </div>
                    </td>
                    <td class="info-Iocn">
                      <div class="image-footer">
                        <img class="foot-img " src="http://3.28.109.93:8086/whatsapp.jpeg" alt="" srcset="">
                        <div class="foot">+971 4 259 4669, Web: https://www.geem.ae, Dubai, United Arab Emirates.</div>
                      </div>
                    </td>
                    <td style="width: 11%; text-align: center;">
                      <p class="foot">Page 1|1</p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        
        
        
        </body>
        
        {{/each}}
        
        </html>
        `
    }
    let UPLOAD_PATH = 'invoice';

    exports.createPdf = async (data, fileName) =>{
        var date = moment().format('DD/MM/YYYY')
        console.log("==========>",data)

        data = data.map((ele)=>{
          let d = ele 
          ele.sub_total_amt = ele.sub_total_amt+ele.additional_work_amt
          d.additional_work_amt = numberWithCommas(ele.additional_work_amt.toFixed(2))
          d.sub_total_amt = numberWithCommas(ele.sub_total_amt.toFixed(2))
          d.VAT = numberWithCommas(ele.VAT.toFixed(2))
          d.total_amount = numberWithCommas(ele.total_amount.toFixed(2))
          d.items = ele.items.map((ele1)=>{
            let d1 = ele1
            d1.amount_per_item = numberWithCommas(ele1.amount_per_item.toFixed(2))
            d1.amount = numberWithCommas(ele1.amount.toFixed(2))
            return d1
          })
          return d
        })

        function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        var html = this.invoiceTemplate()
        var options = {format:'A3',  width: '12in',
        height: '27in', header: {  "height": "5mm"},footer: { "height": "5mm"}, border:{
            top:'30px',bottom:'30px',left:'10px'
        }}

        var document = {
            html: html,
            data: {
                users : data
                // users: [{total_amount : 12321, invoice_number : 1111, date : date, items : [{item : "item111", quantity : 2, amount : 111, amount_per_item: 11}, {item : "item112", amount_per_item :12, quantity:6, amount : 112}]}],
            },
            path: `${UPLOAD_PATH}/${fileName}`,
            type: "",
        };
        pdf.create(document, options)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
    }
