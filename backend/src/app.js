import { config } from "./config.js";
import { ApiError, notFound, sendError, sendJson } from "./http.js";
import { createStore } from "./store/index.js";
import { authRoutes } from "./routes/auth.js";
import { budgetRoutes } from "./routes/budgets.js";
import { dashboardRoutes } from "./routes/dashboard.js";
import { eventRoutes } from "./routes/events.js";
import { hiddenCostRoutes } from "./routes/hiddenCosts.js";
import { paymentRoutes } from "./routes/payments.js";
import { questionRoutes } from "./routes/questions.js";
import { quoteRoutes } from "./routes/quotes.js";
import { simulatorRoutes } from "./routes/simulator.js";
import { tradeoffRoutes } from "./routes/tradeoffs.js";
import { vendorRoutes } from "./routes/vendors.js";

const store = createStore();
const routeGroups = [
  authRoutes,
  eventRoutes,
  vendorRoutes,
  quoteRoutes,
  budgetRoutes,
  hiddenCostRoutes,
  simulatorRoutes,
  tradeoffRoutes,
  paymentRoutes,
  dashboardRoutes,
  questionRoutes
];

export function createApp() {
  return async function app(req, res) {
    try {
      setCors(res);
      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
      }

      const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
      if (req.method === "GET" && url.pathname === "/api/health") {
        return sendJson(res, { ok: true, service: "eventra-api", storage: config.dataBackend, timestamp: new Date().toISOString() });
      }

      for (const routes of routeGroups) {
        if (await routes({ req, res, url, store })) return;
      }
      notFound();
    } catch (error) {
      sendError(res, error instanceof ApiError ? error : new ApiError(500, "Internal server error", { detail: error.message }));
    }
  };
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
}


