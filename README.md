# Secret Family Recipes Cookbook API

## Getting a Local Server Running

To get a local server running, start by running `yarn install` in your terminal to download all dependencies.

Then run `yarn start` and navigate to "http://localhost:5000/api" in your browser.

## Dependencies

```
express
bcryptjs
cors
dotenv
helmet
jsonwebtoken
knex
knex-cleaner
pg
multer
cloudinary
datauri
```

## Dev Dependencies

```
cross-env
jest
nodemon
sqlite3
supertest
```

## Testing

To run the test suite, run `yarn test` in your terminal.

## Base URL

Use this to prefix the beginning of all requests. Moving forward, all endpoints in the linked documentation will assume the base url has already been input before the endpoint being addressed.

```
https://secret-fam-rc.herokuapp.com/api
```

## Documentation

Full documentation can be found [here](https://documenter.getpostman.com/view/9170928/SzRuZCfA)

## Author

[Chris Vasquez](www.github.com/chrvasq)
