const router = require("express").Router();
const PostController = require("../controllers/postController");
const LikeController = require("../controllers/likeController");
const CommentController = require("../controllers/commentController");
const { isAuthenticated, isAdmin } = require("../helpers/auth");
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

router.get("/:postId/edit", isAuthenticated, PostController.editPostPage);
router.post(
  "/:postId/edit",
  isAuthenticated,
  upload.single("image"),
  PostController.editPost,
);

router.post(
  "/:postId/delete",
  isAuthenticated,
  isAdmin,
  PostController.deletePost,
);

module.exports = router;
