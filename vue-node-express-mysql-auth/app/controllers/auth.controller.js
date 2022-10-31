const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const nodemailer = require("../config/nodemailer.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = async (req, res) => {
  // Save User to Database
  const userRole = await Role.findOne({ where: { name: "user" } });
  var token = jwt.sign({ email: req.body.email }, config.secret);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    roleId: userRole.id,
    confirmationCode: token,
  })
    .then((user) => {
      res.send({
        message: "User was registered successfully! Please check your email",
      });
      nodemailer.sendConfirmationEmail(user.username, user.email, token);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!user.is_verified)
        return res.status(401).send({
          accessToken: null,
          message: "Please verify account by email",
        });
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      const role = await Role.findOne({ where: { id: user.roleId } });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        role: role.name,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.verifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.is_verified = true;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(200).send({ message: "Acccount confirmed!" });
        }
      });
    })
    .catch((e) => console.log("error", e));
};
