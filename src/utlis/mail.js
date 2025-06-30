const nodemailer = require('nodemailer');

// Create a reusable transporter function
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587,
    secure: process.env.MAIL_SECURE || false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
};

// Function to send an email
const mailSender = async (email, subject, htmlContent) => {
  try {
    let transporter = createTransporter();

    let info = await transporter.sendMail({
      from: process.env.MAIL_FROM || '"NewHomeRealty" <newhomerealty@gmail.com>',
      to: email,
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error.message);
    throw new Error('Email could not be sent');
  }
};

module.exports = mailSender;
