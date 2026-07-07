# Eventra — Design Prompt Toolkit
# Copy the BASE PROMPT first into your design tool, then append the Feature Prompt for the screen you are designing.

---

## ════════════════════════════════════════
## BASE PROMPT (Always paste this first)
## ════════════════════════════════════════

```
Product: Eventra
Type: B2C SaaS Web Application — Event Budget & Vendor Decision Platform
Tagline: Know the true cost of your event before you book.

PRODUCT CONTEXT
Eventra is an AI-powered event budget and vendor decision platform for people
planning weddings, engagements, birthdays, and corporate events in India. It
helps users understand the true cost of their event, compare vendor quotations
fairly, detect hidden charges, and stay within budget.

The product is NOT a vendor directory. Users have already found vendors on
Instagram or WedMeGood. They bring those quotations to Eventra to understand
what they will actually pay.

PRIMARY USER
Name: Riya, 29, working professional
Planning: An engagement for 150 guests in Mumbai
Budget: ₹8,00,000
Priorities: Food quality, photography, and guest experience
Pain: Unclear quotations, hidden charges, family adding guests, difficulty
comparing vendors, no idea if her budget is realistic

DESIGN LANGUAGE
Style: Polished B2C SaaS. Clean, modern, premium but accessible.
       NOT wedding-specific. Works for any event type.

Colours:
  Background:      #FAFAF8   (warm off-white)
  Surface / Card:  #FFFFFF
  Text Primary:    #1A1D2E   (near-black navy)
  Text Secondary:  #6B7280
  Accent Primary:  #7C6FF7   (soft violet — primary CTA, active states)
  Accent Coral:    #F97066   (secondary accent, highlights)
  Success Green:   #10B981   (healthy budget, confirmed items)
  Amber Warning:   #F59E0B   (risks, warnings)
  Red Critical:    #EF4444   (over budget, critical alerts)
  Border:          #E5E7EB

Typography: Inter — weights 400, 500, 600, 700
Radius: Cards 12px, Inputs 8px, Pills/Badges 24px
Shadows: Subtle — do not use heavy drop shadows

Rules:
  - No excessive glassmorphism
  - No generic AI robot illustrations
  - No overly bright gradients
  - Every AI recommendation must show a confidence level and brief reasoning
  - Use ₹ (Indian Rupee) for all monetary values

NAVIGATION
Layout: Left sidebar on desktop (240px wide), bottom navigation bar on mobile
Nav items: Overview · My Event · Budget Plan · Vendors ·
           Quote Analysis · Hidden Costs · Change Simulator ·
           Trade-Off Advisor · Payments · Settings
Active state: Accent violet background on nav item, white text

TONE
Trustworthy, calm, financially intelligent. Like a smart friend who has
planned many events and will tell you the truth about your budget.
```

---

---

## ════════════════════════════════════════
## FEATURE PROMPTS (Append after Base Prompt)
## ════════════════════════════════════════

---

### FEATURE 1 — Event Setup & Onboarding

```
Now design the Event Setup & Onboarding screen.

WHAT THIS SCREEN DOES
Converts the user's fuzzy event idea into a structured, personalised budget
plan through a guided multi-step form. This is the entry point — it must
feel simple and reassuring, not overwhelming.

LAYOUT
- Centred card wizard on the off-white background
- Soft card shadow, rounded corners (12px)
- Step tracker at the top of the card (Step 1 of 4, Step 2 of 4, etc.)
- "Next" and "Back" buttons at the card footer
- No page reload between steps

STEP 1 — Event Basics
Fields: Event Type (dropdown), Event Date (date picker), City (dropdown)
Event type options: Wedding, Engagement, Birthday, Corporate, Anniversary,
                   Social Event

STEP 2 — Scale & Budget
Fields: Total Guest Count (number input), Total Budget in ₹ (number input),
        Number of Functions (number input, e.g. 1 for engagement only)

STEP 3 — Required Services
Multi-select pill chips: Venue, Catering, Decoration, Photography, Makeup,
Entertainment, Logistics, Invitations, Accommodation
Active pill: violet background (#7C6FF7), white text
Inactive pill: white background, grey border

STEP 4 — Priorities & Style
Instruction text: "Select your top 3 priorities (exactly 3)"
Priority options: Food Quality, Venue, Décor, Photography, Entertainment,
                 Convenience, Guest Experience
Style preference: Elegant & Minimal, Grand & Traditional, Modern & Fun,
                 Simple & Intimate
Bottom CTA button: "Analyse My Budget →" (solid accent violet, full width)

VALIDATION STATES
- Missing required field: red border + small error message below the field
- Priorities: if user selects more than 3, show a gentle inline warning

SAMPLE DATA TO SHOW (pre-filled for Riya's event)
Event Type: Engagement | Date: 18 Dec 2026 | City: Mumbai
Guests: 150 | Budget: ₹8,00,000 | Functions: 1
Services selected: Venue, Catering, Decoration, Photography, Makeup
Priorities: Food Quality, Photography, Guest Experience
Style: Elegant & Minimal
```

