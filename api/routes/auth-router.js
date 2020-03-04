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

router.put("/recipes/:id", validateRecipe, async (req, res) => {
  const { decodedJwt, validRecipe } = req;
  const { id } = req.params;

  try {
    await Recipes.updateRecipe(id, validRecipe);

    const recipes = await Recipes.findRecipesBy({ user_id: decodedJwt.sub });
    res.status(201).json(recipes);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/recipes/:id", async (req, res) => {
  const { decodedJwt } = req;
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipes.findRecipeById(id);
    await Recipes.deleteRecipe(id);
    const recipes = await Recipes.findRecipesBy({ user_id: decodedJwt.sub });
    res.status(200).json({ deletedRecipe, recipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
