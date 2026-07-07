const hiddenChargeRules = {
  Photography: [
    { keyword: "gst", label: "GST 18%", estimateMin: 0.18, estimateMax: 0.18, type: "percent" },
    { keyword: "travel", label: "Travel and fuel", estimateMin: 4000, estimateMax: 8000 },
    { keyword: "album", label: "Printed album", estimateMin: 8000, estimateMax: 15000 },
    { keyword: "drone", label: "Drone coverage", estimateMin: 4000, estimateMax: 6000 },
    { keyword: "overtime", label: "Overtime", estimateMin: 3500, estimateMax: 7000 }
  ],
  Venue: [
    { keyword: "gst", label: "GST 18%", estimateMin: 0.18, estimateMax: 0.18, type: "percent" },
    { keyword: "service charge", label: "Service charge", estimateMin: 9000, estimateMax: 18000 },
    { keyword: "outside vendor", label: "Outside vendor fee", estimateMin: 5000, estimateMax: 15000 },
    { keyword: "electricity", label: "Electricity surcharge", estimateMin: 3000, estimateMax: 8000 },
    { keyword: "security", label: "Security deposit", estimateMin: 20000, estimateMax: 50000 }
  ],
  Catering: [
    { keyword: "gst", label: "GST 5%", estimateMin: 0.05, estimateMax: 0.05, type: "percent" },
    { keyword: "vendor meals", label: "Vendor meals", estimateMin: 6000, estimateMax: 10000 },
    { keyword: "water", label: "Water and beverages", estimateMin: 3000, estimateMax: 6000 },
    { keyword: "transport", label: "Transport", estimateMin: 2000, estimateMax: 4000 }
  ],
  Decoration: [
    { keyword: "setup", label: "Setup labour", estimateMin: 8000, estimateMax: 12000 },
    { keyword: "teardown", label: "Teardown", estimateMin: 5000, estimateMax: 8000 },
    { keyword: "transport", label: "Transport", estimateMin: 3000, estimateMax: 5000 },
    { keyword: "electricity", label: "Electricity for lights", estimateMin: 1500, estimateMax: 3000 }
  ]
};

export function analyzeQuote(input) {
  const category = input.category || "Photography";
  const quotedPrice = Number(input.quotedPrice || extractPrice(input.text) || 0);
  const text = `${input.text || ""} ${(input.included || []).join(" ")}`.toLowerCase();
  const rules = hiddenChargeRules[category] || hiddenChargeRules.Photography;
  const missing = [];
  let hiddenMin = 0;
  let hiddenMax = 0;

  for (const rule of rules) {
    if (!text.includes(rule.keyword)) {
      const min = rule.type === "percent" ? Math.round(quotedPrice * rule.estimateMin) : rule.estimateMin;
      const max = rule.type === "percent" ? Math.round(quotedPrice * rule.estimateMax) : rule.estimateMax;
      hiddenMin += min;
      hiddenMax += max;
      missing.push({ label: rule.label, estimateMin: min, estimateMax: max, risk: min > 10000 ? "High" : "Medium" });
    }
  }

  const confidence = missing.length <= 1 ? "High" : missing.length <= 3 ? "Medium" : "Low";
  return {
    vendorName: input.vendorName,
    category,
    quotedPrice,
    included: input.included || extractIncluded(text),
    missing,
    estimatedFinalMin: quotedPrice + hiddenMin,
    estimatedFinalMax: quotedPrice + hiddenMax,
    confidence,
    recommendation: missing.length ? `Confirm ${missing[0].label} before paying an advance.` : "Quote is reasonably transparent. Confirm validity dates and cancellation terms."
  };
}

function extractPrice(text = "") {
  const match = String(text).replace(/,/g, "").match(/(?:inr|rs\.?|price|quote|total)?\s*(\d{4,8})/i);
  return match ? Number(match[1]) : 0;
}

function extractIncluded(text) {
  const included = [];
  if (text.includes("gst")) included.push("GST mentioned");
  if (text.includes("album")) included.push("Album mentioned");
  if (text.includes("travel")) included.push("Travel mentioned");
  if (text.includes("staff")) included.push("Staff mentioned");
  return included;
}
