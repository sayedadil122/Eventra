export function calculateBudgetPlan(event, categories = []) {
  const budget = Number(event.totalBudget || 0);
  const guests = Number(event.guestCount || 0);
  const estimatedMinCost = Math.round(categories.reduce((sum, category) => sum + Number(category.recommended || 0), 0) * 1.08125);
  const gap = budget - estimatedMinCost;
  const ratio = estimatedMinCost > 0 ? budget / estimatedMinCost : 1;
  const scorePercent = Math.max(1, Math.min(100, Math.round(ratio * 100)));
  const score = ratio >= 1.05 ? "Realistic" : ratio >= 0.9 ? "Stretch" : "Unrealistic";
  const contingency = categories.find((category) => category.name === "Contingency")?.recommended || Math.round(budget * 0.1);

  return {
    eventId: event.id,
    score,
    scorePercent,
    budget,
    guestCount: guests,
    estimatedMinCost,
    gap,
    contingency,
    confidence: "High",
    aiInsight: buildInsight(event, score, gap),
    categories
  };
}

function buildInsight(event, score, gap) {
  const city = event.city || "your city";
  const budgetText = formatMoney(event.totalBudget || 0);
  if (score === "Realistic") return `Your ${budgetText} budget for ${event.guestCount} guests in ${city} looks realistic with the current service mix. Keep contingency locked until quotes are confirmed.`;
  if (score === "Stretch") return `Your ${budgetText} budget for ${event.guestCount} guests in ${city} is achievable but tight. Protect priority categories and negotiate hidden charges before paying advances.`;
  return `Your ${budgetText} budget is currently below the likely final cost by ${formatMoney(Math.abs(gap))}. Use trade-off scenarios before booking vendors.`;
}

export function formatMoney(value) {
  return `INR ${Number(value || 0).toLocaleString("en-IN")}`;
}
