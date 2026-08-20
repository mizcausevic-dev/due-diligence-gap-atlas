$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $repoRoot "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $width = 1600
  $height = 900
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  # Kinetic Gain BERT dark-cyan, same values as the :root block in src/services/render.ts.
  $graphics.Clear([System.Drawing.Color]::FromArgb(11, 12, 16))          # --bg      #0B0C10

  $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(31, 40, 51))       # --panel   #1F2833
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(102, 252, 241), 2)       # --accent  #66FCF1
  $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(234, 246, 245)) # --head    #EAF6F5
  $bodyBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(153, 163, 173))  # --muted   #99A3AD
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(102, 252, 241))# --accent  #66FCF1

  $fontTitle = New-Object System.Drawing.Font("Segoe UI", 40, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
  $fontFooter = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $rect = New-Object System.Drawing.Rectangle 20, 20, 1560, 820
  $graphics.FillRectangle($bgBrush, $rect)
  $graphics.DrawRectangle($panelPen, $rect)

  $graphics.DrawString("Due Diligence Gap Atlas", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $titleBrush, 70, 150)
  $graphics.DrawString($Subtitle, $fontBody, $bodyBrush, (New-Object System.Drawing.RectangleF(70, 240, 1380, 110)))

  $y = 360
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 85, $y + 13, 12, 12)
    $graphics.DrawString($bullet, $fontBody, $titleBrush, 110, $y)
    $y += 84
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontFooter, $bodyBrush, 70, 770)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Diligence gaps stay visible before the board asks first" -Subtitle "This atlas turns packet coverage, evidence freshness, ownership readiness, and blocker load into one board-readable diligence layer." -Bullets @(
  "Which packets are strong enough to reuse and which ones are still too thin.",
  "Where freshness drift, blocker load, or weak ownership will stall review first.",
  "What should close, refresh, escalate, or defer before the next external ask."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-gap-atlas-proof.png") -Title "Gap register keeps packet ownership and pressure attached" -Subtitle "Every route retains the owner, audience, requested assertion, coverage score, and next move." -Bullets @(
  "Each packet stays connected to who owns it and who needs it.",
  "Weak packets are visible before they land in an investor or buyer review.",
  "The next corrective move sits next to the packet instead of in another memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-coverage-matrix-proof.png") -Title "Coverage matrix shows where the packet is weakest" -Subtitle "Gap headlines, missing evidence, freshness drift, and owner-readiness strain remain visible in one diligence layer." -Bullets @(
  "Missing evidence is explicit instead of implied.",
  "Freshness and ownership pressure are readable at a glance.",
  "Each packet ties to a concrete closure move."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-close-plan-proof.png") -Title "Close plan keeps sequencing grounded in blockers and owners" -Subtitle "Composite gap risk, blocker count, and next moves stay grounded in the same operating view." -Bullets @(
  "Closure work stays tied to one owner and one blocker count.",
  "Escalate or defer decisions are readable before the next review cycle.",
  "Boards and investors can see what should close first."
)
