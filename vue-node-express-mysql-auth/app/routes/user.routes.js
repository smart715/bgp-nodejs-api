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
  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/test/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/test/admin/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserById
  );
  app.put(
    "/api/test/admin/users/edit/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );
  app.delete(
    "/api/test/admin/users/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.removeUser
  );
};
