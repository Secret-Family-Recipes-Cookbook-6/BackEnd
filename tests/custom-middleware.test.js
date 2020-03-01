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

const next = jest.fn();

describe("custom-middleware", () => {
  describe("validateUser", () => {
    it("should 400 if username and password are missing from body", async () => {
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

      await validateUser(req, res, next);

      expect(req.validUser).toStrictEqual({
        username: "Chris",
        password: "pass"
      });
      expect(next).toHaveBeenCalled();
    });
  });
});
