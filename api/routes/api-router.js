const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/users-model");
const jwt = require("jsonwebtoken");
const genToken = require("../utils/genToken");

const {
  validateRecipe,
  validateUser,
  auth
} = require("../middleware/custom-middleware");

const data = [
  {
    id: 1,
    title: "Cheese Burger",
    source: "Grandma Ethel",
    ingredients: "Cheese, ground beef, hamburger bun, lettuce, tomato",
    instructions:
      "Make the beef patties. Then grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
    category: "Dinner"
  },
  {
    title: "Veggie Burger",
    source: "Grandma Ethel",
    ingredients: "Cheese, black bean patty, hamburger bun, lettuce, tomato",
    instructions:
      "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
    category: "Lunch"
  },
  {
    title: "Hamburger",
    source: "Grandma Ethel",
    ingredients: "Ground beef, hamburger bun, lettuce, tomato",
    instructions:
      "Make the beef patties. Then grill the burgers. Place on bun with condiments and serve.",
    category: "Dinner"
  }
];

router.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

router.get("/data", (req, res) => {
  res.status(200).json(data);
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

module.exports = router;
