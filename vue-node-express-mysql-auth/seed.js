const db = require("./app/models");
var bcrypt = require("bcryptjs");

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
    roleId: 3,
  });
}
