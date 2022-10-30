const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(async (user) => {
    const role = await Role.findByPk(user.roleId);
    if (role.name === "admin") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!",
    });
    return;
  });
};
isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(async (user) => {
    const role = await Role.findByPk(user.roleId);
    if (role.name === "moderator") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Moderator Role!",
    });
  });
};
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(async (user) => {
    const role = await Role.findByPk(user.roleId);
    if (role.name === "moderator") {
      next();
      return;
    }
    if (role.name === "admin") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Moderator or Admin Role!",
    });
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
