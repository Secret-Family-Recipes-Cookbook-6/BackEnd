exports.seed = function(knex) {
  return knex("recipes").insert([
    {
      title: "Hamburger",
      source: "Grandma Edna",
      ingredients: "Beef, cheese, lettuce, tomato",
      instructions:
        "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
      category: "Breakfast",
      user_id: 1
    },
    {
      title: "Cheeseburger",
      source: "Grandma Dina",
      ingredients: "Beef, two slices of cheese, lettuce, tomato",
      instructions:
        "Grill the burgers while adding two slices of cheese towards the end. Place on bun with condiments and serve.",
      category: "Lunch",
      user_id: 1
    },
    {
      title: "Veggie Burger",
      source: "Grandma Edna",
      ingredients: "Black beans, cheese, lettuce, tomato",
      instructions:
        "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
      category: "Dinner",
      user_id: 1
    },
    {
      title: "Hamburger",
      source: "Grandma Edna",
      ingredients: "Beef, cheese, lettuce, tomato",
      instructions:
        "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
      category: "Breakfast",
      user_id: 2
    },
    {
      title: "Cheeseburger",
      source: "Grandma Dina",
      ingredients: "Beef, two slices of cheese, lettuce, tomato",
      instructions:
        "Grill the burgers while adding two slices of cheese towards the end. Place on bun with condiments and serve.",
      category: "Lunch",
      user_id: 2
    },
    {
      title: "Veggie Burger",
      source: "Grandma Edna",
      ingredients: "Black beans, cheese, lettuce, tomato",
      instructions:
        "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
      category: "Dinner",
      user_id: 2
    },
    {
      title: "Hamburger",
      source: "Grandma Edna",
      ingredients: "Beef, cheese, lettuce, tomato",
      instructions:
        "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
      category: "Breakfast",
      user_id: 3
    },
    {
      title: "Cheeseburger",
      source: "Grandma Dina",
      ingredients: "Beef, two slices of cheese, lettuce, tomato",
      instructions:
        "Grill the burgers while adding two slices of cheese towards the end. Place on bun with condiments and serve.",
      category: "Lunch",
      user_id: 3
    },
    {
      title: "Veggie Burger",
      source: "Grandma Edna",
      ingredients: "Black beans, cheese, lettuce, tomato",
      instructions:
        "Grill the burgers while adding cheese towards the end. Place on bun with condiments and serve.",
      category: "Dinner",
      user_id: 3
    }
  ]);
};
