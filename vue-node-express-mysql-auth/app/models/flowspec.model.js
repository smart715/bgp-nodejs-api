module.exports = (sequelize, Sequelize) => {
  const FlowSpec = sequelize.define("flowspec", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: Sequelize.INTEGER,
    },
    details: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("active", "inactive"),
    },
    created_by: {
      type: Sequelize.INTEGER,
    },
    last_updated_by: {
      type: Sequelize.INTEGER,
    },
    destinationPrefix: {
      type: Sequelize.STRING,
    },
    sourcePrefix: {
      type: Sequelize.STRING,
    },
    ipProtocol: {
      type: Sequelize.STRING,
    },
    sourcePort: {
      type: Sequelize.INTEGER,
    },
    destinationPort: {
      type: Sequelize.INTEGER,
    },
    ICMPType: {
      type: Sequelize.STRING,
    },
    ICMPCode: {
      type: Sequelize.INTEGER,
    },
    TCPflags: {
      type: Sequelize.STRING,
    },
    packetLength: {
      type: Sequelize.INTEGER,
    },
    DSCP: {
      type: Sequelize.STRING,
    },
    FREncoding: {
      type: Sequelize.STRING,
    },
  });
  return FlowSpec;
};
