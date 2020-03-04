const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const { findRecipeById } = require("../models/recipes-model");

const validateUser = (req, res, next) => {
  const { username, password, email } = req.body;

  if (Object.keys(req.body).length !== 0) {
    if (username && password && email) {
      req.validUser = { ...req.body };
      next();
    } else if (!username) {
      res.status(400).json({ message: "Username required." });
    } else if (!password) {
      res.status(400).json({ message: "Password required." });
    } else if (!email) {
      res.status(400).json({ message: "Email required." });
    }
  } else {
    res.status(400).json({ message: "Username and password required." });
  }
};

const validateRecipe = (req, res, next) => {
  const { title, source, ingredients, instructions, category } = req.body;

  if (Object.keys(req.body).length !== 0) {
    if (title && source && ingredients && instructions && category) {
      req.validRecipe = { ...req.body };
      next();
    } else if (!title) {
      res.status(400).json({ message: "Title required." });
    } else if (!source) {
      res.status(400).json({ message: "Source required." });
    } else if (!ingredients) {
      res.status(400).json({ message: "Ingredients required." });
    } else if (!instructions) {
      res.status(400).json({ message: "Instructions required." });
    } else if (!category) {
      res.status(400).json({ message: "Category required." });
    }
  } else {
    res.status(400).json({ message: "Missing required information." });
  }
};

const validateRecipeId = async (req, res, next) => {
  const { decodedJwt } = req;
  const { id } = req.params;

  try {
    const recipe = await findRecipeById(id);
    recipe
      ? recipe.user_id === decodedJwt.sub
        ? ((req.validRecipeId = recipe.id), next())
        : res.status(401).json({
            message: `Not authorized to touch a recipe that is not yours.`
          })
      : res.status(400).json({ message: `Recipe id ${id} not found.` });
  } catch (err) {
    res.status(500).json(err);
  }
};

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, jwtSecret, (err, decodedJwt) => {
      if (err) {
        res.status(401).json({ message: "Couldn't verify token." });
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Not authorized." });
  }
};

module.exports = {
  validateUser,
  validateRecipe,
  validateRecipeId,
  auth
};
