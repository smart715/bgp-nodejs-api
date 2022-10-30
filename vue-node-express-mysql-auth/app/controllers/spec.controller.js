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
  const {
    uuid,
    details,
    status,
    destinationPrefix,
    sourcePrefix,
    ipProtocol,
    sourcePort,
    destinationPort,
    ICMPType,
    ICMPCode,
    TCPflags,
    packetLength,
    DSCP,
    FREncoding,
  } = req.body;
  console.log(req.userId);
  try {
    const newSpecRule = await FlowSpec.create({
      uuid,
      details,
      status,
      prefix: destinationPrefix,
      sourcePrefix,
      ipProtocol,
      sourcePort,
      destinationPort,
      ICMPType,
      ICMPCode,
      TCPflags,
      packetLength,
      DSCP,
      FREncoding,
      created_by: req.userId,
      last_updated_by: req.userId,
      userId: req.userId,
    });
    return res.status(200).send({ rule: newSpecRule });
  } catch (err) {
    console.log("error", err);
  }
};
exports.removeFlowSpecRule = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const response = await FlowSpec.destroy({
    where: { id: id },
  });
  if (response) return res.status(200).send({ message: "Success" });
  return res.status(200).send({ message: "error" });
};
