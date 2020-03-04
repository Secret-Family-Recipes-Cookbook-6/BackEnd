exports.up = function(knex) {
  return knex.schema
    .createTable("users", user => {
      user.increments();
      user
        .string("username", 255)
        .notNullable()
        .unique();
      user
        .string("email", 255)
        .notNullable()
        .unique();
      user.string("password", 255).notNullable();
    })
    .createTable("recipes", recipe => {
      recipe.increments();
      recipe.string("title", 255).notNullable();
      recipe.string("source", 255).notNullable();
      recipe.string("ingredients", 255).notNullable();
      recipe.string("instructions", 255).notNullable();
      recipe.string("category", 255).notNullable();
      recipe.string("image", 255).defaultTo("");
      recipe
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes").dropTableIfExists("users");
};
