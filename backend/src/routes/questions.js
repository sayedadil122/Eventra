import { sendJson } from "../http.js";

export async function questionRoutes({ req, res, url, store }) {
  if (url.pathname !== "/api/questions" || req.method !== "GET") return false;
  const category = url.searchParams.get("category");
  const bank = store.read().questionBank || {};
  return sendJson(res, { questions: category ? { [category]: bank[category] || [] } : bank });
}


