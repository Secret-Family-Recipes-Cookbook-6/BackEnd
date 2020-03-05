const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = user => {
  payload = {
    sub: user.id,
    username: user.username
  };
  options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
};
