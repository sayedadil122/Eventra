import { ApiError, matchPath, sendJson } from "../http.js";
import { calculateBudgetPlan } from "../services/budgetService.js";
import { summarizeHiddenCosts } from "../services/hiddenCostService.js";

export async function dashboardRoutes({ req, res, url, store }) {
  const params = matchPath(url.pathname, "/api/events/:id/dashboard");
  if (!params || req.method !== "GET") return false;
  const event = await store.findById("events", params.id);
  if (!event) throw new ApiError(404, "Event not found");
  const categories = await store.list("budgetCategories", (category) => category.eventId === event.id);
  const payments = await store.list("payments", (payment) => payment.eventId === event.id);
  const quotes = await store.list("quotes", (quote) => quote.eventId === event.id);
  const hiddenCostItems = await store.list("hiddenCosts", (item) => item.eventId === event.id);
  const committed = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  return sendJson(res, {
    dashboard: {
      event,
      budgetPlan: calculateBudgetPlan(event, categories),
      committed,
      remaining: Number(event.totalBudget || 0) - committed,
      selectedVendors: quotes.length,
      hiddenCosts: summarizeHiddenCosts(hiddenCostItems),
      payments,
      nextBestDecision: {
        title: "Confirm hidden charges before paying advances",
        description: "Ask vendors to confirm GST, travel, overtime, and service charges in writing.",
        urgency: "High"
      }
    }
  });
}


