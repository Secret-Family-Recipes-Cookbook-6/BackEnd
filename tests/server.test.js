const request = require("supertest");
const server = require("../api/server");

describe("server", () => {
  it("should be running", async () => {
    const res = await request(server).get("/api");

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ api: "up" });
  });

  it("should be the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});
