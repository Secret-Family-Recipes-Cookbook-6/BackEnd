const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const { addUser } = require("../api/models/users-model");
const {
  addRecipe,
  findRecipeById,
  findRecipesBy,
  updateRecipe,
  deleteRecipe
} = require("../api/models/recipes-model");

beforeAll(async () => {
  await addUser({
    username: "Chris",
    password: bcrypt.hashSync("pass", 10),
    email: "test1@email.com"
  });
});

beforeEach(async () => {
  await db("recipes").truncate();

  await addRecipe({
    title: "Hamburger",
    source: "Grandma Edna",
    ingredients: "Beef, cheese, lettuce, tomato",
    instructions:
      "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
    category: "Lunch",
    user_id: 1
  });

  await addRecipe({
    title: "Cheeseburger",
    source: "Grandma Edna",
    ingredients: "Beef, cheese, lettuce, tomato",
    instructions:
      "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
    category: "Dinner",
    user_id: 1
  });
});

afterAll(async () => {
  await db("users").truncate();
  await db("recipes").truncate();
});

describe("recipes-model", () => {
  describe("addRecipe", () => {
    it("should add a new recipe", async () => {
      let recipe = await findRecipeById(1);

      expect(recipe).toEqual({
        id: 1,
        image: "",
        title: "Hamburger",
        source: "Grandma Edna",
        ingredients: "Beef, cheese, lettuce, tomato",
        instructions:
          "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Lunch",
        user_id: 1
      });

      recipe = await findRecipeById(2);

      expect(recipe).toEqual({
        id: 2,
        image: "",
        title: "Cheeseburger",
        source: "Grandma Edna",
        ingredients: "Beef, cheese, lettuce, tomato",
        instructions:
          "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Dinner",
        user_id: 1
      });
    });
  });

  describe("findRecipeById", () => {
    it("should return the recipe for the passed in id", async () => {
      const recipe = await findRecipeById(1);

      expect(recipe).toEqual({
        id: 1,
        image: "",
        title: "Hamburger",
        source: "Grandma Edna",
        ingredients: "Beef, cheese, lettuce, tomato",
        instructions:
          "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Lunch",
        user_id: 1
      });
    });
  });

  describe("findRecipesByFilter", () => {
    it("should return array of recipes based on filter passed in", async () => {
      const { category } = { category: "Lunch" };

      const recipes = await findRecipesBy({ category });

      expect(recipes.length).toBe(1);

      const { title } = { title: "Hamburger" };

      const recipes2 = await findRecipesBy({ title });

      expect(recipes2.length).toBe(1);

      const { user_id } = { user_id: 1 };

      const recipe3 = await findRecipesBy({ user_id });

      expect(recipe3.length).toBe(2);
    });
  });

  describe("updateRecipe", () => {
    it("should update the recipe with the passed in values", async () => {
      const changes = {
        image: "veggie-burger.jpg",
        title: "Veggie Burger",
        source: "Grandma Dina",
        ingredients: "Black beans, cheese, lettuce, tomato",
        instructions:
          "Grill the black bean burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Dinner"
      };

      const id = 1;

      await updateRecipe(id, changes);

      const updatedRecipe = await findRecipeById(1);

      expect(updatedRecipe).toEqual({
        id: 1,
        image: "veggie-burger.jpg",
        title: "Veggie Burger",
        source: "Grandma Dina",
        ingredients: "Black beans, cheese, lettuce, tomato",
        instructions:
          "Grill the black bean burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Dinner",
        user_id: 1
      });
    });
  });

  describe("deleteRecipe", () => {
    it("deletes the recipe of the passed in id", async () => {
      const id = 1;

      await deleteRecipe(id);

      const recipe = await findRecipeById(id);

      expect(recipe).toBe(undefined);

      const recipes = await findRecipesBy({ user_id: 1 });

      expect(recipes.length).toBe(1);
    });
  });
});
