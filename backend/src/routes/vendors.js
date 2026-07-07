import { ApiError, matchPath, readJson, sendJson } from "../http.js";
import { getAuthUser } from "../auth/middleware.js";

export async function vendorRoutes({ req, res, url, store }) {
  if (url.pathname === "/api/vendors" && req.method === "GET") {
    const category = url.searchParams.get("category");
    const vendors = await store.list("vendors", (vendor) => !category || vendor.category.toLowerCase() === category.toLowerCase());
    return sendJson(res, { vendors });
  }

  if (url.pathname === "/api/vendors" && req.method === "POST") {
    await getAuthUser(req, store);
    const body = await readJson(req);
    const vendor = await store.insert("vendors", body);
    return sendJson(res, { vendor }, 201);
  }

  const params = matchPath(url.pathname, "/api/vendors/:id");
  if (!params) return false;
  const vendor = await store.findById("vendors", params.id);
  if (!vendor) throw new ApiError(404, "Vendor not found");

  if (req.method === "GET") return sendJson(res, { vendor });
  if (req.method === "PATCH" || req.method === "PUT") {
    await getAuthUser(req, store);
    const updated = await store.update("vendors", params.id, await readJson(req));
    return sendJson(res, { vendor: updated });
  }
  return false;
}