---

### FEATURE 2 — Budget Feasibility Analysis

```
Now design the Budget Feasibility Analysis screen.

WHAT THIS SCREEN DOES
Immediately after onboarding, answers the user's most anxious question:
"Is my budget realistic?" It must feel like an honest financial advisor
speaking plainly, not a vague algorithm.

LAYOUT — Two column (desktop), single column stacked (mobile)
Left column (60%): Feasibility score + AI insight + category breakdown
Right column (40%): Summary card + CTAs

HERO ELEMENT — Feasibility Score Ring
Large circular ring gauge at the top-left. Fills based on score.
Colour coding:
  Realistic  → Green (#10B981) — budget is sufficient
  Stretch    → Amber (#F59E0B) — achievable with care
  Unrealistic→ Red (#EF4444)  — budget is too low

For Riya's sample: show "Stretch" in Amber
Label inside the ring: "Stretch" in bold, with "Feasibility Score" subtitle

AI INSIGHT BOX
Card with very light violet tint background
✨ icon (sparkle) on the left
Sample text: "Your ₹8,00,000 budget for 150 guests in Mumbai is achievable,
but requires careful vendor selection. Food and photography are protected.
Prioritise a mid-range venue and keep décor minimal to stay within budget."
Confidence badge: "Confidence: High" in a small green pill

CATEGORY BREAKDOWN TABLE
Columns: Category | Recommended ₹ | % of Budget | Risk Status
Rows (use Riya's data):
  Venue            ₹2,40,000   30%   Medium Risk
  Catering         ₹2,00,000   25%   Low Risk
  Decoration       ₹80,000     10%   Low Risk
  Photography      ₹80,000     10%   Low Risk
  Makeup           ₹40,000      5%   Low Risk
  Entertainment    ₹40,000      5%   Medium Risk
  Logistics        ₹40,000      5%   Low Risk
  Contingency      ₹80,000     10%   Locked ← show a lock icon

Each row: show a thin horizontal progress bar inline in the % column
Risk pills: "Medium Risk" amber pill, "Low Risk" green pill, "Locked" grey pill

SUMMARY CARD (right column)
  Total Budget:           ₹8,00,000
  Estimated Min Cost:     ₹8,65,000
  Budget Gap:            -₹65,000   (show in red)
  Contingency Reserved:   ₹80,000

BOTTOM CTAs
Primary: "Continue to Quote Analysis →" (solid violet, full width)
Secondary: "Adjust My Budget" (outlined, below primary)
```

---

### FEATURE 3 — Vendor Quote Upload & Analysis

```
Now design the Vendor Quote Upload & Analysis screen.

WHAT THIS SCREEN DOES
The user uploads a vendor quotation (or enters it manually). The system
analyses it, flags missing charges, and shows the Estimated Final Cost —
the number the user will actually pay, not the listed price.

LAYOUT — Full width, two-panel view after analysis
Before upload: centred upload zone
After upload: left panel (extraction results) + right panel (AI review)

CATEGORY TABS
Tabs at the top: Venue | Catering | Photography | Decoration
Active tab: underline in violet, bold text
Currently active: Photography (Pixel Stories)

UPLOAD ZONE (before analysis)
Dashed border rectangle, 2px, border-color #E5E7EB
Cloud upload icon (large, violet)
Primary text: "Drop your vendor quote here"
Secondary text: "Supports PDF, JPG, PNG"
Link below: "Or enter quoted price manually →"
Hover state: light violet background tint, solid border

LOADING STATE (2 seconds after upload)
Replace upload zone with skeleton loader
Animated pulse on placeholder rows
Text: "AI is analysing your quote… looking for hidden charges"

EXTRACTED BREAKDOWN (left panel, after analysis — Pixel Stories Photography)
Section title: "Quote Analysis — Pixel Stories Photography"
Quoted price: ₹65,000 (large font, navy)

Included items (green check icons):
  ✅ Full-day coverage (8 hours)
  ✅ 1 photographer + 1 assistant
  ✅ Digital delivery of edited photos

Missing / unconfirmed items (amber warning icons):
  ⚠️ GST 18% — typically ₹11,700
  ⚠️ Travel & accommodation — est. ₹6,000–₹10,000
  ⚠️ Album / prints — est. ₹8,000–₹15,000
  ⚠️ Drone coverage — est. ₹4,000–₹6,000
  ⚠️ Extra hours overtime — est. ₹3,500/hr

Estimated Final Cost callout box:
  Background: very light amber tint
  Label: "Estimated Final Cost"
  Value: ₹82,000–₹1,04,000
  Sub-text: "vs. quoted ₹65,000"
  Confidence badge: "Medium Confidence" amber pill

Market Benchmark (small card below):
  "Photography in Mumbai: market range ₹55,000–₹1,20,000"
  Verdict pill: "Within market range" green

AI REVIEW PANEL (right panel)
Background: amber tint card
Title: "⚠️ Biggest Risk Detected"
Text: "GST (18%) is not mentioned in this quotation. This adds approximately
₹11,700 to the base price. Confirm with the vendor whether the quote is
GST-inclusive before paying any advance."
Below: "Confidence: Medium — 3 items unconfirmed"

Bottom CTA row:
  Primary: "Add to Comparison →" (solid violet)
  Secondary: "Download Summary" (outlined)
```

