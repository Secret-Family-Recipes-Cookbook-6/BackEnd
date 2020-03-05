const router = require("express").Router();
const Recipes = require("../models/recipes-model");
const { multerUploads, dataUri } = require("../middleware/multer");
const { uploader } = require("../config/cloudinaryConfig");
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

router.post("/recipes", multerUploads, validateRecipe, async (req, res) => {
  const { decodedJwt, validRecipe } = req;

  try {
    // check if file exists
    if (req.file) {
      const file = dataUri(req).content;
      const image = await uploader.upload(file);
      await Recipes.addRecipe({
        ...validRecipe,
        image: image.url,
        user_id: decodedJwt.sub
      });
    } else {
      await Recipes.addRecipe({
        ...validRecipe,
        user_id: decodedJwt.sub
      });
    }
    const recipes = await Recipes.findRecipesBy({ user_id: decodedJwt.sub });
    res.status(201).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(
  "/recipes/:id",
  multerUploads,
  validateRecipeId,
  validateRecipe,
  async (req, res) => {
    const { decodedJwt, validRecipe } = req;
    const { validRecipeId } = req;

    try {
      // check if  file exists
      if (req.file) {
        const file = dataUri(req).content;
        const image = await uploader.upload(file);
        await Recipes.updateRecipe(validRecipeId, {
          ...validRecipe,
          image: image.url
        });
      } else {
        await Recipes.updateRecipe(validRecipeId, validRecipe);
      }
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
