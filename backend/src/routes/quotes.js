import { ApiError, matchPath, readJson, requireFields, sendJson } from "../http.js";
import { getAuthUser } from "../auth/middleware.js";
import { analyzeQuote } from "../services/quoteService.js";

export async function quoteRoutes({ req, res, url, store }) {
  if (url.pathname === "/api/quotes" && req.method === "GET") {
    const eventId = url.searchParams.get("eventId");
    const quotes = await store.list("quotes", (quote) => !eventId || quote.eventId === eventId);
    return sendJson(res, { quotes });
  }

  if (url.pathname === "/api/quotes/analyze" && req.method === "POST") {
    const body = await readJson(req);
    requireFields(body, ["vendorName", "category", "quotedPrice"]);
    const analysis = analyzeQuote(body);
    return sendJson(res, { analysis });
  }

  if (url.pathname === "/api/quotes" && req.method === "POST") {
    const user = await getAuthUser(req, store);
    const body = await readJson(req);
    requireFields(body, ["eventId", "vendorName", "category", "quotedPrice"]);
    const event = await store.findById("events", body.eventId);
    if (!event) throw new ApiError(404, "Event not found");
    const analysis = analyzeQuote(body);
    const quote = await store.insert("quotes", { ...body, userId: user.id, analysis, status: "analysed" });
    return sendJson(res, { quote }, 201);
  }

  const params = matchPath(url.pathname, "/api/quotes/:id");
  if (!params) return false;
  const quote = await store.findById("quotes", params.id);
  if (!quote) throw new ApiError(404, "Quote not found");
  if (req.method === "GET") return sendJson(res, { quote });
  if (req.method === "DELETE") {
    await getAuthUser(req, store);
    await store.remove("quotes", params.id);
    return sendJson(res, { deleted: true });
  }
  return false;
}



