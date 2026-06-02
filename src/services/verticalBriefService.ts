import { analyze } from "../analyze.js";
import { sampleDueDiligenceGapAtlas } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleDueDiligenceGapAtlas, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Use procurement and identity as the reference packets, escalate revenue first, defer integrated FinTech language second, and refresh AI plus biotech proof before the next external diligence cycle."
  };
}

export function gapRegister() {
  return sampleDueDiligenceGapAtlas.map((item) => ({
    lane: item.lane,
    packetName: item.packetName,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    requestedAssertion: item.requestedAssertion,
    coverageScore: item.coverageScore,
    nextMove: item.nextMove
  }));
}

export function coverageMatrix() {
  return sampleDueDiligenceGapAtlas.map((item) => ({
    lane: item.lane,
    track: item.track,
    gapHeadline: item.gapHeadline,
    gapSignal: item.gapSignal,
    missingEvidence: item.missingEvidence,
    evidenceMoves: item.evidenceMoves,
    coverageScore: item.coverageScore,
    freshnessDays: item.freshnessDays,
    ownerReadinessScore: item.ownerReadinessScore
  }));
}

export function closePlan() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    blockerCount: item.blockerCount,
    compositeGapRiskScore: item.compositeGapRiskScore,
    owner: item.owner,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    compositeGapRiskScore: item.compositeGapRiskScore,
    valueAtStakeMillions: item.valueAtStakeMillions,
    requestCriticalityScore: item.requestCriticalityScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic diligence packet data only - no live board, investor, customer, or partner materials are included.",
    "Scores are modeled to show how Kinetic Gain can compare packet coverage, freshness, owner readiness, blocker load, and request criticality in one board-readable surface.",
    "All routes are read-only and demonstrate diligence-gap analysis, not production legal, financial, or compliance advice."
  ];
}

export function payload() {
  return {
    report,
    gapRegister: gapRegister(),
    coverageMatrix: coverageMatrix(),
    closePlan: closePlan(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleDueDiligenceGapAtlas
  };
}
