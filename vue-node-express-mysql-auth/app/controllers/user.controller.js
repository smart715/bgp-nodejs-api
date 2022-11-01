const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.getUserProfile = async (req, res) => {
  const response = await User.findOne({
    where: { id: req.userId },
    attributes: ["id", "username", "email", "createdAt", "updatedAt", "roleId"],
  });
  if (response) {
    res.status(200).send({ profile: response });
  } else {
    res.status(404).send({ message: "User not found." });
  }
};
exports.adminBoard = async (req, res) => {
  const { currentPage, perPage, text } = req.query;
  const { count, rows } = await User.findAndCountAll({
    where: {
      username: {
        [Op.substring]: text,
      },
    },
    offset: (parseInt(currentPage) - 1) * parseInt(perPage),
    limit: parseInt(perPage),
    attributes: [
      "id",
      "username",
      "email",
      "createdAt",
      "updatedAt",
      "roleId",
      "status",
    ],
  });
  if (rows)
    return res
      .status(200)
      .send({ users: rows, total: count, per_page: perPage });
};
exports.getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({
    where: { id },
    attributes: [
      "id",
      "username",
      "email",
      "createdAt",
      "updatedAt",
      "roleId",
      "status",
    ],
  });
  if (user) return res.status(200).send({ user: user });
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, email, role, password } = req.body;
  const newUser = {
    id,
    username: username,
    email: email,
    roleId: parseInt(role),
    updatedAt: new Date(),
    attributes: [
      "id",
      "username",
      "email",
      "createdAt",
      "updatedAt",
      "roleId",
      "status",
    ],
  };
  if (password) newUser.password = bcrypt.hashSync(password, 8);
  const [user, created] = await User.upsert(newUser);
  if (user) return res.status(200).send({ user: user });
};
exports.updateProfile = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = {
    id: req.userId,
    username: username,
    email: email,
    updatedAt: new Date(),
    attributes: [
      "id",
      "username",
      "email",
      "createdAt",
      "updatedAt",
      "roleId",
      "status",
    ],
  };
  if (password) newUser.password = bcrypt.hashSync(password, 8);
  const [user, created] = await User.upsert(newUser);
  if (user) return res.status(200).send({ profile: user });
};
exports.removeUser = async (req, res) => {
  const id = req.params.id;
  const response = await User.destroy({
    where: { id },
  });
  if (response) return res.status(200).send({ message: "Success" });
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const newUser = {
    id,
    status,
    attributes: [
      "id",
      "username",
      "email",
      "createdAt",
      "updatedAt",
      "roleId",
      "status",
    ],
  };
  const [user, created] = await User.upsert(newUser);
  if (user) return res.status(200).send({ user: user });
};
