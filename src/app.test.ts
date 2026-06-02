import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("due-diligence-gap-atlas app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Due Diligence Gap Atlas");
  });

  it("serves the gap register route", async () => {
    const response = await request(app).get("/gap-register");
    expect(response.status).toBe(200);
  });

  it("serves the coverage matrix route", async () => {
    const response = await request(app).get("/coverage-matrix");
    expect(response.status).toBe(200);
  });

  it("serves the close plan route", async () => {
    const response = await request(app).get("/close-plan");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });

  it("serves the gap register API", async () => {
    const response = await request(app).get("/api/gap-register");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the coverage matrix API", async () => {
    const response = await request(app).get("/api/coverage-matrix");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
