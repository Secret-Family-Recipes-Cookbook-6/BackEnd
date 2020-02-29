const db = require("../../data/dbConfig");

const findUsers = () => {
  return db("users").select("id", "username");
};

const addUser = async user => {
  try {
    const newUser = await db("users").insert(user);
    return newUser; // todo  return findUserById
  } catch (err) {
    return null;
  }
};

const findUserById = id => {
  return null;
};

const deleteUser = id => {
  return null;
};

const updateUser = (id, changes) => {
  return null;
};

module.exports = {
  findUsers,
  addUser,
  findUserById,
  deleteUser,
  updateUser
};
