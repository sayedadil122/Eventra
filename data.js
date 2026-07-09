// data.js - All mock data for Eventra prototype
// Event: Demo Event - Mumbai - 18 Dec 2026
// Updated: Vendor Listings - Hotel & Farmhouse Profiles - Market Gap Analysis

const EVENTRA = {

 //  Event Details 
 event: {
 type: "Engagement", typeEmoji: "",
 date: "18 December 2026", city: "Mumbai",
 guests: 150, budget: 800000, style: "Elegant & Minimal",
 priorities: ["Food Quality", "Photography", "Guest Experience"],
 services: ["Venue", "Catering", "Decoration", "Photography", "Makeup"],
 functions: 1, userName: "Demo",
 },

 //  Budget Feasibility 
 feasibility: {
 score: "Stretch", scorePercent: 92,
 estimatedMinCost: 865000, budget: 800000, gap: -65000, contingency: 80000,
 aiInsight: "Your Rs.8,00,000 budget for 150 guests in Mumbai is achievable but tight. Venue and catering will consume ~55%. Prioritise a mid-range banquet hall and keep decor minimal. Photography and food quality can be fully protected within this plan.",
 categories: [
 { name:"Venue", icon:"building-2", recommended:240000, percent:30, risk:"Medium", explanation:"Mumbai banquet halls for 150 guests range Rs.1.8L-Rs.3L. Budget is tight but workable with the right negotiation." },
 { name:"Catering", icon:"utensils", recommended:200000, percent:25, risk:"Low", explanation:"Rs.1,333/plate for 150 guests. FeastCraft can deliver within this allocation." },
 { name:"Decoration", icon:"sparkles", recommended:80000, percent:10, risk:"Low", explanation:"Elegant & minimal style works within this. Avoid floral-heavy packages." },
 { name:"Photography", icon:"camera", recommended:80000, percent:10, risk:"Low", explanation:"Priority category. Good mid-range photographers available at Rs.65-80K in Mumbai." },
 { name:"Makeup", icon:"wand-2", recommended:40000, percent:5, risk:"Low", explanation:"Bridal makeup + trial. Within standard Mumbai market rates." },
 { name:"Entertainment",icon:"music", recommended:40000, percent:5, risk:"Medium", explanation:"DJ or live music for 150 guests. Can reduce if budget is stretched." },
 { name:"Logistics", icon:"truck", recommended:40000, percent:5, risk:"Low", explanation:"Transport, printing, gifting, coordination costs." },
 { name:"Contingency", icon:"shield", recommended:80000, percent:10, risk:"Locked", explanation:"Mandatory buffer. Do not allocate until all vendors are confirmed." },
 ]
 },

 //  Vendors 
 vendors: {
 photography: [
 {
 id:"p1", name:"Pixel Stories", category:"Photography",
 location:"Bandra, Mumbai", image:"",
 listedPrice:65000, quotedPrice:65000,
 estimatedFinalMin:82000, estimatedFinalMax:104000,
 matchScore:78, badge:"Best Value", badgeColor:"green",
 availability:true, responseTime:"< 24 hrs", lastVerified:"3 days ago",
 included:["Full-day coverage (8 hrs)","1 photographer + 1 assistant","800+ edited digital photos","Online gallery delivery in 21 days"],
 excluded:["GST 18%","Travel & fuel to venue","Printed album","Drone coverage","Overtime beyond 8 hrs"],
 quoteMissing:["GST 18% - Rs.11,700","Travel - est. Rs.4,000-Rs.8,000","Album - est. Rs.8,000-Rs.15,000","Drone - est. Rs.4,000-Rs.6,000"],
 whyRecommended:"Strong portfolio matching Elegant & Minimal style. Base price within photography budget. Most responsive vendor. Final cost manageable without album/drone add-ons.",
 risks:["GST 18% adds Rs.11,700 - confirm if included","No album in base package - family may expect one","Travel to Andheri not confirmed"],
 questions:["Is GST of 18% included in your quoted base price?","Is travel to my venue included or charged separately?","What is the overtime charge per hour if the event runs beyond 8 hours?"],
 confidence:"Medium", confidenceColor:"amber",
 scoreBreakdown:{ budgetFit:32, transparency:22, serviceMatch:16, availability:8 }
 },
 {
 id:"p2", name:"Moments by Dev", category:"Photography",
 location:"Juhu, Mumbai", image:"",
 listedPrice:55000, quotedPrice:55000,
 estimatedFinalMin:74000, estimatedFinalMax:90000,
 matchScore:65, badge:"Needs Clarification", badgeColor:"amber",
 availability:true, responseTime:"2-3 days", lastVerified:"7 days ago",
 included:["8 hours coverage","1 photographer","500+ digital photos","GST included","1 printed album"],
 excluded:["Assistant photographer","Drone","Overtime","Express delivery"],
 quoteMissing:["Travel to Andheri venue","Assistant (solo only)","Overtime rate not specified"],
 whyRecommended:"Lower base price with GST and album included. Saves Rs.8,000-Rs.15,000 on album. However, solo photographer for 150-guest event is a significant risk.",
 risks:["Solo photographer for 150-guest event - high risk of missing key moments","Slower response time - availability not confirmed","Travel not included in quote"],
 questions:["Is travel to my venue included?","Is an assistant available for the expected guest count?","What is your overtime rate beyond 8 hours?"],
 confidence:"Low", confidenceColor:"red",
 scoreBreakdown:{ budgetFit:28, transparency:18, serviceMatch:12, availability:7 }
 },
 {
 id:"p3", name:"LensArt Studio", category:"Photography",
 location:"Powai, Mumbai", image:"",
 listedPrice:78000, quotedPrice:78000,
 estimatedFinalMin:91000, estimatedFinalMax:110000,
 matchScore:52, badge:"Over Budget", badgeColor:"red",
 availability:false, responseTime:"No response yet", lastVerified:"14 days ago",
 included:["Full-day coverage","2 photographers","1000+ photos","Album included","Drone included","GST included"],
 excluded:["Overseas travel","Second venue"],
 quoteMissing:["Travel from Powai to Andheri","Availability not confirmed"],
 whyRecommended:"Most comprehensive package but exceeds Rs.80,000 photography budget even at base price. Availability unconfirmed after 14 days.",
 risks:["Availability not confirmed - 14 days no response","Over budget even at quoted price","Travel from Powai to Andheri not included"],
 questions:["Are you available for 18 December 2026 at Royal Orchid Banquet, Andheri?","Is travel from Powai to Andheri included?","Can the package be adjusted to fit a Rs.80,000 budget?"],
 confidence:"Low", confidenceColor:"red",
 scoreBreakdown:{ budgetFit:14, transparency:20, serviceMatch:16, availability:2 }
 },
 ],
 venue: [
 {
 id:"v1", name:"Royal Orchid Banquet", category:"Venue",
 location:"Andheri West, Mumbai", image:"",
 listedPrice:180000, quotedPrice:195000,
 estimatedFinalMin:220000, estimatedFinalMax:265000,
 matchScore:74, badge:"Best Value", badgeColor:"green",
 availability:true, responseTime:"< 24 hrs", lastVerified:"2 days ago",
 included:["Hall for 150 guests","Basic furniture","Air conditioning","Parking for 60 cars","Basic PA system"],
 excluded:["Decoration","Catering","Outside caterer fee applies","Extra electricity"],
 quoteMissing:["GST 18%","Service charge","Outside vendor fee","Electricity surcharge","Security deposit"],
 whyRecommended:"Best price-to-capacity ratio for 150 guests in Andheri. Allows outside caterers (with fee). Basic furniture included reduces decor cost.",
 risks:["Outside vendor fee Rs.8,000-Rs.15,000 if using FeastCraft","GST not mentioned in quote","Security deposit Rs.25,000 (refundable - confirm timeline)"],
 questions:["Is GST of 18% included in the Rs.1,95,000 quote?","What is the outside caterer fee, and does it apply to FeastCraft Catering?","Is the Rs.25,000 security deposit fully refundable and in how many days?"],
 confidence:"Medium", confidenceColor:"amber",
 scoreBreakdown:{ budgetFit:32, transparency:20, serviceMatch:14, availability:8 }
 },
 ],
 catering: [
 {
 id:"c1", name:"FeastCraft Catering", category:"Catering",
 location:"Bandra, Mumbai", image:"",
 listedPrice:1200, listedUnit:"/plate", quotedPrice:185000,
 estimatedFinalMin:210000, estimatedFinalMax:240000,
 matchScore:82, badge:"Best Quality Fit", badgeColor:"violet",
 availability:true, responseTime:"< 12 hrs", lastVerified:"1 day ago",
 included:["Full veg menu - 4 starters, 2 mains, 3 desserts","Basic crockery and cutlery","Serving staff (8 persons)","Setup and service for 4 hours"],
 excluded:["Vendor meals for photographer/decorator","Water bottles","Extra plates beyond 150","Transport from kitchen","Overtime beyond 4 hours"],
 quoteMissing:["Vendor meals (est. 20 pax) - Rs.6,000-Rs.10,000","Water & beverages - Rs.3,000-Rs.6,000","Transport - Rs.2,000-Rs.4,000","GST 5%"],
 whyRecommended:"Highest Eventra Match Score. Serving staff included, strong event reviews. Transparent inclusions. Menu matches the selected style.",
 risks:["Vendor meals for photographer and decorator not included - est. Rs.6,000-Rs.10,000","Extra plates at Rs.1,400/head if guest count increases","GST 5% not confirmed in quote"],
 questions:["Are vendor meals for the photographer and decorator team (approx. 15 people) included?","Is transport from your kitchen to the venue included?","Is GST 5% included in the Rs.1,85,000 total?"],
 confidence:"High", confidenceColor:"green",
 scoreBreakdown:{ budgetFit:36, transparency:24, serviceMatch:16, availability:6 }
 },
 ],
 decoration: [
 {
 id:"d1", name:"Aura Events Decor", category:"Decoration",
 location:"Malad, Mumbai", image:"",
 listedPrice:95000, quotedPrice:95000,
 estimatedFinalMin:115000, estimatedFinalMax:130000,
 matchScore:61, badge:"Over Budget", badgeColor:"red",
 availability:true, responseTime:"< 24 hrs", lastVerified:"1 day ago",
 included:["Stage backdrop","Table centrepieces for 15 tables","Entrance arch","Floral arrangements"],
 excluded:["Setup labour","Teardown","Transport from warehouse","Electricity for lighting","Furniture rental"],
 quoteMissing:["Setup labour - Rs.8,000-Rs.12,000","Teardown - Rs.5,000-Rs.8,000","Transport - Rs.3,000-Rs.5,000"],
 whyRecommended:"Good portfolio for Elegant & Minimal. Responsive and available. Base price Rs.15,000 over decoration budget and hidden costs push total further over.",
 risks:["Setup and teardown not included - adds Rs.13,000-Rs.20,000","Total estimated Rs.35,000-Rs.50,000 over Rs.80,000 budget"],
 questions:["Is setup labour for installation included in your Rs.95,000 quote?","Is teardown and removal of materials included or charged separately?","Is transport from your Malad warehouse to the venue included?"],
 confidence:"Medium", confidenceColor:"amber",
 scoreBreakdown:{ budgetFit:18, transparency:20, serviceMatch:16, availability:7 }
 },
 ]
 },

 //  Hidden Costs 
 hiddenCosts: {
 totalMin:42000, totalMax:68000, totalFlagged:12, totalConfirmed:3,
 categories: [
 {
 name:"Venue", icon:"building-2", riskCount:6, rangeMin:15000, rangeMax:28000,
 items:[
 { name:"GST 18%", amount:"Rs.32,400-Rs.39,600", risk:"High", status:"unconfirmed" },
 { name:"Service charge", amount:"Rs.9,000-Rs.18,000", risk:"High", status:"unconfirmed" },
 { name:"Electricity surcharge",amount:"Rs.3,000-Rs.8,000", risk:"Medium", status:"unconfirmed" },
 { name:"Outside vendor fee", amount:"Rs.5,000-Rs.15,000", risk:"High", status:"unconfirmed" },
 { name:"Corkage fee", amount:"Rs.0-Rs.5,000", risk:"Low", status:"not-applicable" },
 { name:"Security deposit", amount:"Rs.25,000", risk:"Medium", status:"confirmed" },
 ]
 },
 {
 name:"Catering", icon:"utensils", riskCount:4, rangeMin:12000, rangeMax:22000,
 items:[
 { name:"Vendor meals (20 pax)",amount:"Rs.6,000-Rs.10,000", risk:"High", status:"unconfirmed" },
 { name:"Water & beverages", amount:"Rs.3,000-Rs.6,000", risk:"Medium", status:"unconfirmed" },
 { name:"Extra plate cost", amount:"Rs.800-Rs.1,400/head",risk:"Medium", status:"unconfirmed" },
 { name:"Service staff", amount:"Rs.4,000-Rs.8,000", risk:"Medium", status:"confirmed" },
 ]
 },
 {
 name:"Photography", icon:"camera", riskCount:5, rangeMin:8000, rangeMax:18000,
 items:[
 { name:"GST 18%", amount:"Rs.11,700", risk:"High", status:"unconfirmed" },
 { name:"Travel & fuel", amount:"Rs.4,000-Rs.8,000", risk:"High", status:"unconfirmed" },
 { name:"Printed album", amount:"Rs.8,000-Rs.15,000", risk:"Medium", status:"unconfirmed" },
 { name:"Drone coverage", amount:"Rs.4,000-Rs.6,000", risk:"Low", status:"unconfirmed" },
 { name:"Overtime/hr", amount:"Rs.3,500/hr", risk:"Medium", status:"unconfirmed" },
 ]
 },
 {
 name:"Decoration", icon:"sparkles", riskCount:4, rangeMin:7000, rangeMax:12000,
 items:[
 { name:"Setup labour", amount:"Rs.8,000-Rs.12,000", risk:"High", status:"unconfirmed" },
 { name:"Teardown charges", amount:"Rs.5,000-Rs.8,000", risk:"Medium", status:"unconfirmed" },
 { name:"Transport", amount:"Rs.3,000-Rs.5,000", risk:"Low", status:"unconfirmed" },
 { name:"Electricity", amount:"Rs.1,500-Rs.3,000", risk:"Low", status:"confirmed" },
 ]
 },
 ]
 },

 //  Simulator 
 simulator: {
 changeTypes:[
 { value:"guests", label:"Increase Guest Count" },
 { value:"budget", label:"Reduce Total Budget" },
 { value:"function", label:"Add New Function" },
 { value:"vendor-price", label:"Vendor Increased Price" },
 { value:"upgrade", label:"Premium Upgrade Selected" },
 ],
 guestImpact:{
 from:150, to:180, delta:30,
 rows:[
 { name:"Catering", before:185000, after:221000, delta:36000, affected:true },
 { name:"Venue", before:195000, after:215000, delta:20000, affected:true },
 { name:"Seating", before:30000, after:36000, delta:6000, affected:true },
 { name:"Return Gifts", before:15000, after:18000, delta:3000, affected:true },
 { name:"Logistics", before:40000, after:46000, delta:6000, affected:true },
 { name:"Photography", before:65000, after:65000, delta:0, affected:false },
 { name:"Decoration", before:95000, after:95000, delta:0, affected:false },
 { name:"Makeup", before:40000, after:40000, delta:0, affected:false },
 ],
 totalBefore:800000, totalAfter:871000, totalDelta:71000,
 },
 recoveryOptions:[
 { title:"Reduce Decoration Package", saving:40000, action:"Downgrade Aura Events to standard package - remove floral arch, keep table centrepieces.", experienceImpact:"Low", stars:3, risk:"Low", riskColor:"green" },
 { title:"Switch to Budget Caterer", saving:30000, action:"Replace FeastCraft with a mid-range caterer at Rs.900/plate. Similar menu, slightly reduced presentation.", experienceImpact:"Medium", stars:2, risk:"Medium", riskColor:"amber" },
 { title:"Reduce Guest Count by 20", saving:48000, action:"Bring guest count back to 160. Prioritise immediate family and close friends.", experienceImpact:"High", stars:1, risk:"Low", riskColor:"green" },
 { title:"Use Contingency Budget", saving:0, usesContingency:71000, contingencyRemaining:9000, action:"Draw Rs.71,000 from the reserved contingency. Only Rs.9,000 remains as buffer.", experienceImpact:"None", stars:5, risk:"High", riskColor:"red" },
 ]
 },

 //  Trade-Off Advisor 
 tradeoff: {
 overBudgetBy:65000, estimatedFinal:865000, budget:800000,
 protectedDefault:["Food Quality","Photography","Guest Experience"],
 allPriorities:["Food Quality","Venue","Decor","Photography","Entertainment","Convenience","Guest Experience"],
 scenarios:[
 {
 title:"Minimal Decor Approach", chip:"Saves Most", saving:55000, resultingTotal:810000,
 changes:[
 { category:"Decoration", change:"Downgrade to standard package - remove floral arch", saving:35000 },
 { category:"Entertainment",change:"Remove live DJ, use background playlist", saving:15000 },
 { category:"Invitations", change:"Switch to digital invitations", saving:5000 },
 ],
 experienceImpact:"Low", qualityImpact:"Low", convenienceImpact:"Low",
 guestNote:"Guests will notice simpler decor but food quality, photography, and the overall atmosphere remain excellent.",
 withinBudget:false
 },
 {
 title:"Venue Swap: Sahara Star", chip:"Balanced", saving:134400, resultingTotal:730600,
 changes:[
 { category:"Venue", change:"Switch from JW Marriott to Sahara Star (Rs.2500/plate)", saving:134400 },
 { category:"Makeup", change:"Remove pre-event makeup trial session", saving:5000 },
 { category:"Logistics", change:"Reduce transport to local vendors only", saving:5000 },
 ],
 vendorTrustInfo: {
 name: "Sahara Star",
 rating: 4.6,
 reviews: 320,
 location: "Vile Parle East, Mumbai",
 highlight: "Grand tropical indoor lagoon with ultra-spacious banquets.",
 badges: ["Eventra Verified", "Transparent Billing History", "Quick Response Time"]
 },
 experienceImpact:"Medium", qualityImpact:"Low", convenienceImpact:"Low",
 guestNote:"Sahara Star maintains premium luxury while drastically cutting per-plate and service costs compared to beachfront properties.",
 withinBudget:true
 },
 {
 title:"Moderate Guest Reduction", chip:"Lowest Risk", saving:65000, resultingTotal:800000,
 changes:[
 { category:"Catering", change:"Reduce from 150 to 120 guests", saving:36000 },
 { category:"Return Gifts", change:"Remove return gifts entirely", saving:12000 },
 { category:"Seating & Logistics",change:"Reduce seating and logistics proportionally", saving:17000 },
 ],
 experienceImpact:"High", qualityImpact:"None", convenienceImpact:"Low",
 guestNote:"Reducing the guest list is the most financially effective option but requires a thoughtful conversation with family.",
 withinBudget:true
 }
 ]
 },

 //  Vendor Questions 
 questions: {
 Venue:[
 "Is GST of 18% included in the quoted price?",
 "Are outside caterers and decorators allowed? If so, what is the outside vendor fee?",
 "Is decoration setup and breakdown time included in the venue booking hours?",
 "What is the overtime charge if the event runs beyond the booked time?",
 "Is the security deposit fully refundable, and in how many days?",
 "Are electricity charges for extra lighting or sound equipment included?",
 "Is backup power (generator) available in case of power failure?",
 "Is parking included for all 150 guests?",
 "Is there a minimum food and beverage commitment?",
 "Are cleaning fees charged separately after the event?",
 ],
 Catering:[
 "Is GST included in the per-plate or total quoted price?",
 "Are vendor meals for the photographer, decorator, and planner team included?",
 "Is transport from your kitchen to the venue included in the quote?",
 "What is the cost per additional plate if the guest count increases?",
 "Are drinking water and beverages included or charged separately?",
 "How many serving staff are included, and are additional staff charged separately?",
 "Is crockery and cutlery included or do we need to arrange it?",
 "What is your cancellation and rescheduling policy?",
 ],
 Photography:[
 "Is GST of 18% included in the quoted price?",
 "Is travel and fuel to the venue included or charged separately?",
 "What is the overtime rate if the event runs beyond the contracted hours?",
 "Is a printed or digital album included, or is it an additional charge?",
 "Is drone coverage included or available as an add-on?",
 "Is a second photographer included or available for a 150-guest event?",
 "What is your delivery timeline for edited photos?",
 "What is your cancellation policy and advance payment terms?",
 ],
 Decoration:[
 "Is setup labour for installation included in the quoted price?",
 "Is teardown and removal of all materials included or charged separately?",
 "Is transport from your warehouse to the venue included?",
 "Are electricity charges for lighting and electrical decor included?",
 "Is furniture rental included or separate?",
 "What happens if specific floral items are unavailable on the event date?",
 "Is the decor fully customisable to our Elegant & Minimal preference?",
 "What is your cancellation and advance payment policy?",
 ],
 Makeup:[
 "Is the makeup trial session included in the quoted price?",
 "Is travel to the venue or getting-ready location included?",
 "How many hours does the bridal makeup session take?",
 "Are touch-ups during the event included or charged separately?",
 "What brands and products do you use?",
 "What is your cancellation and rescheduling policy?",
 ],
 },

 //  Dashboard 
 dashboard: {
 totalBudget:800000, committed:345000, estimatedFinal:865000,
 remaining:455000, contingency:80000, contingencyUsed:0,
 vendorsSelected:2, hiddenCostWarnings:9, pendingDecisions:3,
 nextBestDecision:{
 title:"Confirm Royal Orchid Banquet hidden charges",
 description:"Ask whether the outside vendor fee (Rs.8,000-Rs.15,000) applies to FeastCraft Catering before paying the Rs.50,000 advance. This one question could save or cost Rs.15,000.",
 urgency:"High", deadline:"Before 15 Aug 2026"
 },
 payments:[
 { vendor:"Royal Orchid Banquet", amount:50000, type:"Advance (25%)", dueDate:"15 Aug 2026", status:"pending" },
 { vendor:"FeastCraft Catering", amount:45000, type:"Advance", dueDate:"1 Sep 2026", status:"pending" },
 { vendor:"Pixel Stories", amount:32500, type:"Advance (50%)", dueDate:"15 Sep 2026", status:"pending" },
 { vendor:"Aura Events Decor", amount:47500, type:"Advance (50%)", dueDate:"1 Oct 2026", status:"pending" },
 { vendor:"Royal Orchid Banquet", amount:145000, type:"Balance", dueDate:"17 Dec 2026", status:"future" },
 { vendor:"FeastCraft Catering", amount:140000, type:"Balance", dueDate:"18 Dec 2026", status:"future" },
 ],
 categorySpend:[
 { name:"Venue", allocated:240000, committed:195000, color:"#7C6FF7" },
 { name:"Catering", allocated:200000, committed:185000, color:"#F97066" },
 { name:"Photography", allocated:80000, committed:65000, color:"#10B981" },
 { name:"Decoration", allocated:80000, committed:0, color:"#F59E0B" },
 { name:"Makeup", allocated:40000, committed:0, color:"#94A3B8" },
 { name:"Contingency", allocated:80000, committed:0, color:"#E5E7EB" },
 ],
 recentChanges:[
 { date:"2 Jul", description:"Photography quote from Pixel Stories uploaded and analysed", type:"info" },
 { date:"1 Jul", description:"Royal Orchid advance payment deadline confirmed: 15 Aug", type:"warning" },
 { date:"30 Jun",description:"FeastCraft Catering quote added to comparison", type:"info" },
 ]
 },

 //  Pain Points (Discovery Screen) 
 painPoints:[
 { id:"PP-01", priority:"must", title:"True final event cost is unclear", description:"Users budget Rs.10-12L for 200 guests but have no way to verify if that's realistic for their city and requirements.", icon:"calculator" },
 { id:"PP-02", priority:"must", title:"Hidden charges appear too late", description:"GST, service charges, vendor meals, setup labour - discovered at final billing, not during planning.", icon:"eye-off" },
 { id:"PP-03", priority:"must", title:"Quotations are impossible to compare", description:"One caterer includes staff, another doesn't. One photographer includes GST, another adds it later. No standard format exists.", icon:"git-compare" },
 { id:"PP-04", priority:"must", title:"Budget realism is unknown", description:"Users enter planning not knowing whether their budget can support the event at their required scale and location.", icon:"help-circle" },
 { id:"PP-05", priority:"must", title:"Generic filters give misleading matches",description:"'Starting at Rs.40,000' becomes Rs.74,000 after travel, overtime, album, drone, and GST are added.", icon:"filter-x" },
 { id:"PP-06", priority:"must", title:"No way to know if you're overcharged", description:"No trusted benchmarks. Users can't tell if a high quotation is justified by quality or is simply inflated.", icon:"trending-up" },
 { id:"PP-07", priority:"should", title:"Vendors may not respond", description:"Users spend weeks contacting vendors who appear active on platforms but haven't checked their inbox in months.", icon:"wifi-off" },
 { id:"PP-08", priority:"must", title:"Requirement changes break the budget", description:"Adding 30 guests affects catering, venue, seating, gifts, and logistics - but users must recalculate everything manually.", icon:"refresh-ccw" },
 { id:"PP-09", priority:"must", title:"Trade-offs are overwhelming", description:"When over budget, users don't know what to cut. They often reduce the wrong categories or make decisions driven by emotion.", icon:"scale" },
 { id:"PP-10", priority:"supporting",title:"Planning information is fragmented", description:"Quotes in PDFs, conversations in WhatsApp, budgets in spreadsheets, decisions in memory. No single source of truth.", icon:"layers" },
 { id:"PP-11", priority:"future", title:"Event software is too complex", description:"Enterprise tools are designed for IT teams and procurement, not for occasional event organisers.", icon:"puzzle" },
 { id:"PP-12", priority:"must", title:"'I don't know where to start'", description:"Users can picture their event but can't translate vague intent into a concrete plan, budget structure, or vendor shortlist.", icon:"compass" },
 { id:"PP-13", priority:"should", title:"Wrong planning sequence", description:"Users book caterers before venues, send invites before confirming dates. The dependencies of event planning are invisible.", icon:"list-ordered" },
 { id:"PP-14", priority:"should", title:"Choice overload at discovery", description:"50 venues, 40 photographers, all showing 4.8 stars. Users freeze before price even enters the picture.", icon:"split" },
 { id:"PP-15", priority:"must", title:"No single source of truth", description:"Different WhatsApp messages, different numbers, different versions. Nobody has the same information at the same time.", icon:"database" },
 { id:"PP-16", priority:"future", title:"Multiple stakeholders, no shared view", description:"Partner, parents, in-laws - all weighing in, none looking at the same version of the plan. The organiser becomes the human sync layer.", icon:"users" },
 { id:"PP-17", priority:"future", title:"Day-of execution risk", description:"A perfect paper plan still breaks when the caterer is late and two vendors need to coordinate through the organiser at 8am.", icon:"alert-triangle" },
 { id:"PP-18", priority:"must", title:"Trust in AI recommendations", description:"Black-box 'here's your vendor' won't earn a Rs.5-lakh decision. Users need to see the reasoning behind every recommendation.", icon:"shield-check" },
 { id:"PP-19", priority:"emotional", title:"Planning is a second full-time job", description:"The cumulative mental load of holding every decision, deadline, and dependency while running a normal life is itself the core pain.", icon:"brain" },
 { id:"PP-20", priority:"should", title:"Vendor responsiveness unknown", description:"Is this vendor active? Have they seen my enquiry? Will they respond before I miss the availability window?", icon:"message-square-off" },
 ],

 //  Metrics (Discovery Screen) 
 metrics:{
 northStar:"Percentage of users who create a feasible event plan and stay within their defined budget",
 supporting:[
 "Budget feasibility completion rate",
 "Vendor quote upload rate",
 "Hidden-cost detection rate",
 "Vendor comparison completion rate",
 "% of selected vendors within estimated final budget",
 "Average estimated overspend prevented per user (Rs.)",
 "Trade-off recommendation acceptance rate",
 "Event plan completion rate",
 "User-reported confidence score after planning",
 "Returning users after requirement changes",
 ]
 },

 //  Market Gap Analysis 
 marketGaps: [
 { title: "No Realistic Cost Estimation", description: "Existing platforms show 'starting at' prices which are highly misleading. Vendors rarely sell at the starting price, leaving users severely under-budgeted.", status: "Gap Identified" },
 { title: "Manual Vendor Quotation Comparison", description: "Users manually compare PDFs and Excel sheets to understand what's included and what's missing across different vendor quotes.", status: "Gap Identified" },
 { title: "Hidden Charges Discovery", description: "GST, travel, overtime, and auxiliary charges are often omitted from initial quotes, leading to 20-40% budget overruns when finally billed.", status: "Gap Identified" },
 { title: "Budget Recovery & Trade-off Advice", description: "When users go over budget, they don't know what to cut safely. No tool provides AI-driven trade-offs protecting user priorities.", status: "Gap Identified" },
 { title: "Availability Verification", description: "Vendor directories show profiles but lack real-time availability and responsiveness tracking, wasting users' time inquiring with inactive vendors.", status: "Gap Identified" }
 ],

 //  Vendor Profiles (Directory) 
 vendorProfiles: [
 { id: "v1", type: "Hotel", name: "JW Marriott Juhu", location: "Juhu, Mumbai", lat: 19.1024, lng: 72.8267, rating: 4.8, reviews: 450, startingPrice: 3200, priceUnit: "per plate", capacity: "100-1000 pax", tags: ["Luxury", "Beachfront", "Premium Catering"], image: "", description: "Iconic luxury beachfront hotel offering grand ballrooms, world-class culinary experiences, and breathtaking sunset views over the Arabian Sea." },
 { id: "v2", type: "Hotel", name: "Sahara Star", location: "Vile Parle East, Mumbai", lat: 19.0957, lng: 72.8531, rating: 4.6, reviews: 320, startingPrice: 2500, priceUnit: "per plate", capacity: "100-1500 pax", tags: ["Indoor Lagoon", "Airport Proximity", "Grand Decor"], image: "", description: "Architectural masterpiece featuring a tropical lagoon, massive central dome, and ultra-spacious banquet halls perfect for grand Indian weddings." },
 { id: "v3", type: "Hotel", name: "Taj Santacruz", location: "Santacruz, Mumbai", lat: 19.0930, lng: 72.8547, rating: 4.7, reviews: 290, startingPrice: 3250, priceUnit: "per plate", capacity: "100-800 pax", tags: ["Opulent", "Chandelier Ballrooms", "Heritage Brand"], image: "", description: "Blending classic Taj hospitality with modern opulence, offering palatial ballrooms and exceptional bespoke menus." },
 { id: "v4", type: "Farmhouse", name: "Della Resorts (Lawn)", location: "Lonavala (Near Mumbai)", lat: 18.7546, lng: 73.4052, rating: 4.5, reviews: 180, startingPrice: 250000, priceUnit: "per day", capacity: "100-500 pax", tags: ["Destination", "Hill Station", "Luxury Resort"], image: "", description: "Sprawling luxury adventure resort offering multiple outdoor lawns and indoor banquets for high-end destination weddings." },
 { id: "v5", type: "Photographer", name: "Wedding Nama", location: "Mumbai", lat: 19.0760, lng: 72.8777, rating: 4.9, reviews: 310, startingPrice: 150000, priceUnit: "per day", capacity: "N/A", tags: ["Candid", "Cinematic", "Celebrity Choice"], image: "", description: "Premium wedding photography and filmmaking team known for capturing raw emotions and cinematic storytelling." },
 { id: "v6", type: "Decorator", name: "The Wedding Design Co.", location: "Mumbai", lat: 19.1176, lng: 72.9060, rating: 4.8, reviews: 145, startingPrice: 300000, priceUnit: "per event", capacity: "N/A", tags: ["Bespoke Sets", "Floral Art", "Luxury"], image: "", description: "High-end bespoke event styling, creating immersive environments and theatrical floral setups for luxury events." },
 { id: "ch1", type: "Hotel", name: "ITC Grand Chola", location: "Guindy, Chennai", lat: 13.0106, lng: 80.2206, rating: 4.7, reviews: 520, startingPrice: 2400, priceUnit: "per plate", capacity: "100-1500 pax", tags: ["Luxury", "Grand Ballrooms", "South Indian Menus"], image: "", description: "Large-format luxury hotel with multiple banquet spaces and strong catering capability for premium Chennai events." },
 { id: "ch2", type: "Hotel", name: "Taj Coromandel", location: "Nungambakkam, Chennai", lat: 13.0569, lng: 80.2425, rating: 4.6, reviews: 410, startingPrice: 2300, priceUnit: "per plate", capacity: "80-700 pax", tags: ["Central", "Premium", "Banquet"], image: "", description: "Central Chennai luxury hotel suited for polished weddings, receptions, corporate events, and family celebrations." },
 { id: "ch3", type: "Farmhouse", name: "Green Meadows Resort", location: "Palavakkam, Chennai", lat: 12.9613, lng: 80.2545, rating: 4.2, reviews: 190, startingPrice: 175000, priceUnit: "per day", capacity: "80-500 pax", tags: ["Resort", "Outdoor", "ECR"], image: "", description: "Resort-style event space with lawn and banquet options for mid-size Chennai celebrations." },
 { id: "ch4", type: "Photographer", name: "Zero Gravity Photography", location: "Chennai", lat: 13.0827, lng: 80.2707, rating: 4.6, reviews: 220, startingPrice: 85000, priceUnit: "per day", capacity: "N/A", tags: ["Wedding", "Candid", "Video"], image: "", description: "Chennai photography team suitable for wedding, engagement, and reception coverage." },
 { id: "ch5", type: "Decorator", name: "Marriage Colours", location: "Chennai", lat: 13.0827, lng: 80.2707, rating: 4.4, reviews: 160, startingPrice: 90000, priceUnit: "per event", capacity: "N/A", tags: ["Stage", "Floral", "Traditional"], image: "", description: "Chennai event decor team focused on stage, floral, mandap, and reception styling." },
 { id: "dl1", type: "Hotel", name: "ITC Maurya", location: "Chanakyapuri, Delhi", lat: 28.5975, lng: 77.1734, rating: 4.7, reviews: 560, startingPrice: 3000, priceUnit: "per plate", capacity: "100-1200 pax", tags: ["Luxury", "Diplomatic Enclave", "Premium Catering"], image: "", description: "Premium Delhi hotel with established banquet operations for high-end weddings and formal events." },
 { id: "dl2", type: "Hotel", name: "The Leela Ambience", location: "Gurugram, Delhi NCR", lat: 28.5034, lng: 77.0975, rating: 4.6, reviews: 480, startingPrice: 2800, priceUnit: "per plate", capacity: "100-1500 pax", tags: ["NCR", "Luxury", "Large Banquets"], image: "", description: "Large luxury NCR property with strong capacity for weddings, receptions, and corporate events." },
 { id: "dl3", type: "Farmhouse", name: "Tivoli Garden Resort", location: "Chattarpur, Delhi", lat: 28.4965, lng: 77.1832, rating: 4.2, reviews: 310, startingPrice: 260000, priceUnit: "per day", capacity: "150-1500 pax", tags: ["Farmhouse", "Outdoor", "Large Gatherings"], image: "", description: "Chattarpur event property suited for outdoor weddings and larger Delhi NCR celebrations." },
 { id: "dl4", type: "Photographer", name: "Knotty Days", location: "Delhi", lat: 28.6139, lng: 77.2090, rating: 4.6, reviews: 210, startingPrice: 110000, priceUnit: "per day", capacity: "N/A", tags: ["Wedding", "Candid", "Films"], image: "", description: "Delhi NCR wedding photography and films team for full-day celebration coverage." },
 { id: "dl5", type: "Decorator", name: "FNP Weddings & Events", location: "Delhi NCR", lat: 28.6139, lng: 77.2090, rating: 4.5, reviews: 340, startingPrice: 180000, priceUnit: "per event", capacity: "N/A", tags: ["Luxury Decor", "Floral", "Production"], image: "", description: "Large event decor and production team for premium Delhi NCR weddings and celebrations." },
 { id: "bg1", type: "Hotel", name: "The Leela Palace Bengaluru", location: "Old Airport Road, Bangalore", lat: 12.9607, lng: 77.6481, rating: 4.7, reviews: 520, startingPrice: 2800, priceUnit: "per plate", capacity: "80-900 pax", tags: ["Luxury", "Palace Style", "Premium"], image: "", description: "Luxury Bengaluru venue with ornate interiors and polished banquet service." },
 { id: "bg2", type: "Hotel", name: "Taj West End", location: "Race Course Road, Bangalore", lat: 12.9846, lng: 77.5847, rating: 4.7, reviews: 430, startingPrice: 2700, priceUnit: "per plate", capacity: "80-800 pax", tags: ["Heritage", "Green Setting", "Premium"], image: "", description: "Heritage-style luxury hotel suitable for elegant weddings and intimate premium celebrations." },
 { id: "bg3", type: "Farmhouse", name: "Temple Tree Leisure", location: "Kanakapura Road, Bangalore", lat: 12.7801, lng: 77.5058, rating: 4.4, reviews: 260, startingPrice: 220000, priceUnit: "per day", capacity: "100-1000 pax", tags: ["Outdoor", "Destination", "Lawn"], image: "", description: "Outdoor event venue with lawns and destination-event feel near Bangalore." },
 { id: "bg4", type: "Photographer", name: "Photo Alchemy", location: "Bangalore", lat: 12.9716, lng: 77.5946, rating: 4.5, reviews: 180, startingPrice: 95000, priceUnit: "per day", capacity: "N/A", tags: ["Candid", "Wedding", "Films"], image: "", description: "Bangalore-based wedding photography team for candid event coverage." },
 { id: "bg5", type: "Decorator", name: "WEDStyle Decor", location: "Bangalore", lat: 12.9716, lng: 77.5946, rating: 4.3, reviews: 150, startingPrice: 105000, priceUnit: "per event", capacity: "N/A", tags: ["Stage", "Floral", "Modern"], image: "", description: "Bangalore decor team for stage styling, floral setups, and event ambience." },
 { id: "hy1", type: "Hotel", name: "Taj Falaknuma Palace", location: "Falaknuma, Hyderabad", lat: 17.3301, lng: 78.4675, rating: 4.8, reviews: 500, startingPrice: 3200, priceUnit: "per plate", capacity: "80-800 pax", tags: ["Palace", "Luxury", "Heritage"], image: "", description: "Iconic Hyderabad palace venue for premium celebrations and destination-style events." },
 { id: "hy2", type: "Hotel", name: "Novotel HICC", location: "HITEC City, Hyderabad", lat: 17.4726, lng: 78.3722, rating: 4.5, reviews: 420, startingPrice: 2100, priceUnit: "per plate", capacity: "100-2500 pax", tags: ["Convention", "Large Capacity", "Business"], image: "", description: "Large-format hotel and convention venue suitable for weddings and corporate events." },
 { id: "hy3", type: "Farmhouse", name: "Leonia Holistic Destination", location: "Shamirpet, Hyderabad", lat: 17.5922, lng: 78.5734, rating: 4.2, reviews: 300, startingPrice: 190000, priceUnit: "per day", capacity: "100-1200 pax", tags: ["Resort", "Destination", "Outdoor"], image: "", description: "Resort destination property with large event spaces outside central Hyderabad." },
 { id: "hy4", type: "Photographer", name: "Camera Crew", location: "Hyderabad", lat: 17.3850, lng: 78.4867, rating: 4.5, reviews: 190, startingPrice: 85000, priceUnit: "per day", capacity: "N/A", tags: ["Wedding", "Candid", "Films"], image: "", description: "Hyderabad wedding photography team for full-day photo and film coverage." },
 { id: "hy5", type: "Decorator", name: "Vivaah Decor", location: "Hyderabad", lat: 17.3850, lng: 78.4867, rating: 4.4, reviews: 170, startingPrice: 95000, priceUnit: "per event", capacity: "N/A", tags: ["Traditional", "Floral", "Stage"], image: "", description: "Hyderabad event styling team for stage, mandap, floral, and reception decor." },
 { id: "pn1", type: "Hotel", name: "JW Marriott Pune", location: "Senapati Bapat Road, Pune", lat: 18.5322, lng: 73.8294, rating: 4.6, reviews: 420, startingPrice: 2400, priceUnit: "per plate", capacity: "80-1000 pax", tags: ["Luxury", "Central", "Banquet"], image: "", description: "Premium Pune hotel with flexible banquet spaces for weddings and corporate events." },
 { id: "pn2", type: "Hotel", name: "Conrad Pune", location: "Sangamvadi, Pune", lat: 18.5358, lng: 73.8838, rating: 4.6, reviews: 390, startingPrice: 2300, priceUnit: "per plate", capacity: "80-800 pax", tags: ["Luxury", "Modern", "Central"], image: "", description: "Modern luxury property for polished Pune weddings, receptions, and business events." },
 { id: "pn3", type: "Farmhouse", name: "The Corinthians Resort", location: "Mohammed Wadi, Pune", lat: 18.4584, lng: 73.9143, rating: 4.4, reviews: 350, startingPrice: 190000, priceUnit: "per day", capacity: "100-1200 pax", tags: ["Resort", "Outdoor", "Destination"], image: "", description: "Resort-style venue with lawns and banquet spaces for larger Pune celebrations." },
 { id: "pn4", type: "Photographer", name: "WhatKnot Photography", location: "Pune", lat: 18.5204, lng: 73.8567, rating: 4.5, reviews: 220, startingPrice: 90000, priceUnit: "per day", capacity: "N/A", tags: ["Wedding", "Candid", "Films"], image: "", description: "Wedding photography team available for Pune celebrations and destination events." },
 { id: "pn5", type: "Decorator", name: "DreamzKrraft Pune", location: "Pune", lat: 18.5204, lng: 73.8567, rating: 4.3, reviews: 180, startingPrice: 100000, priceUnit: "per event", capacity: "N/A", tags: ["Decor", "Production", "Floral"], image: "", description: "Event decor and production team for Pune weddings, receptions, and social events." },
 ],

 //  Landing Testimonials 
 testimonials:[
 { name:"Priya M.", role:"Bride - Mumbai", quote:"I thought my Rs.12L budget was fine. Eventra showed me it was Rs.2.4L short before I signed a single contract. Saved me from a nightmare.", avatar:"PM" },
 { name:"Karan S.", role:"Event Host - Bangalore", quote:"The hidden cost detector caught Rs.38,000 in charges I would have discovered on billing day. That's not a feature - that's peace of mind.", avatar:"KS" },
 { name:"Ananya R.", role:"Planning a Wedding - Delhi", quote:"I had three photographers at similar prices. Eventra's comparison showed one was Rs.22,000 cheaper on true final cost. The choice was obvious.", avatar:"AR" },
 ]
};

//  Helper: Format Indian Rupees 
function formatINR(amount) {
 if (amount >= 100000) return "Rs." + (amount/100000).toFixed(amount%100000===0?0:1) + "L";
 if (amount >= 1000) return "Rs." + (amount/1000).toFixed(0) + "K";
 return "Rs." + amount.toLocaleString("en-IN");
}
function formatINRFull(amount) {
 return "Rs." + amount.toLocaleString("en-IN");
}

