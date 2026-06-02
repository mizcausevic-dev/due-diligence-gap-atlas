import type {
  DueDiligenceGapAtlasExport,
  DueDiligenceGapAtlasItem,
  DueDiligenceGapAtlasReportItem,
  GapAssessment,
  GapSeverity
} from "./types.js";

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): GapAssessment {
  let severity: GapSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): GapAssessment {
  let severity: GapSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: DueDiligenceGapAtlasItem[],
  options: { now?: string } = {}
): DueDiligenceGapAtlasExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: DueDiligenceGapAtlasReportItem[] = items.map((item) => {
    const coverageAssessment = assessStrength(
      item.coverageScore,
      82,
      68,
      "Coverage is strong enough to support the current diligence packet.",
      "Coverage exists, but the packet still needs attachment depth before the next review.",
      "Coverage is too thin for the current diligence ask."
    );

    const freshnessAssessment = assessDelay(
      item.freshnessDays,
      14,
      35,
      "Evidence is fresh enough for external diligence.",
      "Evidence is aging and should be refreshed before reuse.",
      "Evidence is stale enough to weaken the packet."
    );

    const ownerReadinessAssessment = assessStrength(
      item.ownerReadinessScore,
      80,
      65,
      "Ownership is clear enough to close the packet quickly.",
      "Ownership exists, but closure will still depend on coordination follow-up.",
      "Ownership is too weak to move the packet cleanly."
    );

    const blockerAssessment = assessDelay(
      item.blockerCount,
      0,
      1,
      "No visible blocker is slowing packet closure.",
      "A blocker is forming and should be cleared before the next diligence ask.",
      "Blocker load is already delaying the packet."
    );

    const requestCriticalityAssessment = assessStrength(
      100 - item.requestCriticalityScore,
      55,
      35,
      "The request pressure is manageable relative to the current packet.",
      "The request is becoming hard to satisfy with the current packet shape.",
      "The request is too critical for the current packet weakness."
    );

    const compositeGapRiskScore =
      Math.round(
        ((100 - item.coverageScore +
          item.freshnessDays +
          100 - item.ownerReadinessScore +
          item.blockerCount * 20 +
          item.requestCriticalityScore) /
          5) *
          10
      ) / 10;

    return {
      ...item,
      coverageAssessment,
      freshnessAssessment,
      ownerReadinessAssessment,
      blockerAssessment,
      requestCriticalityAssessment,
      compositeGapRiskScore
    };
  });

  const criticalGaps = reportItems.filter(
    (item) =>
      item.coverageAssessment.severity === "HIGH" ||
      item.freshnessAssessment.severity === "HIGH" ||
      item.ownerReadinessAssessment.severity === "HIGH"
  ).length;

  const blockedPackets = reportItems.filter(
    (item) => item.blockerAssessment.severity !== "LOW" || item.action === "ESCALATE"
  ).length;

  const averageCoverage =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.coverageScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    criticalGaps === 0
      ? "Diligence coverage is strong enough to support the current board, buyer, and investor packet."
      : criticalGaps <= 2
        ? "A few packets need tighter evidence and cleaner ownership before the next diligence review."
        : "Diligence weakness is now cross-functional and should be closed as one board-visible workstream."
    ;

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      criticalGaps,
      blockedPackets,
      averageCoverage,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: DueDiligenceGapAtlasItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
