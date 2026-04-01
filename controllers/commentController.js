const { Post, Comment, Like, User, UserProfile } = require("../models/index");

class CommentController {
  static async addComment(req, res) {
    const { postId } = req.params;
    try {
      const { content } = req.body;
      const { userId } = req.session;

      await Comment.create({
        UserId: userId,
        PostId: postId,
        content,
      });

      res.redirect(`/posts/${postId}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errorMessages = error.errors[0].message;
        res.redirect(`/posts/${postId}?errorMessages=` + errorMessages);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }
}

module.exports = CommentController;
