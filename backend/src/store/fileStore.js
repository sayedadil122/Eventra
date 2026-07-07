import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { seedData } from "./seedData.js";

const dbPath = process.env.LOCAL_DB_PATH || (process.env.NETLIFY ? resolve("/tmp", "eventra-db.json") : resolve(process.cwd(), "data", "db.json"));

export function createStore() {
  mkdirSync(dirname(dbPath), { recursive: true });
  if (!existsSync(dbPath)) writeFileSync(dbPath, JSON.stringify(seedData(), null, 2));

  function read() {
    return JSON.parse(readFileSync(dbPath, "utf8"));
  }

  function write(data) {
    writeFileSync(dbPath, JSON.stringify(data, null, 2));
  }

  return {
    read,
    write,
    list(collection, filter = () => true) {
      return (read()[collection] || []).filter(filter);
    },
    findById(collection, id) {
      return (read()[collection] || []).find((item) => item.id === id) || null;
    },
    findOne(collection, filter) {
      return (read()[collection] || []).find(filter) || null;
    },
    insert(collection, item) {
      const data = read();
      data[collection] ||= [];
      const now = new Date().toISOString();
      const record = { id: item.id || randomUUID(), createdAt: now, updatedAt: now, ...item };
      data[collection].push(record);
      write(data);
      return record;
    },
    update(collection, id, patch) {
      const data = read();
      data[collection] ||= [];
      const index = data[collection].findIndex((item) => item.id === id);
      if (index === -1) return null;
      data[collection][index] = { ...data[collection][index], ...patch, id, updatedAt: new Date().toISOString() };
      write(data);
      return data[collection][index];
    },
    remove(collection, id) {
      const data = read();
      data[collection] ||= [];
      const before = data[collection].length;
      data[collection] = data[collection].filter((item) => item.id !== id);
      write(data);
      return data[collection].length !== before;
    }
  };
}
