const { authJwt } = require("../middleware");
const controller = require("../controllers/spec.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/flowspec", [authJwt.checkApiKey, authJwt.verifyToken], controller.getSpecByUserId);
  app.post(
    "/api/flowspec/create",
    [authJwt.checkApiKey, authJwt.verifyToken],
    controller.createFlowSpecRule
  );
  app.put(
    "/api/flowspec/update/:id",
    [authJwt.checkApiKey, authJwt.verifyToken],
    controller.updateFlowSpecRule
  );
  app.delete(
    "/api/flowspec/delete/:id",
    [authJwt.checkApiKey, authJwt.verifyToken],
    controller.removeFlowSpecRule
  );
  app.get(
    "/api/flowspec/:id",
    [authJwt.checkApiKey, authJwt.verifyToken],
    controller.getRuleByIdByUser
  );
};
