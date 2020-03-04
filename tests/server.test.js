require("dotenv").config();
const request = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db("users").truncate();
  await db("recipes").truncate();
});

afterAll(async () => {
  await db("users").truncate();
  await db("recipes").truncate();
});

describe("server", () => {
  it("should be running", async () => {
    const res = await request(server).get("/api");

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ api: "up" });
  });

  it("should be the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("/register", () => {
    it("should return 201 status, newUser, token on successful register", async () => {
      const res = await request(server)
        .post("/api/register")
        .send({
          username: "Chris",
          email: "test1@email.com",
          password: "pass"
        });

      expect(res.status).toBe(201);
      expect(res.body.newUser).toBeTruthy();
      expect(res.body.token).toBeTruthy();
    });
  });

  describe("/login", () => {
    it("should return 200 status, recipes, token on successful login", async () => {
      const res = await request(server)
        .post("/api/login")
        .send({
          username: "Chris",
          email: "test1@email.com",
          password: "pass"
        });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeTruthy();
      expect(res.body.recipes).toBeTruthy();
    });
  });

  describe("/auth", () => {
    describe("GET /recipes", () => {
      it("should require auth", async () => {
        const res = await request(server).get("/api/auth/recipes");

        expect(res.status).toBe(401);
      });

      it("should return 200 status and recipes for logged in user", async () => {
        await request(server)
          .post("/api/login")
          .send({
            username: "Chris",
            email: "test1@email.com",
            password: "pass"
          })
          .then(async user => {
            const token = user.body.token;

            const res = await request(server)
              .get("/api/auth/recipes")
              .set({ Authorization: token });

            expect(res.status).toBe(200);
          });
      });
    });
  });
});
