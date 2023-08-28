import nodemailer from "nodemailer";
import config from "../config/config";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.nodemailer.email,
    pass: config.nodemailer.password,
  },
});

export const sendVerifyEmail = (email: string, token: string) => {
  var mailOptions = {
    from: config.nodemailer.email,
    to: email,
    subject: "Forgot Password Email",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;" >
    <h1>Verify Account</h1>
    <h3>Please click on the link below to verify your account.</h3>
    <a href="${config.nodemailer.redirect}/verify/${token}" style="background-color: #4267b2;color:white;padding:1em;border-radius:1em;text-decoration: none;">Click here to verify your account </a>
</div>
    </body>
</html>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(info);
  });
};
