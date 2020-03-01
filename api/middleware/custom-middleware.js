const validateUser = (req, res, next) => {
  const { username, password } = req.body;

  if (Object.keys(req.body).length !== 0) {
    if (username && password) {
      req.validUser = { ...req.body };
      next();
    } else if (!username) {
      res.status(400).json({ message: "Username required." });
    } else if (!password) {
      res.status(400).json({ message: "Password required." });
    }
  } else {
    res.status(400).json({ message: "Username and password required." });
  }
};

const validateRecipe = (req, res, next) => {};

const auth = (req, res, next) => {};

module.exports = {
  validateUser,
  validateRecipe,
  auth
};
