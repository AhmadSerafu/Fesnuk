const router = require("express").Router();
const ProfileController = require("../controllers/profileController");
const { isAuthenticated } = require("../helpers/auth");
const upload = require("../helpers/multer");

router.get("/", isAuthenticated, ProfileController.profilePage);
router.post(
  "/",
  isAuthenticated,
  upload.single("profilePicture"),
  ProfileController.updateProfile,
);

module.exports = router;
