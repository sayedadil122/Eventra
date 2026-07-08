export function seedData() {
  const now = new Date().toISOString();
  return {
    users: [],
    events: [
      {
        id: "sample-event",
        userId: "demo",
        name: "Sample Event",
        eventType: "Wedding",
        eventDate: "2026-12-18",
        city: "Mumbai",
        guestCount: 150,
        totalBudget: 800000,
        functions: 1,
        services: ["Venue", "Catering", "Decoration", "Photography", "Makeup"],
        priorities: ["Food Quality", "Photography", "Guest Experience"],
        style: "Elegant & Minimal",
        status: "planning",
        createdAt: now,
        updatedAt: now
      }
    ],
    budgetCategories: [
      { id: "bc-venue", eventId: "sample-event", name: "Venue", recommended: 240000, percent: 30, risk: "Medium", locked: false },
      { id: "bc-catering", eventId: "sample-event", name: "Catering", recommended: 200000, percent: 25, risk: "Low", locked: false },
      { id: "bc-decoration", eventId: "sample-event", name: "Decoration", recommended: 80000, percent: 10, risk: "Low", locked: false },
      { id: "bc-photo", eventId: "sample-event", name: "Photography", recommended: 80000, percent: 10, risk: "Low", locked: false },
      { id: "bc-makeup", eventId: "sample-event", name: "Makeup", recommended: 40000, percent: 5, risk: "Low", locked: false },
      { id: "bc-entertainment", eventId: "sample-event", name: "Entertainment", recommended: 40000, percent: 5, risk: "Medium", locked: false },
      { id: "bc-logistics", eventId: "sample-event", name: "Logistics", recommended: 40000, percent: 5, risk: "Low", locked: false },
      { id: "bc-contingency", eventId: "sample-event", name: "Contingency", recommended: 80000, percent: 10, risk: "Locked", locked: true }
    ],
    vendors: [
      vendor("p1", "Pixel Stories", "Photography", "Bandra, Mumbai", 65000, 65000, 82000, 104000, 78, "Best Value", true, "< 24 hrs", ["Full-day coverage", "1 photographer + 1 assistant", "Digital delivery"], ["GST 18%", "Travel", "Printed album", "Drone coverage"], "Medium"),
      vendor("p2", "Moments by Dev", "Photography", "Juhu, Mumbai", 55000, 55000, 74000, 90000, 65, "Needs Clarification", true, "2-3 days", ["GST included", "Printed album", "8 hours coverage"], ["Assistant photographer", "Travel", "Overtime"], "Low"),
      vendor("p3", "LensArt Studio", "Photography", "Powai, Mumbai", 78000, 78000, 91000, 110000, 52, "Over Budget", false, "No response yet", ["2 photographers", "Album", "Drone", "GST included"], ["Travel", "Availability"], "Low"),
      vendor("v1", "Royal Orchid Banquet", "Venue", "Andheri West, Mumbai", 180000, 195000, 220000, 265000, 74, "Best Value", true, "< 24 hrs", ["Hall", "Basic furniture", "AC", "Parking"], ["GST", "Service charge", "Outside vendor fee", "Security deposit"], "Medium"),
      vendor("c1", "FeastCraft Catering", "Catering", "Bandra, Mumbai", 1200, 185000, 210000, 240000, 82, "Best Quality Fit", true, "< 12 hrs", ["Full veg menu", "Serving staff", "Crockery"], ["Vendor meals", "Water bottles", "Transport", "GST 5%"], "High"),
      vendor("d1", "Aura Events Decor", "Decoration", "Malad, Mumbai", 95000, 95000, 115000, 130000, 61, "Over Budget", true, "< 24 hrs", ["Stage backdrop", "Table centrepieces", "Entrance arch"], ["Setup labour", "Teardown", "Transport"], "Medium")
    ],
    quotes: [],
    hiddenCosts: hiddenCosts(),
    payments: [
      { id: "pay-1", eventId: "sample-event", vendorId: "v1", vendorName: "Royal Orchid Banquet", amount: 50000, type: "Advance", dueDate: "2026-08-15", status: "pending", createdAt: now, updatedAt: now },
      { id: "pay-2", eventId: "sample-event", vendorId: "c1", vendorName: "FeastCraft Catering", amount: 45000, type: "Advance", dueDate: "2026-09-01", status: "pending", createdAt: now, updatedAt: now },
      { id: "pay-3", eventId: "sample-event", vendorId: "p1", vendorName: "Pixel Stories", amount: 32500, type: "Advance", dueDate: "2026-09-15", status: "pending", createdAt: now, updatedAt: now }
    ],
    questionBank: questions()
  };
}

function vendor(id, name, category, location, listedPrice, quotedPrice, estimatedFinalMin, estimatedFinalMax, matchScore, badge, availability, responseTime, included, excluded, confidence) {
  return {
    id,
    name,
    category,
    location,
    listedPrice,
    quotedPrice,
    estimatedFinalMin,
    estimatedFinalMax,
    matchScore,
    badge,
    availability,
    responseTime,
    included,
    excluded,
    confidence,
    risks: excluded.map((item) => `${item} is not confirmed`),
    questions: excluded.slice(0, 3).map((item) => `Is ${item.toLowerCase()} included in the quoted price?`),
    scoreBreakdown: { budgetFit: Math.min(40, Math.round(matchScore * 0.4)), transparency: 22, serviceMatch: 16, availability: availability ? 8 : 2 }
  };
}

function hiddenCosts() {
  const rows = [
    ["Venue", "GST 18%", "32400-39600", "High", "unconfirmed"],
    ["Venue", "Service charge", "9000-18000", "High", "unconfirmed"],
    ["Venue", "Outside vendor fee", "5000-15000", "High", "unconfirmed"],
    ["Venue", "Security deposit", "25000", "Medium", "confirmed"],
    ["Catering", "Vendor meals", "6000-10000", "High", "unconfirmed"],
    ["Catering", "Water and beverages", "3000-6000", "Medium", "unconfirmed"],
    ["Photography", "GST 18%", "11700", "High", "unconfirmed"],
    ["Photography", "Travel and fuel", "4000-8000", "High", "unconfirmed"],
    ["Photography", "Printed album", "8000-15000", "Medium", "unconfirmed"],
    ["Decoration", "Setup labour", "8000-12000", "High", "unconfirmed"],
    ["Decoration", "Teardown", "5000-8000", "Medium", "unconfirmed"],
    ["Decoration", "Transport", "3000-5000", "Low", "unconfirmed"]
  ];
  return rows.map(([category, name, amountRange, risk, status], index) => ({ id: `hc-${index + 1}`, eventId: "sample-event", category, name, amountRange, risk, status }));
}

function questions() {
  return {
    Venue: ["Is GST included?", "What is the outside vendor fee?", "Is the security deposit refundable?", "Are electricity charges included?"],
    Catering: ["Is GST included?", "Are vendor meals included?", "Is transport included?", "What is the extra plate cost?"],
    Photography: ["Is GST included?", "Is travel included?", "What is overtime rate?", "Is album included?"],
    Decoration: ["Is setup labour included?", "Is teardown included?", "Is transport included?", "Are lighting electricity charges included?"],
    Makeup: ["Is trial included?", "Is travel included?", "Are touch-ups included?"]
  };
}
