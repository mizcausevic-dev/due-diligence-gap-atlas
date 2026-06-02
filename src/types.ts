export type DiligenceTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "PROCUREMENT"
  | "FINTECH"
  | "BIOTECH";

export type DiligenceAction = "CLOSE" | "REFRESH" | "ESCALATE" | "DEFER";

export type GapSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface DueDiligenceGapAtlasItem {
  id: string;
  lane: string;
  track: DiligenceTrack;
  action: DiligenceAction;
  packetName: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  requestedAssertion: string;
  gapHeadline: string;
  gapSignal: string;
  missingEvidence: string;
  evidenceMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  coverageScore: number;
  freshnessDays: number;
  ownerReadinessScore: number;
  requestCriticalityScore: number;
  blockerCount: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface GapAssessment {
  severity: GapSeverity;
  ok: boolean;
  message: string;
}

export interface DueDiligenceGapAtlasReportItem extends DueDiligenceGapAtlasItem {
  coverageAssessment: GapAssessment;
  freshnessAssessment: GapAssessment;
  ownerReadinessAssessment: GapAssessment;
  blockerAssessment: GapAssessment;
  requestCriticalityAssessment: GapAssessment;
  compositeGapRiskScore: number;
}

export interface DueDiligenceGapAtlasSummary {
  items: number;
  criticalGaps: number;
  blockedPackets: number;
  averageCoverage: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface DueDiligenceGapAtlasExport {
  generatedAt: string;
  summary: DueDiligenceGapAtlasSummary;
  items: DueDiligenceGapAtlasReportItem[];
}

export interface DueDiligenceGapAtlasPayload {
  report: DueDiligenceGapAtlasExport;
  gapRegister: ReturnType<typeof import("./services/verticalBriefService.js").gapRegister>;
  coverageMatrix: ReturnType<typeof import("./services/verticalBriefService.js").coverageMatrix>;
  closePlan: ReturnType<typeof import("./services/verticalBriefService.js").closePlan>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: DueDiligenceGapAtlasItem[];
}
