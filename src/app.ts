import express from "express";
import { closePlan, coverageMatrix, gapRegister, payload, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderClosePlan,
  renderCoverageMatrix,
  renderDocs,
  renderGapAtlasOverview,
  renderGapRegister,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderGapAtlasOverview()));
  app.get("/gap-register", (_req, res) => res.type("html").send(renderGapRegister()));
  app.get("/coverage-matrix", (_req, res) => res.type("html").send(renderCoverageMatrix()));
  app.get("/close-plan", (_req, res) => res.type("html").send(renderClosePlan()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/gap-register", (_req, res) => res.json(gapRegister()));
  app.get("/api/coverage-matrix", (_req, res) => res.json(coverageMatrix()));
  app.get("/api/close-plan", (_req, res) => res.json(closePlan()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`due-diligence-gap-atlas listening on http://127.0.0.1:${port}`);
  });
}
