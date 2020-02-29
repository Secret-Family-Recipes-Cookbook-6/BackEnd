# Secret Family Recipes Cookbook API

## Getting a Local Server Running

To get a local server running, start by running `yarn install` in your terminal to download all dependencies.

Then run `yarn start` and navigate to "http://localhost:5000/api" in your browser.

## Dependencies

```
- express
- bcryptjs
- cors
- dotenv
- helmet
- jsonwebtoken
- knex
- knex-cleaner
- pg
```

## Dev Dependencies

```
- cross-env
- jest
- nodemon
- sqlite3
- supertest
```

## Testing

To run the test suite, run `yarn test` in your terminal.

## Deployed URL

Base URL: https://secret-fam-rc.herokuapp.com/api

### GET Dummy Data /data

```
[
    {
        id: "integer",
        title: "string",
        source: "string",
        ingredients: "string",
        category: "string"
    }
]
```

## Documentation

TODO

## Author

[Chris Vasquez](www.github.com/chrvasq)
