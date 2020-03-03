const {
  validateUser,
  validateRecipe,
  auth
} = require("../api/middleware/custom-middleware");

const mockRequest = body => ({ body });

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

describe("custom-middleware", () => {
  describe("validateUser", () => {
    it("should 400 if body is empty", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await validateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username and password required."
      });
    });

    it("should 400 if username is missing from body", async () => {
      const req = mockRequest({ password: "pass" });
      const res = mockResponse();

      await validateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username required."
      });
    });

    it("should 400 if password is missing from body", async () => {
      const req = mockRequest({ username: "Chris" });
      const res = mockResponse();

      await validateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password required."
      });
    });

    it("should call next if username and password are in body", async () => {
      const req = mockRequest({ username: "Chris", password: "pass" });
      const res = mockResponse();
      const next = jest.fn();

      await validateUser(req, res, next);

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
  }); // todo Add auth middleware tests
});
