export function generateTradeoffs(event, protectedPriorities = event.priorities || []) {
  const budget = Number(event.totalBudget || 0);
  const estimatedFinal = Math.round(budget * 1.08125);
  const overBudgetBy = Math.max(0, estimatedFinal - budget);
  const canCutFood = !protectedPriorities.includes("Food Quality");
  const canCutPhoto = !protectedPriorities.includes("Photography");

  const scenarios = [
    {
      title: "Minimal Decor Approach",
      chip: "Saves Most",
      saving: 55000,
      resultingTotal: estimatedFinal - 55000,
      protectedPriorities,
      changes: [
        { category: "Decoration", change: "Downgrade to standard decor package", saving: 35000 },
        { category: "Entertainment", change: "Use curated playlist instead of live DJ", saving: 15000 },
        { category: "Invitations", change: "Switch to digital invites", saving: 5000 }
      ],
      experienceImpact: "Low",
      withinBudget: estimatedFinal - 55000 <= budget
    },
    {
      title: "Budget Venue Swap",
      chip: "Balanced",
      saving: 65000,
      resultingTotal: estimatedFinal - 65000,
      protectedPriorities,
      changes: [
        { category: "Venue", change: "Move to a mid-range banquet hall", saving: 50000 },
        { category: "Makeup", change: "Remove trial session", saving: 5000 },
        { category: "Logistics", change: "Use local vendors only", saving: 10000 }
      ],
      experienceImpact: "Medium",
      withinBudget: estimatedFinal - 65000 <= budget
    },
    {
      title: "Moderate Guest Reduction",
      chip: "Lowest Risk",
      saving: 65000,
      resultingTotal: estimatedFinal - 65000,
      protectedPriorities,
      changes: [
        { category: "Catering", change: "Reduce guest count by 30", saving: 36000 },
        { category: "Return Gifts", change: "Remove return gifts", saving: 12000 },
        { category: "Logistics", change: "Reduce seating and transport", saving: 17000 }
      ],
      experienceImpact: "High",
      withinBudget: estimatedFinal - 65000 <= budget
    }
  ];

  if (canCutFood) scenarios[1].changes.push({ category: "Catering", change: "Simplify menu add-ons", saving: 15000 });
  if (canCutPhoto) scenarios[0].changes.push({ category: "Photography", change: "Remove album add-on", saving: 10000 });

  return { eventId: event.id, budget, estimatedFinal, overBudgetBy, protectedPriorities, scenarios };
}
