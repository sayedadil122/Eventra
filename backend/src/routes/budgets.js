import { ApiError, matchPath, readJson, sendJson } from "../http.js";
import { calculateBudgetPlan } from "../services/budgetService.js";

export async function budgetRoutes({ req, res, url, store }) {
  if (url.pathname === "/api/budgets/feasibility" && req.method === "POST") {
    const body = await readJson(req);
    const categories = body.categories || defaultCategories(body);
    return sendJson(res, { plan: calculateBudgetPlan({ id: body.eventId || "new", ...body }, categories) });
  }

  const params = matchPath(url.pathname, "/api/events/:id/budget-plan");
  if (!params || req.method !== "GET") return false;
  const event = await store.findById("events", params.id);
  if (!event) throw new ApiError(404, "Event not found");
  const categories = await store.list("budgetCategories", (category) => category.eventId === event.id);
  return sendJson(res, { plan: calculateBudgetPlan(event, categories) });
}

function defaultCategories(event = {}) {
  const budget = Number(event.totalBudget || event.budget || 0);
  const guests = Math.max(10, Number(event.guestCount || event.guests || 150));
  const city = event.city || "Mumbai";
  const type = event.type || event.eventType || "Engagement";
  const functions = Math.max(1, Number(event.functions || 1));
  const selected = new Set(event.services?.length ? event.services : ["Venue", "Catering", "Decoration", "Photography", "Makeup"]);
  const cityMultiplier = { Mumbai: 1.15, Delhi: 1.1, Bangalore: 1.05, Hyderabad: 0.95, Chennai: 0.95, Pune: 0.9, Other: 0.85 }[city] || 1;
  const typeMultiplier = type.includes("Wedding") ? 1.25 : type.includes("Birthday") ? 0.65 : type.includes("Corporate") ? 0.85 : type.includes("Anniversary") ? 0.75 : type.includes("Social") ? 0.75 : 1;
  const functionMultiplier = 1 + Math.max(0, functions - 1) * 0.18;
  const scale = cityMultiplier * typeMultiplier * functionMultiplier;
  const market = {
    Venue: Math.round((160000 + guests * 350) * scale),
    Catering: Math.round(guests * 950 * cityMultiplier * typeMultiplier * functionMultiplier),
    Decoration: Math.round(65000 * scale),
    Photography: Math.round(70000 * cityMultiplier * (type.includes("Birthday") ? 0.75 : 1) * Math.min(1.25, functionMultiplier)),
    Makeup: Math.round(30000 * cityMultiplier * (type.includes("Corporate") ? 0.35 : 1)),
    Entertainment: Math.round(30000 * cityMultiplier * (type.includes("Corporate") ? 1.15 : 1)),
    Logistics: Math.round((25000 + guests * 100) * cityMultiplier * Math.min(1.25, functionMultiplier))
  };
  const weights = { Venue: 30, Catering: 25, Decoration: 10, Photography: 10, Makeup: 5, Entertainment: 5, Logistics: 5 };
  const active = Object.keys(weights).filter((name) => name === "Logistics" || selected.has(name));
  const activeWeight = active.reduce((sum, name) => sum + weights[name], 0);
  const allocatable = Math.round(budget * 0.9);
  const categories = active.map((name) => {
    const allocation = Math.round(allocatable * (weights[name] / activeWeight));
    const recommended = market[name];
    const ratio = recommended / Math.max(1, allocation);
    return {
      name,
      recommended,
      allocation,
      percent: budget > 0 ? Math.round((recommended / budget) * 100) : 0,
      risk: ratio > 1.18 ? "High" : ratio > 0.98 ? "Medium" : "Low"
    };
  });
  categories.push({ name: "Contingency", recommended: Math.round(budget * 0.1), allocation: Math.round(budget * 0.1), percent: 10, risk: "Locked", locked: true });
  return categories;
}


