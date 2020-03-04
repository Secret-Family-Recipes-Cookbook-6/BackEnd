const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/users-model");
const Recipes = require("../models/recipes-model");
const genToken = require("../utils/genToken");
const { validateUser, auth } = require("../middleware/custom-middleware");
const authRouter = require("./auth-router");

router.use("/auth", auth, authRouter);

router.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

router.post("/register", validateUser, async (req, res) => {
  const { validUser } = req;

  const hash = bcrypt.hashSync(validUser.password, 10);

  validUser.password = hash;

  try {
    const newUser = await Users.addUser(validUser);
    const token = genToken(newUser);
    res.status(201).json({ newUser, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", validateUser, async (req, res) => {
  const { username, password } = req.validUser;

  try {
    const user = await Users.findUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const recipes = await Recipes.findRecipesBy({ user_id: user.id });
      const token = genToken(user);
      res.status(200).json({ token, recipes });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
