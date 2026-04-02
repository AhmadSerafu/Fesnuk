const { where } = require("sequelize");
const { User, UserProfile } = require("../models/index");

class ProfileController {
  static async profilePage(req, res) {
    try {
      const currentUser = await User.findByPk(req.session.userId, {
        include: [{ model: UserProfile }],
      });

      if (!currentUser.UserProfile) {
        await UserProfile.create({ UserId: req.session.userId });
        await currentUser.reload({ include: [{ model: UserProfile }] });
      }

      res.render("profilePage", {
        currentUser,
        username: req.session.username || null,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async updateProfile(req, res) {
    try {
      const currentUser = await User.findByPk(req.session.userId, {
        include: [{ model: UserProfile }],
      });
      const { username, fullName, bio } = req.body;

      const profilePicture = req.file
        ? `/uploads/${req.file.filename}`
        : req.body.profilePictureUrl ||
          currentUser.UserProfile.profilePicture ||
          null;

      await User.update({ username }, { where: { id: req.session.userId } });

      await UserProfile.update(
        { fullName, bio, profilePicture },
        { where: { UserId: req.session.userId } },
      );

      req.session.username = username;

      res.redirect("/profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = ProfileController;
