const bcrypt = require("bcryptjs");
const { User } = require("../models/index");

class AuthController {
  static async loginPage(req, res) {
    try {
      const { errorMessages } = req.query;
      res.render("loginPage", { errorMessages });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.redirect("/auth/login?errorMessages=Email tidak ditemukan!");
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return res.redirect("/auth/login?errorMessages=Password Salah!");
      }

      req.session.userId = user.id;
      req.session.role = user.role;
      req.session.username = user.username;

      res.redirect("/posts");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async registerPage(req, res) {
    try {
      const { errorMessages } = req.query;
      res.render("registerPage", { errorMessages });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      // console.log(username, email, password);

      await User.create({
        username,
        email,
        password,
      });

      res.redirect("/auth/login");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errorMessages = error.errors[0].message;
        res.redirect("/auth/register?errorMessages=" + errorMessages);
      } else if (error.name === "SequelizeUniqueConstraintError") {
        const errorMessages = "Email atau Username sudah digunakan!";
        res.redirect("/auth/register?errorMessages=" + errorMessages);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy();
      res.redirect("/auth/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = AuthController;
