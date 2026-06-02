import { describe, expect, it } from "vitest";
import { closePlan, coverageMatrix, gapRegister, payload, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the diligence summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the gap register view", () => {
    expect(gapRegister().length).toBeGreaterThan(0);
  });

  it("returns the coverage matrix view", () => {
    expect(coverageMatrix().length).toBeGreaterThan(0);
  });

  it("returns the close plan view", () => {
    expect(closePlan().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
