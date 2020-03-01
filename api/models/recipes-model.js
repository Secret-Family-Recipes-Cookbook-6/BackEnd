const db = require("../../data/dbConfig");

const addRecipe = async recipe => {
  const [id] = await db("recipes").insert(recipe);

  return findRecipeById(id);
};

const findRecipeById = id => {
  return db("recipes")
    .where({ id })
    .first();
};

const findRecipesBy = filter => {
  return db("recipes").where(filter);
};

const updateRecipe = (id, changes) => {
  return db("recipes")
    .where({ id })
    .update(changes);
};

const deleteRecipe = id => {
  return db("recipes")
    .where({ id })
    .del();
};

module.exports = {
  addRecipe,
  findRecipeById,
  findRecipesBy,
  updateRecipe,
  deleteRecipe
};
