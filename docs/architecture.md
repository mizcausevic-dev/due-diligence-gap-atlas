# Architecture

Due Diligence Gap Atlas is a static-friendly TypeScript executive-intelligence surface for showing which board, investor, buyer, and partner packets are complete, which ones are thin or stale, and what should be closed before the next external review.

## Routes

- `/`
- `/gap-register`
- `/coverage-matrix`
- `/close-plan`
- `/verification`
- `/docs`

## Flow

1. `src/data/sampleVerticalBrief.ts` defines synthetic diligence packets with coverage, freshness, owner-readiness, blocker, and criticality signals.
2. `src/analyze.ts` converts those signals into board-readable diligence assessments and a composite gap risk score.
3. `src/services/verticalBriefService.ts` shapes the gap register, coverage matrix, close plan, and JSON payload routes.
4. `src/services/render.ts` turns those outputs into the static HTML views used in the published surface.

## Output contract

The surface publishes:

- board-readable HTML routes for overview, gap register, coverage matrix, close plan, verification, and docs
- JSON routes for summary, gap register, coverage matrix, close plan, verification, and full payload export
- generated screenshots and fixtures for README packaging and safe product proof
