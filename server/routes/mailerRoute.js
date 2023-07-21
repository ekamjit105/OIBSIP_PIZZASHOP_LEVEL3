const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');

//SEND MAIL || @POST REQUEST
router.post("/sendmail", async (req, res) => {
  const objto = req.body["to"];
  const objsubject = req.body["subject"];
  const objtext = req.body["text"];
  
  console.log("objto : ",objto)
  console.log("objsubject : ",objsubject)
  console.log("objtext : ",objtext)
  console.log("IN MAILER ROUTE ... ", req.body)  ;
  
  try{

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ekamjits105@gmail.com",
            pass: "dadbrfexpbflwwmc"
            //account 2-step security app password : dadbrfexpbflwwmc
        }
        });

        var mailOptions = {
        from: 'ekamjits105@gmail.com',
        to: objto,
        subject: objsubject,
        text: objtext
        };

        transporter.sendMail(mailOptions, function(error, info){
        console.log("sending now...")
        if (error) {
            console.log("error in sending.. Error: ",error);
            res.status(404).send('Error sending mail .. ' + error);
            
        } else {
            
            res.status(200).send('Email sent: ' + info.response);
        }
        });
    }
    catch(e)
    {
        console.log("Error in sending mail : "+e);
    }
});

module.exports = router;