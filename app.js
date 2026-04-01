const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

// Setup EJS sebagai template engine
app.set("view engine", "ejs");

// Body Parser untuk handle form data
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(
  session({
    secret: "fesnuk_secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

const router = require("./routes");
app.use(router);
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
