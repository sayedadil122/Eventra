import { ApiError, matchPath, readJson, requireFields, sendJson } from "../http.js";
import { getAuthUser } from "../auth/middleware.js";

export async function paymentRoutes({ req, res, url, store }) {
  const listParams = matchPath(url.pathname, "/api/events/:id/payments");
  if (listParams && req.method === "GET") {
    const payments = await store.list("payments", (payment) => payment.eventId === listParams.id);
    return sendJson(res, { payments });
  }
  if (listParams && req.method === "POST") {
    await getAuthUser(req, store);
    const body = await readJson(req);
    requireFields(body, ["vendorName", "amount", "dueDate"]);
    const payment = await store.insert("payments", { ...body, eventId: listParams.id, amount: Number(body.amount), status: body.status || "pending" });
    return sendJson(res, { payment }, 201);
  }

  const params = matchPath(url.pathname, "/api/payments/:id");
  if (!params) return false;
  const payment = await store.findById("payments", params.id);
  if (!payment) throw new ApiError(404, "Payment not found");
  if (req.method === "PATCH" || req.method === "PUT") {
    await getAuthUser(req, store);
    const updated = await store.update("payments", params.id, await readJson(req));
    return sendJson(res, { payment: updated });
  }
  return false;
}



