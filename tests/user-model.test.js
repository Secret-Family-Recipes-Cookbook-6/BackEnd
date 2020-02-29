const db = require("../data/dbConfig");
const Users = require("../api/users/users-model");
const bcrypt = require("bcryptjs");

beforeEach(async () => {
  await db("users").truncate();
  await Users.addUser({
    username: "Chris",
    password: bcrypt.hashSync("pass", 10)
  });
});

describe("Users model", () => {
  describe("findUsers", () => {
    it("should return an array of user objects", async () => {
      const users = await Users.findUsers();

      expect(users).toEqual([{ id: 1, username: "Chris" }]);
    });
  });

  describe("addUser", () => {
    it("should add a new user", async () => {
      const users = await Users.findUsers();

      expect(users.length).toBe(1);
    });

    it("should not add a duplicate user", async () => {
      const newUser = await Users.addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });

      expect(newUser).toBe(null);
    });
  });
});
