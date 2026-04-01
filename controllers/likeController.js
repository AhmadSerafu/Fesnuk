const { Like } = require("../models");

class LikeController {
  static async likeToogle(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.session.userId;
      const isLiked = await Like.findOne({
        where: {
          PostId: postId,
          UserId: userId,
        },
      });

      if (isLiked) {
        await isLiked.destroy();
      } else {
        await Like.create({
          PostId: postId,
          UserId: userId,
        });
      }

      res.redirect(`/posts#post-${postId}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = LikeController;
