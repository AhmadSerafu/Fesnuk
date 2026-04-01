const router = require("express").Router();
const PostController = require("../controllers/postController");
const LikeController = require("../controllers/likeController");
const CommentController = require("../controllers/commentController");
const { isAuthenticated } = require("../helpers/auth");
const upload = require("../helpers/multer");

router.get("/", isAuthenticated, PostController.postList);

router.get("/create", isAuthenticated, PostController.createPostPage);
router.post(
  "/create",
  isAuthenticated,
  upload.single("image"),
  PostController.createPost,
);

router.get("/:postId", isAuthenticated, PostController.postDetail);
router.post("/:postId/comment", isAuthenticated, CommentController.addComment);

router.post("/:postId/like", isAuthenticated, LikeController.likeToogle);

module.exports = router;
