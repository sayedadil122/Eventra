# Product Requirements Document (PRD): Eventra MVP

**Version:** 1.2 (Updated with Full Research Context + UI Requirements)
**Date:** July 2026
**Status:** Draft — Awaiting Answers to Open Questions

---

## 1. Product Overview

**Vision:** Empower event organisers to know the true cost of their event before booking, preventing budget overruns caused by hidden charges, inconsistent quotations, and poor planning sequencing.

**MVP Philosophy:** Focus strictly on post-discovery budget certainty. The MVP will NOT feature a vendor directory for discovery. It assumes the user has already found vendors (via Instagram, WedMeGood, etc.) and is bringing their quotations to Eventra for analysis, comparison, and budget protection.

**North Star Metric:** Percentage of users who create a feasible event plan and stay within their defined budget.

---

## 2. Target User (Persona)

**Name:** Riya
**Age:** 29
**Occupation:** Working professional
**Situation:** Planning an engagement for 150 guests in Mumbai
**Budget:** ₹8,00,000
**Behaviour:** Uses Instagram, Google, WhatsApp, and vendor platforms to discover vendors
**Goals:** Plan a good event without overspending
**Pain Points:**
- Receives inconsistent vendor quotations
- Discovers hidden charges too late (at final billing)
- Family keeps adding guests, disrupting the plan
- Finds it hard to compare vendors fairly
- Does not know if her ₹8L budget is realistic

---

## 3. Market Segmentation

Eventra addresses four primary event-planning segments:

| Segment | Description | Planning Complexity |
|---|---|---|
| **Weddings & Engagements** | Multi-function, multi-vendor, high emotional stakes | Very High |
| **Corporate Events** | Fixed-budget, procurement-driven, approval chains | High |
| **Schools & Colleges** | Committee-planned, low budget, many stakeholders | Medium |
| **Housing Societies** | Community events, multiple decision-makers | Medium |

**MVP Focus:** Weddings & Engagements (highest pain, highest willingness to pay, strongest word-of-mouth potential).

---

## 4. Sample Event Data (Used in Prototype)

| Field | Value |
|---|---|
| Event Type | Engagement |
| Date | 18 December 2026 |
| City | Mumbai |
| Guest Count | 150 |
| Total Budget | ₹8,00,000 |
| Style | Elegant & Minimal |
| Priorities | Food Quality, Photography, Guest Experience |

**Sample Vendors:**
1. Royal Orchid Banquet (Venue)
2. FeastCraft Catering (Catering)
3. Pixel Stories Photography (Photography)
4. Aura Events Décor (Decoration)

---

## 5. Validated Pain Points (Research Context, 2026)

> The following pain points are validated from 2026 Reddit discussions, DesiWeddings forums, and event-planning communities. They are the foundation of every product decision.

### 5.1 Primary User Pain Point
Event organisers cannot confidently determine the true cost of their event because marketplace prices are generic, vendor quotations are inconsistent, hidden charges are revealed late, and event requirements frequently change.

### 5.2 Secondary User Pain Point
Users waste time contacting vendors who appear affordable but may be inactive, unavailable, or outside the actual event budget once the complete price is calculated.

### 5.3 Core Problem Statement
People planning events with a limited budget struggle to understand what they can realistically afford and which vendors genuinely fit their requirements because existing platforms rely on starting prices, incomplete quotations, and manual budget tracking.

### 5.4 How Might We Statement
How might we help event organisers calculate the realistic complete cost of their event, compare vendor quotations fairly, and keep the plan within budget when requirements or prices change?

### 5.5 Jobs to Be Done
When I am planning an event with a fixed budget, help me understand what is realistically achievable, identify vendors whose complete costs fit my requirements, and guide me through budget changes, so that I can make confident decisions without discovering expensive surprises later.

### 5.6 Key Research Insight
Users do not need another platform that only says: **"Here are vendors under ₹50,000."**

They need a system that says: **"Based on your date, city, guest count, event duration and service requirements, this vendor's likely complete price is ₹58,000. The listed ₹40,000 package excludes travel, overtime, an album and GST."**

---

## 6. Pain Point Catalogue (All 20 Validated Points)

### 6.1 Pain Point Prioritisation Matrix

