import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sampleDueDiligenceGapAtlas } from "../src/data/sampleVerticalBrief.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesDir = path.join(root, "fixtures");
mkdirSync(fixturesDir, { recursive: true });

rmSync(path.join(fixturesDir, "due-diligence-gap-atlas.json"), { force: true });
rmSync(path.join(fixturesDir, "due-diligence-gap-atlas-clean.json"), { force: true });

writeFileSync(
  path.join(fixturesDir, "due-diligence-gap-atlas.json"),
  JSON.stringify(sampleDueDiligenceGapAtlas, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "due-diligence-gap-atlas-clean.json"),
  JSON.stringify(
    sampleDueDiligenceGapAtlas.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
