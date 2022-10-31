const db = require("./app/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./app/config/auth.config");

const Role = db.role;
const User = db.user;

db.sequelize.sync({ force: true }).then(async () => {
  console.log("Drop and Resync Db");
  await initial();
  await generateAdminAccount();
});

async function initial() {
  await Role.create({
    id: 1,
    name: "user",
  });

  await Role.create({
    id: 2,
    name: "moderator",
  });

  await Role.create({
    id: 3,
    name: "admin",
  });
}

async function generateAdminAccount() {
  await User.create({
    id: 1,
    username: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123123", 8),
    status: true,
    is_verified: true,
    confirmationCode: jwt.sign({ email: "admin@gmail.com" }, config.secret),
    roleId: 3,
  });
}
