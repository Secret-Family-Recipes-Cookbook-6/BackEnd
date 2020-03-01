const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const {
  findUsers,
  addUser,
  findUserById,
  findUserByUsername,
  deleteUser,
  updateUser
} = require("../api/models/users-model");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Users model", () => {
  describe("addUser", () => {
    it("should add a new user and return the newly created user", async () => {
      const user = await addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });

      expect(user).toEqual({ id: 1, username: "Chris" });
    });
  });

  describe("findUsers", () => {
    it("should return an array of user objects", async () => {
      await addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });

      const users = await findUsers();

      expect(users).toEqual([{ id: 1, username: "Chris" }]);
    });
  });

  describe("findUserById", () => {
    it("should return the user for the id passed in", async () => {
      await addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });

      const user = await findUserById(1);

      expect(user).toEqual({ id: 1, username: "Chris" });
    });
  });

  describe("deleteUser", () => {
    it("should delete the user for the id passed in", async () => {
      await addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });

      await deleteUser(1);

      const users = await findUserById(1);

      expect(users).toBe(undefined);
    });
  });

  describe("findUserByUsername", () => {
    it("should return user by username", async () => {
      await addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });

      const user = await findUserByUsername("Chris");

      expect(user.username).toBe("Chris");
    });
  });

  describe("updateUser", () => {
    it("should update username and password", async () => {
      await addUser({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });

      const user = await findUserByUsername("Chris");

      expect(user.username).toBe("Chris");
      expect(bcrypt.compareSync("pass", user.password)).toBe(true);

      const changes = {
        username: "Mike",
        password: bcrypt.hashSync("newpass", 10)
      };

      await updateUser(1, changes);

      const updatedUser = await findUserByUsername("Mike");

      expect(updatedUser.username).toEqual("Mike");
      expect(bcrypt.compareSync("newpass", updatedUser.password)).toBe(true);
    });
  });
});
