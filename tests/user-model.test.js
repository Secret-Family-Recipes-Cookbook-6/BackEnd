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
  await addUser({
    username: "Chris",
    password: bcrypt.hashSync("pass", 10),
    email: "test1@email.com"
  });
});

afterAll(async () => {
  await db("users").truncate();
});

describe("users-model", () => {
  describe("addUser", () => {
    it("should add a new user", async () => {
      const users = await findUsers();

      expect(users.length).toEqual(1);
    });
  });

  describe("findUsers", () => {
    it("should return an array of user objects", async () => {
      const users = await findUsers();

      expect(users).toEqual([
        { id: 1, username: "Chris", email: "test1@email.com" }
      ]);
    });
  });

  describe("findUserById", () => {
    it("should return the user for the id passed in", async () => {
      const user = await findUserById(1);

      expect(user).toEqual({
        id: 1,
        username: "Chris",
        email: "test1@email.com"
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete the user for the id passed in", async () => {
      await deleteUser(1);

      const users = await findUserById(1);

      expect(users).toBe(undefined);
    });
  });

  describe("findUserByUsername", () => {
    it("should return user by username", async () => {
      const user = await findUserByUsername("Chris");

      expect(user.username).toBe("Chris");
    });
  });

  describe("updateUser", () => {
    it("should update username and password", async () => {
      const user = await findUserByUsername("Chris");

      expect(user.username).toBe("Chris");
      expect(bcrypt.compareSync("pass", user.password)).toBe(true);

      const changes = {
        username: "Mike",
        email: "test2@email.com",
        password: bcrypt.hashSync("newpass", 10)
      };

      await updateUser(1, changes);

      const updatedUser = await findUserByUsername("Mike");

      expect(updatedUser.username).toEqual("Mike");
      expect(updatedUser.email).toEqual("test2@email.com");
      expect(bcrypt.compareSync("newpass", updatedUser.password)).toBe(true);
    });
  });
});
