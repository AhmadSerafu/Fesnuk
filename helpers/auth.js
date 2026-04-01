const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.role === "admin") {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = { isAuthenticated, isAdmin };
