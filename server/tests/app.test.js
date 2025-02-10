const request = require("supertest");
const app = require("../server"); // ✅ Import the Express app without starting the server

describe("GET /", () => {
  it("should return a success message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "🚀 Server is running smoothly...");
  });
});

describe("GET /api-docs", () => {
    it("should follow redirect and return Swagger UI", async () => {
      const res = await request(app).get("/api-docs").redirects(1); // Follow redirect
      expect(res.statusCode).toEqual(200);
      expect(res.headers["content-type"]).toMatch(/html/);
    });
  });
  

describe("GET /non-existent-route", () => {
  it("should return a 404 error", async () => {
    const res = await request(app).get("/non-existent-route");
    expect(res.statusCode).toEqual(404);
  });
});

describe("GET /metrics", () => {
  it("should return Prometheus metrics", async () => {
    const res = await request(app).get("/metrics");
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toMatch(/text\/plain/); // Prometheus metrics are plain text
  });
});
