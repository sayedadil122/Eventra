import { config } from "../config.js";
import { createStore as createFileStore } from "./fileStore.js";
import { createSupabaseStore } from "./supabaseStore.js";

export function createStore() {
  if (config.dataBackend === "supabase") return createSupabaseStore(createFileStore());
  return createFileStore();
}
