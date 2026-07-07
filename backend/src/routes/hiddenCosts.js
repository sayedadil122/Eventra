import { matchPath, sendJson } from "../http.js";
import { summarizeHiddenCosts } from "../services/hiddenCostService.js";

export async function hiddenCostRoutes({ req, res, url, store }) {
  const params = matchPath(url.pathname, "/api/events/:id/hidden-costs");
  if (!params || req.method !== "GET") return false;
  const items = await store.list("hiddenCosts", (item) => item.eventId === params.id);
  return sendJson(res, { summary: summarizeHiddenCosts(items) });
}


