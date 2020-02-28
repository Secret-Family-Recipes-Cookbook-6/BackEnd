const router = require("express").Router();

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

module.exports = router;
