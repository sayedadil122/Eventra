export function simulateChange(event, body = {}) {
  const type = body.changeType || "guests";
  if (type !== "guests") {
    return {
      changeType: type,
      message: "This simulator type is registered. Detailed calculation rules can be expanded from product policy.",
      before: event.totalBudget,
      after: event.totalBudget
    };
  }

  const from = Number(event.guestCount || 0);
  const to = Number(body.newValue || body.to || from);
  const delta = Math.max(0, to - from);
  const rows = [
    impact("Catering", 1200 * from, 1200 * to),
    impact("Venue", 240000, 240000 + Math.ceil(delta / 30) * 20000),
    impact("Seating", 200 * from, 200 * to),
    impact("Return Gifts", 100 * from, 100 * to),
    impact("Logistics", 40000, 40000 + delta * 200),
    impact("Photography", 80000, 80000),
    impact("Makeup", 40000, 40000)
  ];
  const totalDelta = rows.reduce((sum, row) => sum + row.delta, 0);
  return {
    changeType: "guests",
    from,
    to,
    delta,
    rows,
    totalBefore: event.totalBudget,
    totalAfter: event.totalBudget + totalDelta,
    totalDelta,
    recoveryOptions: recoveryOptions(totalDelta)
  };
}

function impact(name, before, after) {
  return { name, before, after, delta: after - before, affected: before !== after };
}

function recoveryOptions(totalDelta) {
  return [
    { title: "Reduce Decoration Package", saving: 40000, impact: "Low", risk: "Low" },
    { title: "Switch to Lower-Cost Caterer", saving: 30000, impact: "Medium", risk: "Medium" },
    { title: "Reduce Guest Count", saving: Math.min(totalDelta, 48000), impact: "High", risk: "Low" },
    { title: "Use Contingency Budget", saving: 0, usesContingency: totalDelta, impact: "None", risk: "High" }
  ];
}
