import { createClient } from "@supabase/supabase-js";
import { ApiError } from "../http.js";
import { verifyToken } from "./token.js";
import { config } from "../config.js";

const admin = config.supabase.url && config.supabase.serviceRoleKey
  ? createClient(config.supabase.url, config.supabase.serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

export async function getAuthUser(req, store, required = true) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (config.dataBackend === "supabase" && token.split(".").length === 3) {
    const user = await getSupabaseUser(token);
    if (user) return user;
  }

  const payload = verifyToken(token);
  if (!payload?.userId) {
    if (required) throw new ApiError(401, "Authentication required");
    return null;
  }
  const user = await store.findById("users", payload.userId);
  if (!user) throw new ApiError(401, "Invalid session");
  return user;
}

async function getSupabaseUser(token) {
  if (!admin) return null;
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  const { data: profile } = await admin.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
  return profile || { id: data.user.id, email: data.user.email, name: data.user.user_metadata?.name || "User", role: "user" };
}
