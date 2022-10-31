module.exports = (sequelize, Sequelize) => {
  const FlowSpec = sequelize.define("flowspec", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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
    is_blocked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    rate_limit: {
      type: Sequelize.DECIMAL,
    },
  });
  return FlowSpec;
};
