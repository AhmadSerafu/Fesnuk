"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, {
        foreignKey: "PostId",
      });
      this.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      this.hasMany(models.Like, {
        foreignKey: "PostId",
      });
      this.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: "PostId",
        as: "LikedBy",
      });
    }
  }
  Post.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Judul tidak boleh kosong!",
          },
          notNull: {
            args: true,
            msg: "Judul tidak boleh kosong!",
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Post",
    },
  );
  return Post;
};
