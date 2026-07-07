export function summarizeHiddenCosts(items) {
  const totalFlagged = items.filter((item) => item.status !== "confirmed").length;
  const totalConfirmed = items.filter((item) => item.status === "confirmed").length;
  const categories = Object.values(items.reduce((acc, item) => {
    acc[item.category] ||= { category: item.category, riskCount: 0, items: [] };
    if (item.status !== "confirmed") acc[item.category].riskCount += 1;
    acc[item.category].items.push(item);
    return acc;
  }, {}));

  return { totalFlagged, totalConfirmed, categories };
}
