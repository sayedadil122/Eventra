import { ApiError, matchPath, readJson, requireFields, sendJson } from "../http.js";
import { getAuthUser } from "../auth/middleware.js";

function canAccess(user, event) {
  return event.userId === user.id || event.userId === "demo";
}

export async function eventRoutes({ req, res, url, store }) {
  if (url.pathname === "/api/events" && req.method === "GET") {
    const user = await getAuthUser(req, store, false);
    const events = await store.list("events", (event) => !user || canAccess(user, event));
    return sendJson(res, { events });
  }

  if (url.pathname === "/api/events" && req.method === "POST") {
    const user = await getAuthUser(req, store);
    const body = await readJson(req);
    requireFields(body, ["eventType", "eventDate", "city", "guestCount", "totalBudget"]);
    const event = await store.insert("events", {
      userId: user.id,
      name: body.name || `${body.eventType} in ${body.city}`,
      eventType: body.eventType,
      eventDate: body.eventDate,
      city: body.city,
      guestCount: Number(body.guestCount),
      totalBudget: Number(body.totalBudget),
      functions: Number(body.functions || 1),
      services: body.services || [],
      priorities: body.priorities || [],
      style: body.style || "",
      status: "planning"
    });
    return sendJson(res, { event }, 201);
  }

  const params = matchPath(url.pathname, "/api/events/:id");
  if (!params) return false;
  const event = await store.findById("events", params.id);
  if (!event) throw new ApiError(404, "Event not found");

  if (req.method === "GET") return sendJson(res, { event });

  const user = await getAuthUser(req, store);
  if (!canAccess(user, event)) throw new ApiError(403, "You cannot change this event");

  if (req.method === "PUT" || req.method === "PATCH") {
    const body = await readJson(req);
    const updated = await store.update("events", params.id, body);
    return sendJson(res, { event: updated });
  }

  if (req.method === "DELETE") {
    await store.remove("events", params.id);
    return sendJson(res, { deleted: true });
  }

  return false;
}


