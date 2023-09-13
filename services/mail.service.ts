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
    subject: "Verify Email",
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
    <a href="${config.nodemailer.redirect}/verify?token=${token}" style="background-color: #4267b2;color:white;padding:1em;border-radius:1em;text-decoration: none;">Click here to verify your account </a>
</div>
    </body>
</html>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(info);
  });
};

export const sendBlogAgentUpdate = (
  email: string,
  updatedBy: string,
  url: string,
  type: string = "blog"
) => {
  var mailOptions = {
    from: config.nodemailer.email,
    to: email,
    subject: `${
      type === "blog" ? "Blog" : type === "stay" ? "Stays" : "Events"
    } Updates`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;gap:10px" >
    <h1>${
      type === "blog" ? "Blog" : type === "stay" ? "Stays" : "Events"
    } Update</h1>
    <h3>An Agent (${updatedBy}) has made some changes to the ${type} created by you, please click on the following link to review the changes and publish the ${type}</h3>
    <a href="${
      config.nodemailer.redirect
    }/${url}" style="background-color: #4267b2;color:white;padding:1em;border-radius:1em;text-decoration: none;">Click here</a>
</div>
    </body>
</html>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(info);
  });
};

export const sendBlogReject = (
  email: string,
  updatedBy: string,
  remark: string,
  title: string,
  type: string = "blog"
) => {
  var mailOptions = {
    from: config.nodemailer.email,
    to: email,
    subject: `${
      type === "blog" ? "Blog" : type === "stay" ? "Stays" : "Events"
    } Updates`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="align-items:center;justify-content:center;width:100%;gap:10px" >
    <h1 ${
      type === "blog" ? "Blog" : type === "stay" ? "Stays" : "Events"
    } Update</h1>
    <h3 style="margin-top:10px">An Agent (${updatedBy}) has rejected your ${type} with title "${title}"  </h3>
    <p style="margin-top:10px">Reason: ${remark} </p>
</div>
    </body>
</html>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(info);
  });
};

export const sendBlogAccept = (
  email: string,
  updatedBy: string,
  url: string,
  type: string = "blog"
) => {
  var mailOptions = {
    from: config.nodemailer.email,
    to: email,
    subject: `${
      type === "blog" ? "Blog" : type === "stay" ? "Stays" : "Events"
    } Updates`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="width:100%;gap:10px" >
    <h1>${
      type === "blog" ? "Blog" : type === "stay" ? "Stays" : "Events"
    } Update</h1>
    <h3>An Agent (${updatedBy}) has approved your ${type},please visit the link below to see the ${type}.</h3>
    <a href="${
      config.nodemailer.redirect
    }/${url}" style="background-color: #4267b2;color:white;padding:1em;border-radius:1em;text-decoration: none;">Click here</a>
</div>
    </body>
</html>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(info);
  });
};
