require("dotenv").config();
const { addUser } = require("../api/models/users-model");
const { addRecipe } = require("../api/models/recipes-model");
const genToken = require("../api/utils/genToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig");
const {
  validateRegistration,
  validateLogin,
  validateRecipe,
  validateRecipeId,
  auth
} = require("../api/middleware/custom-middleware");

const mockRequest = (body, id, decodedJwt) => ({
  body,
  params: { id },
  decodedJwt
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

beforeAll(async () => {
  await db("users").truncate();
  await db("recipes").truncate();
  await addUser({
    username: "Chris",
    password: bcrypt.hashSync("pass", 10),
    email: "test1@email.com"
  });
  await addRecipe({
    title: "Hamburger",
    source: "Grandma Edna",
    ingredients: "Beef, cheese, lettuce, tomato",
    instructions:
      "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
    category: "Lunch",
    user_id: 1
  });
});

afterAll(async () => {
  await db("users").truncate();
  await db("recipes").truncate();
});

describe("custom-middleware", () => {
  describe("validateRegistration", () => {
    it("should 400 if body is empty", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await validateRegistration(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email, username and password required."
      });
    });

    it("should 400 if username is missing from body", async () => {
      const req = mockRequest({ password: "pass", email: "test1@email.com" });
      const res = mockResponse();

      await validateRegistration(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username required."
      });
    });

    it("should 400 if password is missing from body", async () => {
      const req = mockRequest({ username: "Chris", email: "test1@email.com" });
      const res = mockResponse();

      await validateRegistration(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password required."
      });
    });

    it("should 400 if email is missing from body", async () => {
      const req = mockRequest({ username: "Chris", password: "pass" });
      const res = mockResponse();

      await validateRegistration(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email required."
      });
    });

    it("should call next if username, email, password are in body", async () => {
      const req = mockRequest({
        username: "Chris",
        password: "pass",
        email: "test1@email.com"
      });
      const res = mockResponse();
      const next = jest.fn();

      await validateRegistration(req, res, next);

      expect(req.validUser).toStrictEqual({
        username: "Chris",
        password: "pass",
        email: "test1@email.com"
      });
      expect(next).toHaveBeenCalled();
    });
  });

  describe("validateLogin", () => {
    it("should 400 if body is empty", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await validateLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username and password required."
      });
    });

    it("should 400 if username is missing from body", async () => {
      const req = mockRequest({ password: "pass" });
      const res = mockResponse();

      await validateLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username required."
      });
    });

    it("should 400 if password is missing from body", async () => {
      const req = mockRequest({ username: "Chris" });
      const res = mockResponse();

      await validateLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password required."
      });
    });

    it("should call next if username, password are in body", async () => {
      const req = mockRequest({
        username: "Chris",
        password: "pass"
      });
      const res = mockResponse();
      const next = jest.fn();

      await validateLogin(req, res, next);

      expect(req.validUser).toStrictEqual({
        username: "Chris",
        password: "pass"
      });
      expect(next).toHaveBeenCalled();
    });
  });

  describe("validateRecipe", () => {
    it("should 400 if body is empty", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await validateRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Missing required information."
      });
    });

    it("should 400 if title is missing from the body", async () => {
      const req = mockRequest({
        source: "Grandma Edna",
        ingredients: "Beef, cheese, lettuce, tomato",
        instructions:
          "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Lunch"
      });
      const res = mockResponse();

      await validateRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Title required."
      });
    });

    it("should 400 if source is missing from the body", async () => {
      const req = mockRequest({
        title: "Hamburger",
        ingredients: "Beef, cheese, lettuce, tomato",
        instructions:
          "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Lunch"
      });
      const res = mockResponse();

      await validateRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Source required."
      });
    });

    it("should 400 if ingredients is missing from the body", async () => {
      const req = mockRequest({
        title: "Hamburger",
        source: "Grandma Edna",
        instructions:
          "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Lunch"
      });
      const res = mockResponse();

      await validateRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Ingredients required."
      });
    });

    it("should 400 if instructions is missing from the body", async () => {
      const req = mockRequest({
        title: "Hamburger",
        source: "Grandma Edna",
        ingredients: "Beef, cheese, lettuce, tomato",
        category: "Lunch"
      });
      const res = mockResponse();

      await validateRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Instructions required."
      });
    });

    it("should 400 if category is missing from the body", async () => {
      const req = mockRequest({
        title: "Hamburger",
        source: "Grandma Edna",
        ingredients: "Beef, cheese, lettuce, tomato",
        instructions:
          "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve."
      });
      const res = mockResponse();

      await validateRecipe(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Category required."
      });
    });

    it("should call next if all required properties are in the body", async () => {
      const req = mockRequest({
        title: "Hamburger",
        source: "Grandma Edna",
        ingredients: "Beef, cheese, lettuce, tomato",
        instructions:
          "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Lunch"
      });
      const res = mockResponse();
      const next = jest.fn();

      await validateRecipe(req, res, next);

      expect(req.validRecipe).toStrictEqual({
        title: "Hamburger",
        source: "Grandma Edna",
        ingredients: "Beef, cheese, lettuce, tomato",
        instructions:
          "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
        category: "Lunch"
      });
      expect(next).toHaveBeenCalled();
    });
  });

  describe("auth", () => {
    it("should auth", async () => {
      // todo});
    });
  });

  describe("validateRecipeId", () => {
    it("should 400 if recipe id doesn't exist", async () => {
      const req = mockRequest("", 100);
      const res = mockResponse();

      await validateRecipeId(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should call next if recipe id exists", async () => {
      const token = genToken({ id: 1, username: "Chris" });
      const decodedToken = jwt.decode(token);

      const req = mockRequest("", 1, decodedToken);
      const res = mockResponse();
      const next = jest.fn();

      await validateRecipeId(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
