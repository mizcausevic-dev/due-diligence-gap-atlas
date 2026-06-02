import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleDueDiligenceGapAtlas } from "../src/data/sampleVerticalBrief.js";
import type { DueDiligenceGapAtlasItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleDueDiligenceGapAtlas, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(sampleDueDiligenceGapAtlas.length);
  });

  it("counts critical gaps", () => {
    const report = analyze(sampleDueDiligenceGapAtlas, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.criticalGaps).toBeGreaterThan(0);
  });

  it("counts blocked packets", () => {
    const report = analyze(sampleDueDiligenceGapAtlas, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.blockedPackets).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleDueDiligenceGapAtlas, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(154);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleDueDiligenceGapAtlas, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.items).toBe(0);
    expect(report.summary.averageCoverage).toBe(0);
    expect(report.summary.leadingMessage).toContain("strong enough");
  });

  it("hits low and medium diligence branches explicitly", () => {
    const fixtures: DueDiligenceGapAtlasItem[] = [
      {
        id: "low-branch",
        lane: "Healthy packet",
        track: "PROCUREMENT",
        action: "CLOSE",
        packetName: "Healthy packet",
        boardQuestion: "Can this packet close cleanly?",
        owner: "Trust owner",
        audience: "Board growth committee",
        currentPosture: "Stable.",
        requestedAssertion: "Packet is ready.",
        gapHeadline: "Evidence is aligned.",
        gapSignal: "No visible issue.",
        missingEvidence: "None",
        evidenceMoves: ["keep packet current"],
        relatedSurfaces: ["procurement.kineticgain.com"],
        companyTags: ["Google"],
        coverageScore: 86,
        freshnessDays: 9,
        ownerReadinessScore: 82,
        requestCriticalityScore: 40,
        blockerCount: 0,
        valueAtStakeMillions: 5,
        headline: "Healthy packet.",
        narrative: "Low branch test.",
        nextMove: "Keep the packet current."
      },
      {
        id: "medium-branch",
        lane: "Watch packet",
        track: "IDENTITY",
        action: "REFRESH",
        packetName: "Watch packet",
        boardQuestion: "Where does the packet start aging?",
        owner: "Security owner",
        audience: "Audit committee",
        currentPosture: "Watch state.",
        requestedAssertion: "Controls are consistent.",
        gapHeadline: "Evidence is aging.",
        gapSignal: "One small blocker.",
        missingEvidence: "Recent control export",
        evidenceMoves: ["refresh packet"],
        relatedSurfaces: ["certs.kineticgain.com"],
        companyTags: ["Okta"],
        coverageScore: 72,
        freshnessDays: 24,
        ownerReadinessScore: 69,
        requestCriticalityScore: 55,
        blockerCount: 1,
        valueAtStakeMillions: 7,
        headline: "Watch the packet.",
        narrative: "Medium branch test.",
        nextMove: "Refresh the packet."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].coverageAssessment.severity).toBe("LOW");
    expect(report.items[0].freshnessAssessment.severity).toBe("LOW");
    expect(report.items[1].coverageAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].freshnessAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].ownerReadinessAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].blockerAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("strong enough");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleDueDiligenceGapAtlas, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.items).toBe(sampleDueDiligenceGapAtlas.length);
  });
});
