const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/auth/confirm/:confirmationCode",
    [authJwt.checkApiKey],
    controller.verifyUser
  );
  app.post(
    "/api/auth/signup",
    [authJwt.checkApiKey, verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );
  app.post("/api/auth/signin", [authJwt.checkApiKey], controller.signin);
};
