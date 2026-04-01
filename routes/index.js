const router = require("express").Router();
const authRouter = require("./authRouter");
const postRouter = require("./postRouter");

// router.get("/", (req, res) => {
//   res.redirect("/auth/login");
// });

router.get("/", (req, res) => {
  if (req.session.userId) {
    res.redirect("/posts");
  } else {
    res.redirect("/auth/login");
  }
});
router.use("/auth", authRouter);
router.use("/posts", postRouter);

module.exports = router;
