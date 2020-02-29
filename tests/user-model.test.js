const db = require("../data/dbConfig");
const Users = require("../api/users/users-model");
const bcrypt = require("bcryptjs");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Users model", () => {
  describe("findUsers", () => {
    beforeEach(async () => {
      await Users.addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });
    });

    it("should return an array of user objects", async () => {
      const users = await Users.findUsers();

      expect(users).toEqual([{ id: 1, username: "Chris" }]);
    });
  });

  describe("addUser", () => {
    it("should add a new user and return the newly created user", async () => {
      const user = await Users.addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });

      expect(user).toEqual({ id: 1, username: "Chris" });
    });
  });

  describe("findUserById", () => {
    beforeEach(async () => {
      await Users.addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });
    });

    it("should return the user for the id passed in", async () => {
      const user = await Users.findUserById(1);

      expect(user).toEqual({ id: 1, username: "Chris" });
    });
  });

  describe("deleteUser", () => {
    beforeEach(async () => {
      await Users.addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });
    });

    it("should delete the user for the id passed in", async () => {
      await Users.deleteUser(1);
      const users = await Users.findUserById(1);

      expect(users).toBe(undefined);
    });
  });
});
