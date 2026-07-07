import { Readable } from "node:stream";
import { createApp } from "../../backend/src/app.js";

const app = createApp();

export async function handler(event) {
  return new Promise((resolve) => {
    const bodyBuffer = event.body
      ? Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8")
      : Buffer.alloc(0);

    const req = Readable.from(bodyBuffer.length ? [bodyBuffer] : []);
    req.method = event.httpMethod || "GET";
    req.url = normalizeUrl(event);
    req.headers = normalizeHeaders(event.headers || {});

    const headers = {};
    const chunks = [];
    const res = {
      statusCode: 200,
      setHeader(name, value) {
        headers[name] = value;
      },
      getHeader(name) {
        return headers[name];
      },
      writeHead(statusCode, nextHeaders = {}) {
        this.statusCode = statusCode;
        for (const [key, value] of Object.entries(nextHeaders)) headers[key] = value;
      },
      write(chunk) {
        if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      },
      end(chunk) {
        if (chunk) this.write(chunk);
        resolve({
          statusCode: this.statusCode,
          headers,
          body: Buffer.concat(chunks).toString("utf8")
        });
      }
    };

    app(req, res);
  });
}

function normalizeUrl(event) {
  let path = event.path || "/api/health";
  const functionPrefix = "/.netlify/functions/api";

  if (path.startsWith(functionPrefix)) {
    path = path.slice(functionPrefix.length) || "/";
  }

  if (!path.startsWith("/")) path = `/${path}`;
  if (!path.startsWith("/api")) path = `/api${path}`;

  const query = event.rawQuery || new URLSearchParams(event.queryStringParameters || {}).toString();
  return query ? `${path}?${query}` : path;
}

function normalizeHeaders(input) {
  const headers = {};
  for (const [key, value] of Object.entries(input)) headers[key.toLowerCase()] = value;
  return headers;
}
