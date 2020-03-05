const router = require("express").Router();
const Recipes = require("../models/recipes-model");
// image upload module
const multer = require("multer");
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

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

router.post(
  "/recipes",
  upload.single("image"),
  validateRecipe,
  async (req, res) => {
    const { decodedJwt, validRecipe } = req;

    try {
      // check if file exists
      if (req.file) {
        await Recipes.addRecipe({
          ...validRecipe,
          image: req.file.path,
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
  }
);

router.put(
  "/recipes/:id",
  upload.single("image"),
  validateRecipeId,
  validateRecipe,
  async (req, res) => {
    const { decodedJwt, validRecipe } = req;
    const { validRecipeId } = req;

    try {
      // check if  file exists
      if (req.file) {
        await Recipes.updateRecipe(validRecipeId, {
          ...validRecipe,
          image: req.file.path
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