---

### FEATURE 4 — Vendor Comparison

```
Now design the Vendor Comparison screen.

WHAT THIS SCREEN DOES
Side-by-side comparison of shortlisted vendors using standardised Estimated
Final Cost — not starting prices. Each vendor gets an Eventra Match Score
based on Riya's priorities (food, photography, guest experience).

LAYOUT — Full width comparison grid
Category tabs at top (same as Quote Analysis)
Active: Photography — showing 3 vendors

COMPARISON TABLE
Fixed left column: Row labels
3 vendor columns: one per vendor

Vendor columns (Photography):
                     Pixel Stories    Moments by Dev   LensArt Studio
Listed Price         ₹65,000          ₹55,000          ₹78,000
Quoted Price         ₹65,000          ₹55,000          ₹78,000
Est. Final Price     ₹82,000–1,04,000 ₹74,000–90,000   ₹91,000–1,10,000
Eventra Match Score  78/100           65/100           52/100
Badge                Best Value       Needs Clarif.    Over Budget
Availability         ✅ Available     ✅ Available     ❌ Not confirmed
Response Time        < 24 hrs         2–3 days         No response yet
GST Included         ❌ No            ✅ Yes           ❌ No
Album Included       ❌ No            ✅ Yes           ✅ Yes
Drone Included       ❌ No (add-on)   ❌ No            ✅ Yes

Match Score display: circular gauge at top of each vendor column
  Pixel Stories: 78 — Green tint column header
  Moments by Dev: 65 — Neutral
  LensArt Studio: 52 — Red tint (over budget)

Score breakdown tooltip (on hover or tap):
  Budget Fit: 36/40 | Transparency: 22/30 | Service Match: 14/20 | Availability: 6/10

BADGES
Best Value    → green pill
Needs Clarification → amber pill
Over Budget   → red pill

EXPANDABLE VENDOR DETAIL (below each column — accordion)
Section: "Why Recommended"
Text for Pixel Stories: "Strong portfolio matching your Elegant & Minimal
style. Quoted price is within your photography budget of ₹80,000. Final
cost is within range if you skip the album and drone add-ons."

Section: "Possible Risks"
"GST and travel not confirmed. Final cost may be ₹17,000–₹39,000 higher
than quoted."

Section: "Questions to Ask Before Booking"
1. Is GST of 18% included in your quoted ₹65,000?
2. Is travel to the venue included, or charged separately?
3. What is the cost of the album, and is it mandatory?
[Copy as WhatsApp Message] button — WhatsApp green icon, outlined button
On click: show success toast "Copied to clipboard ✓"
```

---

### FEATURE 5 — Hidden Cost Detector

