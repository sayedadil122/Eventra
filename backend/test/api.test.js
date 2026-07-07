import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createApp } from "../src/app.js";

function start() {
  const server = createServer(createApp());
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });
}

test("health endpoint responds", async () => {
  const { server, baseUrl } = await start();
  try {
    const response = await fetch(`${baseUrl}/api/health`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
  } finally {
    server.close();
  }
});

test("quote analysis returns estimated final cost", async () => {
  const { server, baseUrl } = await start();
  try {
    const response = await fetch(`${baseUrl}/api/quotes/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vendorName: "Pixel Stories", category: "Photography", quotedPrice: 65000, text: "Full-day coverage and digital delivery" })
    });
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.analysis.vendorName, "Pixel Stories");
    assert.ok(body.analysis.estimatedFinalMin > 65000);
  } finally {
    server.close();
  }
});

test("budget plan exists for sample event", async () => {
  const { server, baseUrl } = await start();
  try {
    const response = await fetch(`${baseUrl}/api/events/sample-event-riya/budget-plan`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.plan.eventId, "sample-event-riya");
    assert.ok(body.plan.categories.length > 0);
  } finally {
    server.close();
  }
});
