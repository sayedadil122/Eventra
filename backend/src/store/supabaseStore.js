import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { config } from "../config.js";

const collections = {
  events: "events",
  budgetCategories: "budget_categories",
  vendors: "vendors",
  quotes: "quotes",
  hiddenCosts: "hidden_costs",
  payments: "payments"
};

const localOnly = new Set(["users"]);
const uuidCollections = new Set(["events", "budgetCategories", "vendors", "quotes", "hiddenCosts", "payments"]);

export function createSupabaseStore(localStore) {
  const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  async function rows(collection) {
    const table = collections[collection];
    if (!table) return localStore.list(collection);
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw new Error(error.message);
    return data.map(fromDb);
  }

  return {
    read() {
      return localStore.read();
    },
    write(data) {
      return localStore.write(data);
    },
    async list(collection, filter = () => true) {
      if (localOnly.has(collection)) return localStore.list(collection, filter);
      try {
        const items = await rows(collection);
        const filtered = items.filter(filter);
        if (filtered.length) return filtered;
      } catch (error) {
        const fallback = localStore.list(collection, filter);
        if (fallback.length) return fallback;
        throw error;
      }
      return localStore.list(collection, filter);
    },
    findById(collection, id) {
      if (localOnly.has(collection)) return localStore.findById(collection, id);
      return (async () => {
        const table = collections[collection];
        if (!table || (uuidCollections.has(collection) && !isUuid(id))) return localStore.findById(collection, id);
        try {
          const { data, error } = await supabase.from(table).select("*").eq("id", id).maybeSingle();
          if (error) throw new Error(error.message);
          if (data) return fromDb(data);
        } catch (error) {
          const fallback = localStore.findById(collection, id);
          if (fallback) return fallback;
          throw error;
        }
        return localStore.findById(collection, id);
      })();
    },
    findOne(collection, filter) {
      if (localOnly.has(collection)) return localStore.findOne(collection, filter);
      return (async () => (await rows(collection)).find(filter) || null)();
    },
    async insert(collection, item) {
      if (localOnly.has(collection) || !collections[collection]) return localStore.insert(collection, item);
      const record = { ...item };
      if (!record.id) record.id = randomUUID();
      const { data, error } = await supabase.from(collections[collection]).insert(toDb(record)).select("*").single();
      if (error) throw new Error(error.message);
      return fromDb(data);
    },
    async update(collection, id, patch) {
      if (localOnly.has(collection) || !collections[collection]) return localStore.update(collection, id, patch);
      const { data, error } = await supabase.from(collections[collection]).update(toDb(patch)).eq("id", id).select("*").single();
      if (error) throw new Error(error.message);
      return fromDb(data);
    },
    async remove(collection, id) {
      if (localOnly.has(collection) || !collections[collection]) return localStore.remove(collection, id);
      const { error } = await supabase.from(collections[collection]).delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    }
  };
}

function isUuid(value) {
  const uuidPattern = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$", "i");
  return uuidPattern.test(String(value));
}

function toDb(value) {
  if (Array.isArray(value)) return value.map(toDb);
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const [key, item] of Object.entries(value)) out[toSnake(key)] = toDb(item);
  return out;
}

function fromDb(value) {
  if (Array.isArray(value)) return value.map(fromDb);
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const [key, item] of Object.entries(value)) out[toCamel(key)] = fromDb(item);
  return out;
}

function toSnake(key) {
  return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function toCamel(key) {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

