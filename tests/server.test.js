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
        .send({ username: "Chris", password: "pass" });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeTruthy();
      expect(res.body.recipes).toBeTruthy();
    });
  });
});
