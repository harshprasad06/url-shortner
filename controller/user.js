const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log("user", user);
  if (!user)
    return res.render("login", {
      error: "Invaild Username or Password",
    });
  const token = setUser(user);
  // res.cookie("uid", token);
  return res.json({token});
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
