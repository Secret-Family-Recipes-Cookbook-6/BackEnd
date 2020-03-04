const router = require("express").Router();
const Recipes = require("../models/recipes-model");
const { validateRecipe } = require("../middleware/custom-middleware");

router.get("/recipes", async (req, res) => {
  const { decodedJwt } = req;

  try {
    const recipes = await Recipes.findRecipesBy({
      user_id: decodedJwt.sub
    });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/recipes", validateRecipe, async (req, res) => {
  const { decodedJwt, validRecipe } = req;

  try {
    await Recipes.addRecipe({
      ...validRecipe,
      user_id: decodedJwt.sub
    });
    const recipes = await Recipes.findRecipesBy({ user_id: decodedJwt.sub });
    res.status(201).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
