import { ApiError, matchPath, readJson, sendJson } from "../http.js";
import { generateTradeoffs } from "../services/tradeoffService.js";

export async function tradeoffRoutes({ req, res, url, store }) {
  const params = matchPath(url.pathname, "/api/events/:id/tradeoffs");
  if (!params) return false;
  const event = await store.findById("events", params.id);
  if (!event) throw new ApiError(404, "Event not found");
  const body = req.method === "POST" ? await readJson(req) : {};
  if (req.method === "GET" || req.method === "POST") {
    return sendJson(res, { tradeoffs: generateTradeoffs(event, body.protectedPriorities || event.priorities || []) });
  }
  return false;
}


