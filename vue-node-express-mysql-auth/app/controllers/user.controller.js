const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
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
    attributes: ["id", "username", "email", "createdAt", "updatedAt", "roleId"],
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
    attributes: ["id", "username", "email", "createdAt", "updatedAt", "roleId"],
  });
  if (user) return res.status(200).send({ user: user });
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const [user, created] = await User.upsert({
    id,
    username: req.body.username,
    email: req.body.email,
    roleId: parseInt(req.body.role),
    createdAt: new Date(),
    attributes: ["id", "username", "email", "createdAt", "updatedAt", "roleId"],
  });
  if (user) return res.status(200).send({ user: user });
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
