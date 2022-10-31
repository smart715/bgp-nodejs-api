const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/all", controller.allAccess);
  app.get("/api/user", [authJwt.verifyToken], controller.userBoard);
  app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/admin/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserById
  );
  app.put(
    "/api/admin/users/edit/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );
  app.delete(
    "/api/admin/users/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.removeUser
  );
  app.post(
    "/api/admin/users/changeStatus/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.changeStatus
  );
};