```
Now design the Hidden Cost Detector screen.

WHAT THIS SCREEN DOES
A proactive educational dashboard that maps all potential hidden charges
across every category — before the user signs a contract. Think of it as
a "cheat sheet" that experienced event planners carry in their head.

LAYOUT — Full width, single column
Summary banner at top
Category accordions below (one per selected service)

SUMMARY BANNER
Background: amber tint (#FEF3C7)
Large text: "₹42,000–₹68,000"
Sub-text: "estimated hidden charges detected across your event"
Below: Two columns
  Left: "12 items flagged" (amber)
  Right: "3 items confirmed in quotes" (green)

CATEGORY ACCORDIONS (one per category — closed by default)
Each closed state shows:
  Category icon + name | "X potential risks | ₹ range"
  Right side: expand chevron

Accordion 1 — Venue (Royal Orchid Banquet)
Closed: "Venue — 6 potential risks — ₹15,000–₹28,000"
Expanded rows:
  GST 18%              ₹32,400–₹39,600    High Risk    ⚠️ Not confirmed
  Service charge       ₹9,000–₹18,000     High Risk    ⚠️ Not confirmed
  Electricity charges  ₹3,000–₹8,000      Medium Risk  ⚠️ Not confirmed
  Outside vendor fee   ₹5,000–₹15,000     High Risk    ⚠️ Not confirmed
  Corkage              ₹0–₹5,000          Low Risk     ⚠️ Not applicable
  Security deposit     ₹20,000–₹50,000    Medium Risk  ✅ Confirmed ₹25,000

Accordion 2 — Catering (FeastCraft)
Closed: "Catering — 4 potential risks — ₹12,000–₹22,000"
Expanded rows:
  Vendor meals (25 pax) ₹6,000–₹10,000   High Risk    ⚠️ Not confirmed
  Water & beverages     ₹3,000–₹6,000    Medium Risk  ⚠️ Not confirmed
  Extra plate cost      ₹800–₹1,200/head Medium Risk  ⚠️ Not confirmed
  Service staff charges ₹4,000–₹8,000    Medium Risk  ✅ Confirmed included

Accordion 3 — Photography (Pixel Stories)
Closed: "Photography — 5 potential risks — ₹8,000–₹18,000"
Expanded rows:
  GST 18%              ₹11,700           High Risk    ⚠️ Not confirmed
  Travel               ₹6,000–₹10,000    High Risk    ⚠️ Not confirmed
  Album / prints       ₹8,000–₹15,000    Medium Risk  ⚠️ Not confirmed
  Drone coverage       ₹4,000–₹6,000     Low Risk     ⚠️ Not confirmed
  Extra hours overtime ₹3,500/hr         Medium Risk  ⚠️ Not confirmed

Accordion 4 — Decoration (Aura Events)
Closed: "Decoration — 4 potential risks — ₹7,000–₹12,000"
Expanded rows:
  Setup labour         ₹5,000–₹8,000     High Risk    ⚠️ Not confirmed
  Teardown             ₹3,000–₹5,000     Medium Risk  ⚠️ Not confirmed
  Transport            ₹2,000–₹4,000     Low Risk     ⚠️ Not confirmed
  Electricity for lights ₹1,500–₹3,000  Low Risk     ⚠️ Not confirmed

ROW STYLING
High Risk badge: red pill (#EF4444)
Medium Risk badge: amber pill (#F59E0B)
Low Risk badge: grey pill
Confirmed items: green checkmark, row has a subtle green-tinted background
Unconfirmed items: amber warning icon
Amount: right-aligned, monospace-style font for numbers
```

---

### FEATURE 6 — Change Impact Simulator

```
Now design the Change Impact Simulator screen.

WHAT THIS SCREEN DOES
A non-destructive "What-If" sandbox. User simulates a change (like adding
30 guests) and instantly sees which budget categories are affected and by
how much. Recovery options are provided to stay within budget.

LAYOUT — Two sections stacked
Top: Control panel
Middle: Before & After impact table
Bottom: Recovery Options cards

CONTROL PANEL (card, white background)
Label: "Simulate a Change"
Row 1: Dropdown — "Change Type"
  Options: Increase Guest Count | Reduce Budget | Add New Function |
           Vendor Increased Price | Premium Upgrade Selected
Row 2: Input — "New Value"
  For guest count: number input, showing 150 → [  180  ]
Row 3: CTA button — "Calculate Impact" (solid violet, medium size)
Simulation Mode banner: thin amber stripe at top of page reading
  "⚠️ Simulation Mode — No changes have been applied to your budget"

IMPACT TABLE (show after Calculate Impact is clicked)
Section title: "Impact of Adding 30 Guests (150 → 180)"
Two-column table: Before | After

Category       Before        After          Change
Catering       ₹2,00,000     ₹2,36,000     +₹36,000 (red, bold)
Venue          ₹2,40,000     ₹2,60,000     +₹20,000 (red)
Seating        ₹30,000       ₹36,000       +₹6,000  (red)
Return Gifts   ₹15,000       ₹18,000       +₹3,000  (red)
Logistics      ₹40,000       ₹46,000       +₹6,000  (red)
Unchanged rows shown in muted grey (Photography, Makeup, etc.)

Total Impact row (bold, highlighted):
  Before: ₹8,00,000 → After: ₹8,71,000 → Change: +₹71,000 (red, bold)

RECOVERY OPTIONS (cards in a row — 2 to 4 cards)

Card 1: "Reduce Decoration Package"
  Saving: -₹40,000 (green, large)
  Action: Downgrade from premium to standard décor package
  Experience Impact: Low ⭐⭐⭐ (3 stars = low impact on experience)
  Risk: Low
  [Preview This Recovery] button — outlined, violet

Card 2: "Switch to Lower-Cost Caterer"
  Saving: -₹30,000 (green)
  Action: Replace FeastCraft with a mid-range caterer
  Experience Impact: Medium ⭐⭐ (2 stars)
  Risk: Medium
  [Preview This Recovery] button

Card 3: "Reduce Guest Count by 20"
  Saving: -₹48,000 (green)
  Action: Bring guest count back to 160
  Experience Impact: High ⭐ (1 star — high impact)
  Risk: Low
  [Preview This Recovery] button

Card 4: "Use Contingency Budget"
  Saving: Uses ₹71,000 from ₹80,000 contingency
  Warning: "Only ₹9,000 contingency remaining after this"
  Experience Impact: None
  Risk: High
  [Preview This Recovery] button — styled with amber outline

Footer note: "Clicking 'Preview' shows a full updated budget — nothing is
applied until you confirm."
```

