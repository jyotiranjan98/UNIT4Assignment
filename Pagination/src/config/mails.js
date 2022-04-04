
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "70601df46edee0", // generated ethereal user
      pass: "86dcbfea6f6573", // generated ethereal password
    },
  });

  module.exports=transporter;