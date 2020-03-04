require("dotenv").config();
const genToken = require("../api/utils/genToken");
const jwt = require("jsonwebtoken");

describe("genToken", () => {
  it("returns a JWT token", () => {
    user = {
      id: 1,
      username: "Chris"
    };
    const token = genToken(user);

    const tokenDecoded = jwt.decode(token);

    expect(tokenDecoded.sub).toBe(1);
    expect(tokenDecoded.username).toBe("Chris");
  });
});
