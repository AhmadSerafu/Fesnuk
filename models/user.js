"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UserProfile, {
        foreignKey: "UserId",
      });

      this.hasMany(models.Post, {
        foreignKey: "UserId",
      });

      this.hasMany(models.Comment, {
        foreignKey: "UserId",
      });

      this.belongsToMany(models.Post, {
        through: models.Like,
        foreignKey: "UserId",
        as: "LikedPosts",
      });

      this.belongsToMany(models.User, {
        through: models.Follow,
        foreignKey: "followingId",
        as: "Followers",
      });

      this.belongsToMany(models.User, {
        through: models.Follow,
        foreignKey: "followerId",
        as: "Following",
      });
    }

    static async getUserList() {
      const { UserProfile } = require("../models");

      return await User.findAll({
        where: { role: "user" },
        include: [{ model: UserProfile }],
        attributes: ["id", "username"],
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { args: true, msg: "Username tidak boleh kosong!" },
          notEmpty: {
            args: true,
            msg: "Username tidak boleh berupa string kosong!",
          },
          is: {
            args: /^\S+$/,
            msg: "Username tidak boleh mengandung spasi!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { args: true, msg: "Email tidak boleh kosong!" },
          notEmpty: {
            args: true,
            msg: "Email tidak boleh berupa string kosong!",
          },
          isEmail: { args: true, msg: "Gunakan format email yang benar!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Password tidak boleh kosong!" },
          notEmpty: {
            args: true,
            msg: "Password tidak boleh berupa string kosong!",
          },
        },
      },
      role: DataTypes.ENUM("admin", "user"),
    },
    {
      hooks: {
        beforeCreate: async (user, option) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