| Rank | Pain Point | Frequency | User Impact | Solution Gap | Priority |
|---|---|---|---|---|---|
| 1 | True final event cost is unclear | High | High | Strong | **Must Solve** |
| 2 | Hidden charges appear late | High | High | Strong | **Must Solve** |
| 3 | Quotations are difficult to compare | High | High | Strong | **Must Solve** |
| 4 | Users do not know whether budget is realistic | High | High | Strong | **Must Solve** |
| 5 | Generic price filters give misleading matches | Med–High | High | Strong | **Must Solve** |
| 6 | Users do not know if they are overpaying | High | High | Med–Strong | **Must Solve** |
| 7 | Vendors may not respond | Med–High | Med–High | Strong | **Should Solve** |
| 8 | Requirement changes disrupt budget | High | High | Strong | **Must Solve** |
| 9 | Users struggle with budget trade-offs | Med–High | High | Strong | **Must Solve** |
| 10 | Planning information is fragmented | High | Med–High | Crowded | Supporting Issue |
| 11 | Event software is too complex | Medium | Medium | Strong for B2B | Future |
| 12 | Users do not know where to start | High | High | Strong | **Must Solve** |
| 13 | Users do not know the planning sequence | High | High | Medium | **Should Solve** |
| 14 | Choice overload during vendor discovery | High | High | Medium | **Should Solve** |
| 15 | No single source of truth for decisions | High | High | Strong | **Must Solve** |
| 16 | Multiple stakeholders with no shared view | Med–High | High | Strong | Future (V2) |
| 17 | Day-of execution risk | Medium | High | Strong | Future (V2) |
| 18 | Trust in vendor and AI recommendations | High | Very High | Strong | **Must Solve** |
| 19 | Planning is a second full-time job (mental load) | High | Very High | Strong | Emotional Driver |
| 20 | Vendor responsiveness unknown | Med–High | Med–High | Strong | **Should Solve** |

---

### 6.2 Detailed Pain Point Descriptions

#### PP-01: True final event cost is unclear
Users enter planning knowing their total budget but not understanding what events truly cost in totality. One Reddit user (2026) planning a resort wedding near Mumbai asked whether ₹10–12 lakh for 200–250 guests was achievable, despite having researched for weeks. Another described feeling like they were "going crazy" because costs ranged dramatically with no reliable baseline.

**Eventra Solution:** Budget Feasibility Analysis — calculates realistic cost upfront.

---

#### PP-02: Hidden charges appear too late
A Delhi NCR forum post (2026), based on visits to 50+ venues, described hidden charges as a major problem: outside-decorator fees, corkage charges, licence costs, service charges, cleaning fees, security staff, GST, and difficulties recovering security deposits. Users discover these after committing.

**Common hidden charges:**
- GST 18% (Photography, Venue, Decor)
- Service charges 5–22%
- Overtime fees (₹5,000–₹10,000/hr)
- Vendor meals (15–25 people)
- Setup and teardown labour
- Corkage and outside-vendor fees
- Electricity, cleaning, security
- Security deposit non-refund risk

**Eventra Solution:** Hidden Cost Detector + Quote Analysis.

---

#### PP-03: Quotations are difficult to compare
Different vendors quote using completely different structures:
- One caterer includes serving staff; another charges separately
- One photographer includes an album; another includes only digital files
- One venue includes furniture but requires in-house decorator
- One decorator includes setup but excludes teardown
- One makeup artist includes travel; another charges separately
- One vendor includes GST; another adds it later

Users cannot tell which vendor is cheaper, which quotation is complete, or which conditions create future expenses.

**Eventra Solution:** Vendor Comparison with standardised Estimated Final Cost.

---

#### PP-04: Users do not know if their budget is realistic
Users contact vendors and book venues without knowing whether their total budget can sustain the event at their required scale. A 2026 user planning across Lonavala, Alibaug, Nashik or Goa could not determine which destination was feasible within ₹18–20 lakh.

**Eventra Solution:** Budget Feasibility Analysis with city multiplier and guest-count logic.

---

#### PP-05: Generic price filters give misleading vendor matches
A photographer may display "Starting at ₹40,000." The user's actual requirement may include:
- ₹40,000 base package
- ₹6,000 travel
- ₹5,000 additional hours
- ₹8,000 album
- ₹4,000 drone
- 18% GST

