import { ApiError, matchPath, readJson, sendJson } from "../http.js";
import { calculateBudgetPlan } from "../services/budgetService.js";

export async function budgetRoutes({ req, res, url, store }) {
  if (url.pathname === "/api/budgets/feasibility" && req.method === "POST") {
    const body = await readJson(req);
    const categories = body.categories || defaultCategories(body.totalBudget);
    return sendJson(res, { plan: calculateBudgetPlan({ id: body.eventId || "new", ...body }, categories) });
  }

  const params = matchPath(url.pathname, "/api/events/:id/budget-plan");
  if (!params || req.method !== "GET") return false;
  const event = await store.findById("events", params.id);
  if (!event) throw new ApiError(404, "Event not found");
  const categories = await store.list("budgetCategories", (category) => category.eventId === event.id);
  return sendJson(res, { plan: calculateBudgetPlan(event, categories) });
}

function defaultCategories(totalBudget = 0) {
  const budget = Number(totalBudget || 0);
  return [
    { name: "Venue", recommended: Math.round(budget * 0.3), percent: 30, risk: "Medium" },
    { name: "Catering", recommended: Math.round(budget * 0.25), percent: 25, risk: "Low" },
    { name: "Decoration", recommended: Math.round(budget * 0.1), percent: 10, risk: "Low" },
    { name: "Photography", recommended: Math.round(budget * 0.1), percent: 10, risk: "Low" },
    { name: "Makeup", recommended: Math.round(budget * 0.05), percent: 5, risk: "Low" },
    { name: "Entertainment", recommended: Math.round(budget * 0.05), percent: 5, risk: "Medium" },
    { name: "Logistics", recommended: Math.round(budget * 0.05), percent: 5, risk: "Low" },
    { name: "Contingency", recommended: Math.round(budget * 0.1), percent: 10, risk: "Locked", locked: true }
  ];
}


