const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users")
    .truncate()
    .then(() => {
      return knex("users").insert({
        username: "Chris",
        password: bcrypt.hashSync("pass", 10)
      });
    });
};
