const nodemailer = require("nodemailer");
const express = require("express");
require("dotenv").config({
  path: "credential.env"
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sendMail", async (req, res) => {
  console.log(req.body);
  console.log("send mail");
  const transport = nodemailer.createTransport({
    service: "naver",

    auth: {
      user: process.env.email,
      pass: process.env.pass
    }
  });

  const mailOption = {
    from: process.env.email,
    to: process.env.email,
    subject: req.body.subject,
    text:
      "이름 : " +
      req.body.name +
      "\n이메일 : " +
      req.body.email +
      "\n내용 : " +
      req.body.message
  };

  await transport.sendMail(mailOption, (err, respon) => {
    if (err) {
      console.log(err);
      transport.close();
      res.redirect(500, "https://www.revoice.kr");
      return res.send("fail");
    } else {
      console.log("mail success");
      transport.close();
      res.redirect(200, "https://www.revoice.kr");
      return res.send("success");
    }
  });
});
app.listen(process.env.port, () => {
  console.log("mail server listening on port " + process.env.port);
});