Final cost: ₹74,460. The platform says the vendor is within budget. The vendor is not.

**Eventra Solution:** Eventra Match Score based on Estimated Final Cost, not listed price.

---

#### PP-06: Users do not know if they are being overcharged
A 2026 Reddit user openly said they had no idea what a normal wedding should cost or whether they were being "ripped off." No trusted, event-specific benchmarks exist for Indian cities.

**Eventra Solution:** Market benchmark ranges per category displayed in Quote Analysis and Budget Feasibility.

---

#### PP-07: Vendors may not respond
A 2026 Reddit user spent three weeks searching for vendors, repeatedly finding inactive profiles. Another user had already paid for an engagement shoot but could not reach the photographer about the wedding booking. A third user could not get a venue tour arranged despite multiple attempts.

**Problem:** Marketplace profiles do not reliably show last active date, response rate, or current booking availability.

**Eventra Solution (MVP):** Vendor card shows "Last Verified" date and response confidence indicator. Full responsiveness tracking is V2.

---

#### PP-08: Requirement changes disrupt the entire budget
Common changes that cascade across all categories:
- Guest count increases
- Venue changes
- Additional functions added
- Event date changes
- Vendors increase prices
- Family members request upgrades

Increasing guest count from 150 to 180 affects: catering, venue capacity, furniture, return gifts, transport, accommodation, service staff, and parking. Users must recalculate everything manually.

**Eventra Solution:** Change Impact Simulator.

---

#### PP-09: Users struggle with budget trade-offs
When the plan becomes too expensive, users face paralysing choices with no guidance: better food or better décor, more guests or better service, premium venue or better photography. The result is last-minute emotional decisions, often cutting high-impact categories.

**Eventra Solution:** Trade-Off Advisor — generates personalised scenarios that protect stated priorities.

---

#### PP-10: Planning information is fragmented
Decisions and commitments live across WhatsApp messages, calls, emails, PDFs, spreadsheets, and mental notes. Nobody has the same version of the plan. Different family members act on outdated information.

**Eventra Solution (MVP):** Budget Protection Dashboard as the single source of truth for financial commitments.

---

#### PP-11: Existing event software is too complex for occasional organisers
Enterprise event tools (designed for procurement/IT teams) are inappropriate for individual consumers. Simple consumer checklists are too basic. There is a significant gap between the two.

**Eventra Solution:** Consumer-grade UX with professional-grade financial intelligence. No admin setup, no integrations required.

---

#### PP-12: "I genuinely don't know where to start."
Users can picture the event they want but cannot translate vague intent into concrete decisions, categories, and a starting plan. They freeze at the blank page.

**Eventra Solution:** Guided onboarding — structured multi-step setup that converts a fuzzy event idea into a concrete budget plan.

---

#### PP-13: "I don't know what to do first, or when."
Users book caterers before venues, send invites before confirming dates, or discover in week three that they should have locked the venue in month one. The invisible sequencing of event planning is never explained.

**Eventra Solution (V2):** Planning timeline with dependency warnings.

---

#### PP-14: Choice overload — "Everything looks the same."
50 venues, 40 photographers, all 4.8 stars with beautiful photos. Users face paralysis before price even enters the picture. This is distinct from trade-off decisions — it is paralysis at the discovery stage.

**Eventra Solution:** Eventra Match Score reduces choice to a ranked shortlist based on the user's specific event.

---

#### PP-15: No single source of truth for what was decided
Prices from WhatsApp, verbal "we'll figure it out" from calls, different numbers in email. A week later nobody knows what was agreed. Users re-verify constantly or act on stale information.

**Eventra Solution:** Budget Protection Dashboard — all committed amounts tracked in one place with source attribution.

---

#### PP-16: Multiple stakeholders, no shared plan view
Partner, parents, in-laws, and well-meaning friends all have opinions and none are looking at the same version of the plan. The organiser becomes the human sync layer.

**Eventra Solution:** V2 — shared event plan with role-based views.

---

#### PP-17: Day-of execution risk
Even a perfect paper plan does not prevent the caterer arriving late, the decorator needing access nobody arranged, or two vendors needing to coordinate through the organiser at 8am.

