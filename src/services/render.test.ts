import { describe, expect, it } from "vitest";
import {
  renderClosePlan,
  renderCoverageMatrix,
  renderDocs,
  renderGapAtlasOverview,
  renderGapRegister,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderGapAtlasOverview()).toContain("Due Diligence Gap Atlas");
  });

  it("renders the gap register route", () => {
    expect(renderGapRegister()).toContain("/gap-register");
  });

  it("renders the coverage matrix route", () => {
    expect(renderCoverageMatrix()).toContain("/coverage-matrix");
  });

  it("renders the close plan route", () => {
    expect(renderClosePlan()).toContain("Close plan");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic diligence packet data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
