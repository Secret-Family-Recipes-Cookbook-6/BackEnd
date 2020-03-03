const db = require("../../data/dbConfig");

const findUsers = () => {
  return db("users").select("id", "username");
};

const addUser = async user => {
  const [id] = await db("users")
    .insert(user)
    .returning("id");

  return findUserById(id);
};

const findUserByUsername = username => {
  return db("users")
    .where({ username })
    .first();
};

const findUserById = id => {
  return db("users")
    .where({ id })
    .select("id", "username")
    .first();
};

const deleteUser = id => {
  return db("users")
    .where({ id })
    .del();
};

const updateUser = (id, changes) => {
  return db("users")
    .where({ id })
    .update(changes);
};

module.exports = {
  findUsers,
  addUser,
  findUserById,
  findUserByUsername,
  deleteUser,
  updateUser
};