**Eventra Solution:** V2 — vendor-to-vendor coordination and day-of checklist.

---

#### PP-18: "How do I know I can trust this recommendation?"
Two layers: trust in the vendor (reviews feel thin or fake) and trust in the AI recommendation (black-box suggestions won't earn ₹5-lakh decisions). Users need to see the reasoning.

**Eventra Solution:** Every recommendation includes "Why recommended," "Possible risks," and the weighted score breakdown. Confidence levels are always shown. AI never claims estimates are guaranteed.

---

#### PP-19: Planning has become a second full-time job
The cumulative mental load of holding every decision, deadline, and dependency while running a normal life is itself the core pain. Not any single missed detail — the exhaustion and anxiety of carrying it all.

**Eventra Solution:** The emotional driver behind every feature. Reducing mental load is the product's primary emotional promise.

---

#### PP-20: Vendor responsiveness is unknown
Users spend significant time contacting vendors without knowing if they are active, accepting bookings, available on the date, or will respond at all.

**Eventra Solution (MVP):** Show "Last Active" signal and "Avg Response Time" on vendor cards where data is available. Full responsiveness scoring is V2.

---

## 7. Feature 1: Event Setup & Onboarding

### Description
Convert a user's fuzzy event intent into a structured, personalised budget plan through a guided multi-step form.

### User Flow
1. User clicks **"Plan My Event"** on the landing page.
2. User completes a 4-step guided form:
   - **Step 1:** Event Type, Date, City
   - **Step 2:** Guest Count, Total Budget, Number of Functions
   - **Step 3:** Required Services (checkboxes: Venue, Catering, Decor, Photography, Makeup, Entertainment, Logistics)
   - **Step 4:** Style Preference, Top 3 Priorities, Non-Negotiables
3. User clicks **"Analyse My Budget"** → redirected to Budget Feasibility screen.

### User Stories
- *As a user, I want to input my event details and budget so the system can personalise its recommendations.*
- *As a user, I want to specify my top priorities so the system knows what NOT to compromise when suggesting cuts.*
- *As a user, I want to see a progress indicator so I know how many steps are left in setup.*
- *As a user, I want a structured starting point so I stop feeling overwhelmed by a blank page.*

### Functional Requirements
| ID | Requirement |
|---|---|
| FR1.1 | Form must validate: total budget is a positive number. |
| FR1.2 | System must require exactly 3 priority selections (not more, not fewer). |
| FR1.3 | Event date must be a future date. |
| FR1.4 | Guest count must be between 10 and 5,000. |
| FR1.5 | All form data must persist in local state to drive all downstream calculations. |
| FR1.6 | Progress bar must visually indicate the current step (e.g., Step 2 of 4). |

### UI Requirements
- **Layout:** Centred multi-step card wizard, soft shadow, warm off-white background.
- **Progress Indicator:** Connected dots or linear progress bar at the top of the card.
- **Inputs:** Large, touch-friendly fields. Dropdowns for City and Event Type. Number inputs for Guest Count and Budget.
- **Checkboxes/Pills:** Tappable pill chips for Required Services and Priorities. Active state: accent violet background, white text.
- **Navigation:** "Next" and "Back" buttons. No page reload between steps.
- **Validation States:** Missing required fields highlighted in Red Critical (`#EF4444`) with inline error message.

### Open Questions
> **OQ-1:** Should we ask the user if they have already spent some of their budget (e.g., "Already paid advances: ₹50,000"), or should the MVP assume they are starting from ₹0 spent?

---

## 8. Feature 2: Budget Feasibility Analysis

### Description
Immediately after onboarding, give the user a clear, data-driven answer to the question: "Is my event budget realistic?"

### User Flow
1. System processes onboarding data immediately.
2. User is presented with a **Feasibility Score** (Realistic / Stretch / Unrealistic).
3. User views a category-by-category breakdown of recommended budget allocations.
4. User reads an **AI Insight Box** explaining why the budget is or is not feasible.
5. User can click **"Continue to Quote Analysis"** or **"Adjust My Budget"**.

### User Stories
- *As a user, I want to know immediately if my ₹8L budget is realistic for 150 guests in Mumbai.*
- *As a user, I want to see a recommended split across categories as a starting baseline.*
- *As a user, I want a clear explanation of why the system considers my budget "at risk."*
- *As a user, I want to know which categories are most likely to overshoot so I can focus my negotiation there.*

### Functional Requirements
| ID | Requirement |
|---|---|
| FR2.1 | System calculates Estimated Minimum Cost: `Guest Count × City Cost Multiplier × Service Count`. |
| FR2.2 | Score: Unrealistic if Budget < 80% of min; Stretch if 80–100%; Realistic if > 100%. |
| FR2.3 | Mandatory 10% Contingency Fund as a locked line item. |
| FR2.4 | Category breakdown: Recommended Allocation (₹ and %), Risk Status, one-line explanation. |
| FR2.5 | AI Insight box: human-readable summary sentence explaining the score. |
| FR2.6 | Each category must display market benchmark range alongside recommended allocation. |

### UI Requirements
- **Hero Element:** Large circular dial/ring chart. Green = Realistic, Amber = Stretch, Red = Unrealistic.
- **AI Insight Box:** Light tinted card with ✨ icon. Easy-to-read, prominent.
- **Category Table:** Columns: Category, Recommended ₹, % of Total, Risk Status. Inline horizontal bar graphs per row. Risk pills: Red "High Risk," Green "Low Risk."
- **CTAs:** Primary ("Continue to Quote Analysis") solid accent colour. Secondary ("Adjust My Budget") outlined.

### Open Questions
> **OQ-2:** For the prototype, do you want the feasibility logic to calculate dynamically when inputs change, or show the hardcoded Riya scenario?

---

## 9. Feature 3: Vendor Quote Upload & Analysis

### Description
The user uploads a vendor quotation. Eventra extracts all items, flags what is missing, and calculates the true Estimated Final Payable amount — answering: "What will I actually pay?"

### User Flow
1. User navigates to **Quote Analysis** and selects a vendor category.
2. User uploads a PDF/image or enters the base quoted price manually.
3. System shows a 2-second "Analysing Quote…" loading animation.
4. System displays: Base Price, Items Present ✅, Items Likely Missing ⚠️, Estimated Hidden Fees, Estimated Final Cost.
5. System displays an **AI Review Panel** with the most critical financial risk.
6. User clicks **"Add to Comparison"**.

### User Stories
- *As a user, I want to upload a messy vendor PDF and have the system tell me what charges are missing.*
- *As a user, I want to know the Estimated Final Cost, not just the base quote.*
- *As a user, I want to see a market benchmark for this category so I can tell if I am being overcharged.*
- *As a user, I want to trust the recommendation — I need to see why the AI flagged something as a risk.*

### Functional Requirements
| ID | Requirement |
|---|---|
| FR3.1 | Support simulated drag-and-drop PDF/image upload with file preview. |
| FR3.2 | Support manual text entry as an alternative to upload. |
| FR3.3 | Flag industry-standard items absent from the quote: GST, travel, overtime, setup/teardown, vendor meals. |
| FR3.4 | Estimated Final Cost = Base Quote + estimated missing fees. |
| FR3.5 | Display confidence level: High / Medium / Low based on quote completeness. |
| FR3.6 | AI Review Panel highlights the single most financially significant risk. |
| FR3.7 | Display market benchmark range for this vendor category and city. |

### UI Requirements
- **Upload Zone:** Dashed-border dropzone, cloud icon, hover state changes border and tint. "Or enter manually" link below.
- **Loading State:** Skeleton loader or pulse animation. Text: "AI is analysing your quote… looking for hidden charges."
- **Extracted Breakdown:** Split-view card. Left: base price in large font. Right: green-checked "Included" list and amber-warning "Likely Missing" list.
- **Final Cost:** Prominent callout box showing Estimated Final Cost range clearly contrasting with the base price.
- **AI Review Panel:** Amber alert box with the biggest financial risk and confidence level badge.
- **Benchmark Callout:** Small, subtle card showing "Market range for Photography in Mumbai: ₹55,000–₹95,000."

### Open Questions
> **OQ-3:** Simulated upload returning predefined extracted data for Riya's 4 vendors — acceptable for demo?

---

## 10. Feature 4: Vendor Comparison

### Description
Side-by-side comparison of shortlisted vendors using standardised Estimated Final Cost and a priority-weighted Eventra Match Score.

### User Flow
1. User navigates to **Vendor Comparison** and selects a category.
2. User views the comparison table for vendors added via Quote Analysis.
3. User reads the Eventra Match Score per vendor.
4. User expands a vendor card: Why Recommended / Possible Risks / Questions to Ask / Budget Impact.
5. User clicks **"Select This Vendor"** to commit.

### User Stories
- *As a user, I want to see all photographers side-by-side on their TRUE cost, not the starting price.*
- *As a user, I want a recommendation score that reflects my priorities, not just the vendor's average rating.*
- *As a user, I want WhatsApp-ready questions to ask the riskiest vendor.*
- *As a user, I want to understand the reasoning behind each recommendation before I commit to a ₹5-lakh decision.*

### Functional Requirements
| ID | Requirement |
|---|---|
| FR4.1 | Comparison table: Listed Price, Quoted Price, Estimated Final Price per vendor. |
| FR4.2 | Eventra Match Score = Budget Fit (40%) + Quotation Transparency (30%) + Service Match (20%) + Availability (10%). |
| FR4.3 | Badge per vendor: Best Value / Lowest Risk / Best Quality Fit / Needs Clarification / Over Budget. |
| FR4.4 | Generate 3 tailored clarification questions per vendor based on missing quote data. |
| FR4.5 | "Copy as WhatsApp Message" copies questions to clipboard with success confirmation toast. |
| FR4.6 | Vendors ranked by Eventra Match Score, not star rating alone. Score breakdown must be visible. |
| FR4.7 | Each recommendation includes "Why recommended" reasoning text. |

### UI Requirements
- **Comparison Matrix:** Side-by-side grid. Sticky vendor name headers. Mobile: stacked cards with horizontal swipe.
- **Pricing Rows:** Listed Price faded/crossed. Estimated Final Price bold and prominent.
- **Match Score:** Circular gauge at top of each vendor column, score out of 100.
- **Score Breakdown:** Small expandable tooltip showing the 4 weighted components.
- **Badges:** Coloured tags (Green = Best Value, Amber = Needs Clarification) near vendor name.
- **Expansion Area:** Accordion with risks, questions, and WhatsApp copy button (WhatsApp-green icon).

---

## 11. Feature 5: Hidden Cost Detector

### Description
A proactive educational dashboard that maps all potential hidden charges across every selected vendor category — before the user signs a contract.

### User Flow
1. User navigates to **Hidden Costs**.
2. User sees summary: "₹42,000–₹68,000 of potential hidden charges detected."
3. User expands category accordion (e.g., Catering).
4. User reads list of charges with amounts and risk levels.
5. User sees which charges are already detected in uploaded quotes vs. still unconfirmed.

### User Stories
- *As a user, I want a complete map of potential hidden charges before I sign a contract.*
- *As a user, I want to know which hidden charges are already covered in my quotes and which are still unknown.*

### Functional Requirements
| ID | Requirement |
|---|---|
| FR5.1 | Group by category: Venue, Catering, Photography, Decoration, Logistics. |
| FR5.2 | Per charge: Name, Typical Amount Range, Risk Level, Status (Detected / Unconfirmed). |
| FR5.3 | Summary "Total At-Risk Amount" range at top of screen. |
| FR5.4 | High Risk items visually distinct (amber/red badge). |

### UI Requirements
- **Summary Banner:** Large top card. Amber/red tint if risks are high. Total at-risk amount in very large font.
- **Accordions:** Collapsible panels per category. Closed state shows summary (e.g., "Catering: 4 potential risks, ₹8,000–₹18,000").
- **Risk List:** Inside accordion: warning icon for unconfirmed, checkmark for detected/cleared. Coloured pills for High/Medium/Low. Amounts right-aligned.

---

## 12. Feature 6: Change Impact Simulator

### Description
A non-destructive "What-If" sandbox. User simulates a requirement change (e.g., adding 30 guests) and sees the cascading financial impact across all categories, with recovery options.

### User Flow
1. User navigates to **Change Simulator**.
2. User selects change type: Guest Count / Budget Reduced / New Function Added / Vendor Price Increased / Premium Upgrade.
3. User inputs new value (150 → 180 guests).
4. System shows Before vs. After table with deltas highlighted.
5. System presents 2–4 Recovery Options.
6. User clicks "Preview This Recovery."

### User Stories
- *As a user, when my parents add 30 people to the guest list, I want to know exactly which costs go up and by how much.*
- *As a user, I want recovery options ranked so I can make a confident trade-off decision quickly.*

### Functional Requirements
| ID | Requirement |
|---|---|
| FR6.1 | Linear per-head cost increases for Catering, Return Gifts, Seating, Logistics. |
| FR6.2 | Display cost delta per category, not just the new total. |
| FR6.3 | 2–4 Recovery Options per simulation. |
| FR6.4 | Per Recovery Option: Estimated Saving (₹), Experience Impact, Risk Level. |
| FR6.5 | Sandbox only — does NOT automatically change the main budget. |

### UI Requirements
- **Control Panel:** Dropdown for Change Type, prominent input/slider for new value.
- **Impact View:** Before & After columns. Deltas highlighted: Red (`+₹45,000`), Green (`-₹20,000`).
- **Recovery Option Cards:** Action text, savings in green, Experience Impact rating.
- **Simulation Mode Banner:** Subtle tint or banner indicating changes are previews, not applied.

### Open Questions
> **OQ-4:** Should the simulator allow "Apply to Budget" in MVP, or remain a sandbox-only preview?

---

## 13. Feature 7: Trade-Off Advisor

### Description
When the Estimated Final Cost exceeds the Total Budget, generate 3 distinct, priority-aware recovery scenarios. Never recommend cutting a stated priority.

### User Flow
1. Dashboard detects Estimated Final Cost > Total Budget by ₹65,000.
2. User navigates to **Trade-Off Advisor**.
3. User selects priorities to protect.
4. System generates 3 distinct recovery scenarios.
5. User clicks "Explore This Scenario" for detailed breakdown.

### User Stories
- *As a user, when I am ₹65,000 over budget, I want the system to tell me what to cut based on what I care about least.*
- *As a user, I want 3 different paths so I can choose the approach that feels right.*
- *As a user, I want to understand the guest experience impact of each scenario before deciding.*

### Functional Requirements
| ID | Requirement |
|---|---|
| FR7.1 | Never recommend cutting a user's top 3 priority categories. |
| FR7.2 | Per scenario: Recommended Changes, Total Savings, Experience / Quality / Convenience Impact, Resulting Total Cost. |
| FR7.3 | Scenarios must be meaningfully distinct. |
| FR7.4 | "Guest Experience" summary sentence per scenario. |

### UI Requirements
- **Priority Selector:** Top section with adjustable toggles for protected categories.
- **Scenario Cards:** 3 large cards with: Scenario name, Total Savings in green, Impact ratings (star or bar system), summary sentence.
- **Details View:** Expandable line-item list showing exactly which categories are reduced.

---

## 14. Out of Scope for MVP

| Feature | Reason |
|---|---|
| Vendor Discovery / Directory | Competitors do this well — not our differentiation |
| Real AI/LLM quote parsing backend | Engineering complexity — simulated in prototype |
| User accounts / authentication | MVP uses local state only |
| Payment processing | V2 feature |
| Mobile native app | Web-first, responsive |
| Multi-user collaboration | V2 feature |
| Planning timeline with dependencies (PP-13) | V2 feature |
| Day-of execution coordination (PP-17) | V2 feature |
| Vendor responsiveness scoring (PP-20) | V2 — data infrastructure required |

---

## 15. Assumptions

1. Users arrive having already found vendors via external platforms.
2. All "AI" outputs in the prototype are deterministic mock responses based on Riya's sample event.
3. GST rates: 18% for Photography/Venue, 5–18% for Catering depending on venue tier.
4. City Cost Multiplier: Mumbai = 1.4x, Delhi = 1.3x, Bangalore = 1.2x, Tier-2 = 1.0x.
5. Every AI recommendation includes visible reasoning to address the trust pain point (PP-18).
6. Confidence levels are always shown — Eventra never claims estimates are guaranteed final prices.
