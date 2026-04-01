"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Post, {
        foreignKey: "PostId",
      });

      this.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Comment.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Tidak ada komentar yang dikirim!",
          },
          notEmpty: {
            args: true,
            msg: "Tidak ada komentar yang dikirim!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    },
  );
  return Comment;
};
