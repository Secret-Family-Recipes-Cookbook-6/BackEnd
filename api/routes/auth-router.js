const router = require("express").Router();
const Recipes = require("../models/recipes-model");
const {
  validateRecipe,
  validateRecipeId
} = require("../middleware/custom-middleware");

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

router.put(
  "/recipes/:id",
  validateRecipeId,
  validateRecipe,
  async (req, res) => {
    const { decodedJwt, validRecipe } = req;
    const { validRecipeId } = req;

    try {
      await Recipes.updateRecipe(validRecipeId, validRecipe);
      const recipes = await Recipes.findRecipesBy({ user_id: decodedJwt.sub });
      res.status(201).json(recipes);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

router.delete("/recipes/:id", validateRecipeId, async (req, res) => {
  const { decodedJwt } = req;
  const { validRecipeId } = req;

  try {
    const deletedRecipe = await Recipes.findRecipeById(validRecipeId);
    await Recipes.deleteRecipe(validRecipeId);
    const recipes = await Recipes.findRecipesBy({ user_id: decodedJwt.sub });
    res.status(200).json({ deletedRecipe, recipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
