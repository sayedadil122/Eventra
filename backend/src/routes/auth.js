import { createClient } from "@supabase/supabase-js";
import { ApiError, pickPublicUser, readJson, requireFields, sendJson } from "../http.js";
import { getAuthUser } from "../auth/middleware.js";
import { createToken } from "../auth/token.js";
import { hashPassword, verifyPassword } from "../auth/passwords.js";
import { config } from "../config.js";

const admin = config.supabase.url && config.supabase.serviceRoleKey
  ? createClient(config.supabase.url, config.supabase.serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

const publicClient = config.supabase.url && config.supabase.anonKey
  ? createClient(config.supabase.url, config.supabase.anonKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

export async function authRoutes({ req, res, url, store }) {
  if (req.method === "POST" && url.pathname === "/api/auth/signup") {
    const body = await readJson(req);
    requireFields(body, ["name", "email", "password"]);
    if (config.dataBackend === "supabase") return signupSupabase(res, body);

    const email = String(body.email).toLowerCase().trim();
    if (await store.findOne("users", (user) => user.email === email)) throw new ApiError(409, "Email already registered");
    const user = await store.insert("users", { name: body.name, email, passwordHash: hashPassword(body.password), role: "user" });
    const token = createToken({ userId: user.id });
    return sendJson(res, { user: pickPublicUser(user), token }, 201);
  }

  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    const body = await readJson(req);
    requireFields(body, ["email", "password"]);
    if (config.dataBackend === "supabase") return loginSupabase(res, body);

    const email = String(body.email).toLowerCase().trim();
    const user = await store.findOne("users", (item) => item.email === email);
    if (!user || !verifyPassword(body.password, user.passwordHash)) throw new ApiError(401, "Invalid email or password");
    const token = createToken({ userId: user.id });
    return sendJson(res, { user: pickPublicUser(user), token });
  }

  if (req.method === "GET" && url.pathname === "/api/auth/me") {
    const user = await getAuthUser(req, store);
    return sendJson(res, { user: pickPublicUser(user) });
  }

  return false;
}

async function signupSupabase(res, body) {
  if (!admin) throw new ApiError(500, "Supabase admin client is not configured");
  const email = String(body.email).toLowerCase().trim();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: body.password,
    email_confirm: true,
    user_metadata: { name: body.name }
  });
  if (error) throw new ApiError(400, error.message);

  const profile = { id: data.user.id, name: body.name, email, role: "user" };
  await admin.from("profiles").upsert(profile);
  const token = await signIn(email, body.password);
  return sendJson(res, { user: profile, token }, 201);
}

async function loginSupabase(res, body) {
  const email = String(body.email).toLowerCase().trim();
  const token = await signIn(email, body.password);
  const user = await fetchUserFromToken(token);
  return sendJson(res, { user, token });
}

async function signIn(email, password) {
  if (!publicClient) throw new ApiError(500, "Supabase public client is not configured");
  const { data, error } = await publicClient.auth.signInWithPassword({ email, password });
  if (error || !data.session?.access_token) throw new ApiError(401, error?.message || "Invalid email or password");
  return data.session.access_token;
}

async function fetchUserFromToken(token) {
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) throw new ApiError(401, "Invalid session");
  const { data: profile } = await admin.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
  return profile || { id: data.user.id, email: data.user.email, name: data.user.user_metadata?.name || "User", role: "user" };
}

