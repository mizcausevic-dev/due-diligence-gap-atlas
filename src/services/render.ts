import { closePlan, coverageMatrix, gapRegister, payload, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Due Diligence Gap Atlas";
const domain = "https://gaps.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="icon" href="/favicon.svg" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Due-Diligence Atlas",
        "description": "Board-ready executive intelligence surface for showing where diligence packets are incomplete, which workstreams are blocking readiness, how evidence coverage varies by buyer question, and what should be closed before the next investor or buyer review.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": "https://gaps.kineticgain.com/",
        "publisher": {
          "@type": "Organization",
          "name": "Kinetic Gain LLC",
          "url": "https://kineticgain.com/"
        },
        "isPartOf": {
          "@type": "WebSite",
          "name": "Kinetic Gain",
          "url": "https://kineticgain.com/"
        }
      }
    </script>
    <style>
      :root {
        color-scheme: dark;
        /* Kinetic Gain BERT dark-cyan. Shared with kineticgain.com and suite.kineticgain.com. */
        --bg: #0B0C10;
        --panel: #1F2833;
        --panel-2: #161D26;
        --border: #2B3A46;
        --text: #C5C6C7;
        --head: #EAF6F5;
        --muted: #99A3AD;
        --faint: #8C98A2;
        --accent: #66FCF1;
        --accent-2: #45A29E;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(69, 162, 158, 0.12), transparent 30%),
          linear-gradient(180deg, var(--panel-2) 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, var(--panel), var(--panel-2));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(102, 252, 241, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; color: var(--head); line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid var(--accent-2);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(102, 252, 241, 0.08); }
      .metrics, .grid { display: grid; gap: 18px; }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: var(--panel-2);
        border: 1px solid var(--border);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip { color: var(--accent); text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px; }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; color: var(--head); font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid var(--border); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: var(--panel-2);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--faint);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/gap-register", "Gap register"],
    ["/coverage-matrix", "Coverage matrix"],
    ["/close-plan", "Close plan"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderGapAtlasOverview() {
  const executiveSummary = summary();
  const lanes = gapRegister().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.packetName)}</h3>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Assertion:</strong> ${escapeHtml(item.requestedAssertion)}</p>
        <p><strong>Coverage:</strong> ${item.coverageScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeGapRiskScore} · request pressure ${item.requestCriticalityScore} · $${item.valueAtStakeMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Due diligence gaps</span>
      <h1>Which packets are ready, which ones are thin or stale, and where will the next board, investor, or buyer diligence cycle stall first?</h1>
      <p class="lede">Due Diligence Gap Atlas turns packet coverage, evidence freshness, ownership readiness, and blocker load into one board-readable diligence layer instead of scattered proof folders and narrative-only claims.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Packets</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled diligence packets in the current executive-facing estate.</div></div>
        <div class="metric"><span class="metric-label">Critical gaps</span><span class="metric-value">${executiveSummary.criticalGaps}</span><div class="metric-copy">Packets with high coverage, freshness, or ownership pressure.</div></div>
        <div class="metric"><span class="metric-label">Blocked packets</span><span class="metric-value">${executiveSummary.blockedPackets}</span><div class="metric-copy">Packets already slowed by blocker load or escalation pressure.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to incomplete or weak diligence packets.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Gap register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible diligence pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready diligence surface for comparing packet coverage, freshness, ownership readiness, and blocker load."
  );
}

export function renderGapRegister() {
  const rows = gapRegister()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.packetName)}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.requestedAssertion)}</td>
        <td>${item.coverageScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Gap register",
    "/gap-register",
    `<section class="hero">
      <span class="eyebrow">Gap register</span>
      <h1>Each packet keeps one owner, one audience, one external assertion, and one corrective move attached.</h1>
      <p class="lede">The gap register keeps diligence work tied to the exact packet that will succeed or stall under external review.</p>
      <div class="nav">${navLinks("/gap-register")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Packet</th><th>Owner</th><th>Audience</th><th>Action</th><th>Requested assertion</th><th>Coverage</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Gap-register view showing who owns each diligence packet, who needs it, and how complete it is."
  );
}

export function renderCoverageMatrix() {
  const rows = coverageMatrix()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.track)}</td>
        <td>${escapeHtml(item.gapHeadline)}</td>
        <td>${escapeHtml(item.gapSignal)}</td>
        <td>${escapeHtml(item.missingEvidence)}</td>
        <td>${item.coverageScore}</td>
        <td>${item.freshnessDays}</td>
        <td>${item.ownerReadinessScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Coverage matrix",
    "/coverage-matrix",
    `<section class="hero">
      <span class="eyebrow">Coverage matrix</span>
      <h1>Weak attachments, stale evidence, and low-owner readiness stay visible in one diligence matrix instead of hiding in separate packet folders.</h1>
      <p class="lede">This view keeps diligence pressure tied to the specific evidence gap most likely to fail under investor, buyer, or board review.</p>
      <div class="nav">${navLinks("/coverage-matrix")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Track</th><th>Gap headline</th><th>Gap signal</th><th>Missing evidence</th><th>Coverage</th><th>Freshness (days)</th><th>Owner readiness</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Coverage-matrix view showing where diligence packets are incomplete, stale, or weakly owned."
  );
}

export function renderClosePlan() {
  const rows = closePlan()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.blockerCount}</td>
        <td>${item.compositeGapRiskScore}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.nextMove)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Close plan",
    "/close-plan",
    `<section class="hero">
      <span class="eyebrow">Close plan</span>
      <h1>The atlas keeps closure work tied to one owner, one blocker count, and one next move instead of a floating diligence to-do list.</h1>
      <p class="lede">This close plan helps leaders see which packets can close quickly, which require escalation, and which should be deferred until the evidence bundle catches up.</p>
      <div class="nav">${navLinks("/close-plan")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Blockers</th><th>Gap risk</th><th>Owner</th><th>Next move</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Close-plan view for sequencing diligence packet closure, escalation, and deferral."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this diligence packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone mistakes the sample for a live diligence binder.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
      <pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre>
    </section>`,
    "Verification notes for the Due Diligence Gap Atlas sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Due Diligence Gap Atlas docs</h1>
      <p class="lede">This surface packages packet coverage, blocker load, and close sequencing into reproducible routes and JSON outputs for board, investor, and buyer diligence.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/gap-register</code> keeps packet ownership and assertions tied to one action.</li>
        <li><code>/coverage-matrix</code> compares missing evidence, coverage, freshness, and owner readiness.</li>
        <li><code>/close-plan</code> sequences blocker cleanup, escalation, and packet closure.</li>
        <li><code>/api/payload</code> exposes the reproducible diligence packet.</li>
      </ul>
    </section>`,
    "Product documentation for Due Diligence Gap Atlas and its diligence-ready routes."
  );
}
