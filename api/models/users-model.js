const db = require("../../data/dbConfig");

const findUsers = () => {
  return db("users").select("id", "username");
};

const addUser = async user => {
  const [id] = await db("users").insert(user);
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

const deleteUser = async id => {
  return db("users")
    .where({ id })
    .del();
};

const updateUser = async (id, changes) => {
  await db("users")
    .where({ id })
    .update(changes);

  return findUserById(id);
};

module.exports = {
  findUsers,
  addUser,
  findUserById,
  findUserByUsername,
  deleteUser,
  updateUser
};
