const db = require("../../data/dbConfig");

const findUsers = () => {
  return db("users").select("id", "username");
};

const addUser = async user => {
  const [id] = await db("users").insert(user);
  return findUserById(id);
};

const findUserById = id => {
  return db("users")
    .where({ id })
    .select("id", "username")
    .first();
};

const deleteUser = async id => {
  return db("users")
    .where({ id })
    .del();
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
