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
  app.get(
    "/api/test/flowspec",
    [authJwt.verifyToken],
    controller.getSpecByUserId
  );
  app.post(
    "/api/test/flowspec/create",
    [authJwt.verifyToken],
    controller.createFlowSpecRule
  );
  app.delete(
    "/api/test/flowspec/delete/:id",
    [authJwt.verifyToken],
    controller.removeFlowSpecRule
  );
};