---

### FEATURE 7 — Trade-Off Advisor

```
Now design the Trade-Off Advisor screen.

WHAT THIS SCREEN DOES
When the event plan exceeds the budget, this screen generates 3 distinct,
priority-aware recovery scenarios. It never recommends cutting a category
the user said was a priority. Each scenario must feel like advice from a
thoughtful planner, not a random cost-cutting list.

BUDGET ALERT BANNER (top of screen)
Background: red tint (#FEE2E2)
Icon: ⚠️
Text: "Your estimated final cost of ₹8,65,000 exceeds your budget by ₹65,000"
Sub-text: "Select the priorities you want to protect, and we'll find the
best path to stay within budget."

PRIORITY PROTECTION SELECTOR
Label: "What must I protect?"
Row of toggle chips (pre-selected from onboarding):
  [✅ Food Quality] [✅ Photography] [✅ Guest Experience]
  [ Venue] [ Décor] [ Entertainment] [ Convenience]
Active (protected): violet background, white text, lock icon
Inactive (cuttable): white background, grey border
Instruction: "Protected categories will not be touched in any scenario."

[Generate Scenarios] CTA — solid violet button

SCENARIO CARDS (3 cards in a row on desktop, stacked on mobile)

Card 1: "Minimal Décor Approach"
Chip: "Saves most"
Budget saved: ₹55,000 (large green)
Recommended changes:
  - Downgrade Aura Events décor to standard package  -₹35,000
  - Remove live entertainment DJ                      -₹15,000
  - Switch to digital invitations                    -₹5,000
Resulting total: ₹8,10,000
Ratings (bar or star visual):
  Experience impact:  Low    ████░  
  Quality impact:     Low    ████░
  Convenience impact: Low    ████░
Guest experience note: "Guests will notice simpler décor but food quality,
photography, and the overall atmosphere remain strong."
[Explore This Scenario] button — solid violet

Card 2: "Budget Venue Swap"
Chip: "Balanced"
Budget saved: ₹50,000 (large green)
Recommended changes:
  - Switch Royal Orchid to a mid-range banquet hall  -₹40,000
  - Remove makeup trial session                      -₹5,000
  - Reduce logistics to local vendors                -₹5,000
Resulting total: ₹8,15,000
Ratings:
  Experience impact:  Medium ███░░
  Quality impact:     Low    ████░
  Convenience impact: Medium ███░░
Guest experience note: "A smaller venue may feel more intimate. Food,
photography, and décor quality are all preserved."
[Explore This Scenario] button — outlined violet

Card 3: "Moderate Guest Reduction"
Chip: "Lowest risk"
Budget saved: ₹65,000 (large green)
Recommended changes:
  - Reduce guest count from 150 to 120              -₹48,000
  - Remove return gifts                             -₹12,000
  - Simplify logistics                              -₹5,000
Resulting total: ₹8,00,000 (exact budget — show a ✅ "Within Budget" badge)
Ratings:
  Experience impact:  High   ██░░░
  Quality impact:     None   █████
  Convenience impact: Low    ████░
Guest experience note: "Reducing guests is the most financially effective
option but requires a conversation with family."
[Explore This Scenario] button — outlined violet

FOOTER NOTE
"Eventra's estimates are based on your quotations and market benchmarks.
Final costs may vary. Always confirm all charges with vendors before paying."
```

---

