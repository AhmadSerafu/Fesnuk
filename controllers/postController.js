const { Post, User, UserProfile, Comment, Like } = require("../models");

class PostController {
  static async postList(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          { model: User, include: [{ model: UserProfile }] },
          {
            model: Comment,
            include: [{ model: User, include: [{ model: UserProfile }] }],
          },
          { model: Like },
        ],
        order: [["createdAt", "DESC"]],
      });

      const currentUser = await User.findByPk(req.session.userId, {
        include: [{ model: UserProfile }],
      });

      res.render("postList", {
        currentUser,
        posts,
        username: req.session.username || null,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async postDetail(req, res) {
    try {
      const { errorMessages } = req.query;
      const { postId } = req.params;

      const post = await Post.findOne({
        where: {
          id: postId,
        },
        include: [
          { model: User, include: [{ model: UserProfile }] },
          {
            model: Comment,
            include: [{ model: User, include: [{ model: UserProfile }] }],
          },
          { model: Like },
        ],
      });

      const currentUser = await User.findByPk(req.session.userId, {
        include: [{ model: UserProfile }],
      });

      res.render("postDetail", {
        post,
        currentUser,
        username: req.session.username || null,
        errorMessages,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async createPostPage(req, res) {
    try {
      const { errorMessages } = req.query;
      const currentUser = await User.findByPk(req.session.userId, {
        include: [{ model: UserProfile }],
      });

      res.render("createPostPage", {
        currentUser,
        username: req.session.username || null,
        errorMessages,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async createPost(req, res) {
    try {
      const { title, content } = req.body;

      const imageUrl = req.file
        ? `/uploads/${req.file.filename}`
        : req.body.imageUrl || null;

      // console.log(req.session.userId, title, content, imageUrl);

      if (!content && !imageUrl) {
        const errorMessages = "Post harus memiliki konten atau gambar!";
        return res.redirect("/posts/create?errorMessages=" + errorMessages);
      }

      await Post.create({
        UserId: req.session.userId,
        title,
        content,
        imageUrl,
      });

      res.redirect("/");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errorMessages = error.errors[0].message;
        res.redirect(`/posts/create?errorMessages=` + errorMessages);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }
}

module.exports = PostController;
