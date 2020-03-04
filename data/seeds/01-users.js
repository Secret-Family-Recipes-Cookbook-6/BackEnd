const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users").insert({
    username: "Chris",
    email: "test1@email.com",
    password: bcrypt.hashSync("pass", 10)
  });
};
