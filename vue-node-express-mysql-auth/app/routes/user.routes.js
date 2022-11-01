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
  app.get("/api/all", [authJwt.checkApiKey], controller.allAccess);
  app.get(
    "/api/profile",
    [authJwt.checkApiKey, authJwt.verifyToken],
    controller.getUserProfile
  );
  app.get(
    "/api/user",
    [authJwt.checkApiKey, authJwt.verifyToken],
    controller.userBoard
  );
  app.get(
    "/api/mod",
    [authJwt.checkApiKey, authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/admin/users",
    [authJwt.checkApiKey, authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/admin/users/:id",
    [authJwt.checkApiKey, authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserById
  );
  app.put(
    "/api/admin/users/edit/:id",
    [authJwt.checkApiKey, authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );
  app.delete(
    "/api/admin/users/delete/:id",
    [authJwt.checkApiKey, authJwt.verifyToken, authJwt.isAdmin],
    controller.removeUser
  );
  app.put(
    "/api/admin/users/changeStatus/:id",
    [authJwt.checkApiKey, authJwt.verifyToken, authJwt.isAdmin],
    controller.changeStatus
  );
  app.put(
    "/api/profile/update",
    [authJwt.checkApiKey, authJwt.verifyToken],
    controller.updateProfile
  );
};
