const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "hailie73@ethereal.email",
    pass: "QJuARpJnyax6hHQeP9",
  },
});
transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send!");
  }
});
app.post("/info", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;
  const mail = {
    from: name,
    to: process.env.MAIL,
    subject: "Contact form submission: Portfolio",
    html: `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Name: ${phone}</p>
          <p>Name: ${message}</p>
    `,
  };
  transporter.sendMail(mail, (error) => {
    if (error) {
      req.json(error);
    } else {
      res.json({ code: 200, status: "Message sent successfully!" });
    }
  });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port 5000");
});
