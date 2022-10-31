const db = require("../models");
const FlowSpec = db.flowspec;
const Op = db.Sequelize.Op;
exports.getSpecByUserId = async (req, res) => {
  const { currentPage, perPage, text } = req.query;
  const { count, rows } = await FlowSpec.findAndCountAll({
    where: {
      userId: req.userId,
      details: {
        [Op.substring]: text,
      },
    },
    offset: (parseInt(currentPage) - 1) * parseInt(perPage),
    limit: parseInt(perPage),
    attributes: [
      "id",
      "uuid",
      "details",
      "status",
      "destinationPrefix",
      "sourcePrefix",
      "ipProtocol",
      "sourcePort",
      "destinationPort",
      "ICMPType",
      "ICMPCode",
      "TCPflags",
      "packetLength",
      "DSCP",
      "FREncoding",
    ],
  });
  return res
    .status(200)
    .send({ specRules: rows, total: count, per_page: perPage });
};
exports.createFlowSpecRule = async (req, res) => {
  const rule = { ...req.body };
  try {
    rule.userId = req.userId;
    rule.created_by = req.userId;
    rule.last_updated_by = req.userId;
    const newSpecRule = await FlowSpec.create(rule);
    return res.status(200).send({ rule: newSpecRule });
  } catch (err) {
    console.log("error", err);
  }
};

exports.updateFlowSpecRule = async (req, res) => {
  const rule = { ...req.body };
  try {
    rule.updatedAt = new Date();
    const [newRule, created] = await FlowSpec.upsert(rule);
    if (newRule) return res.status(200).send({ rule: newRule });
  } catch (err) {
    console.log("error", err);
  }
};

exports.removeFlowSpecRule = async (req, res) => {
  const id = req.params.id;
  const response = await FlowSpec.destroy({
    where: { id: id },
  });
  if (response) return res.status(200).send({ message: "Success" });
  return res.status(200).send({ message: "error" });
};

exports.getRuleByIdByUser = async (req, res) => {
  const id = req.params.id;
  const response = await FlowSpec.findOne({
    where: { id, userId: req.userId },
  });
  if (response) return res.status(200).send({ rule: response });
  return res.status(200).send({ message: "error" });
};
