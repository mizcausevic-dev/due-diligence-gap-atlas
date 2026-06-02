import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the diligence summary", () => {
    const output = formatSummary({
      items: 6,
      criticalGaps: 4,
      blockedPackets: 3,
      averageCoverage: 71.2,
      valueAtStakeMillions: 154,
      leadingMessage: "Diligence weakness is rising."
    });

    expect(output).toContain("Due Diligence Gap Atlas");
    expect(output).toContain("Critical gaps: 4");
    expect(output).toContain("Blocked packets: 3");
    expect(output).toContain("Value at stake: $154M");
  });
});
