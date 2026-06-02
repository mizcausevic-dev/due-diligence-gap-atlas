import type { DueDiligenceGapAtlasSummary } from "./types.js";

export function formatSummary(
  summary: DueDiligenceGapAtlasSummary,
  title = "Due Diligence Gap Atlas"
) {
  return [
    title,
    `Items: ${summary.items}`,
    `Critical gaps: ${summary.criticalGaps}`,
    `Blocked packets: ${summary.blockedPackets}`,
    `Average coverage: ${summary.averageCoverage}`,
    `Value at stake: $${summary.valueAtStakeMillions}M`,
    summary.leadingMessage
  ].join("\n");
}
