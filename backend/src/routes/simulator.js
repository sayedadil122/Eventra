import { ApiError, matchPath, readJson, sendJson } from "../http.js";
import { simulateChange } from "../services/simulatorService.js";

export async function simulatorRoutes({ req, res, url, store }) {
  const params = matchPath(url.pathname, "/api/events/:id/simulations");
  if (!params || req.method !== "POST") return false;
  const event = await store.findById("events", params.id);
  if (!event) throw new ApiError(404, "Event not found");
  const simulation = simulateChange(event, await readJson(req));
  return sendJson(res, { simulation });
}


