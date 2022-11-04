const nodemailer = require("nodemailer");
const config = require("./auth.config");

const frontend_url = config.FRONTEND_URL;
const user = config.MAIL_USERNAME;
const pass = config.MAIL_PASSWORD;

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: user,
    pass: pass
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${frontend_url}/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendPasswordResetEmail = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please reset your password",
      html: `<h1>Password Reset</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please reset your password by clicking on the following link</p>
        <a href=${frontend_url}/PasswordResetInput/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};
