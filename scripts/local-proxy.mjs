import http from "node:http";

const PORT = 8787;
const MELHOR_ENVIO_CALCULATE_URL = "https://melhorenvio.com.br/api/v2/me/shipment/calculate";

// Token recuperado de .env.local
const token = process.env.NEXT_PUBLIC_MELHOR_ENVIO_TOKEN || process.env.MELHOR_ENVIO_TOKEN || "";

const cleanToken = token.replace(/^Bearer\s+/i, "").trim().replace(/^["']|["']$/g, "");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Método não permitido. Use POST." }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const apiResponse = await fetch(MELHOR_ENVIO_CALCULATE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
          "User-Agent": "BlackRhino/1.0 (contato@blackrhino.com.br)",
        },
        body,
      });

      const responseText = await apiResponse.text();
      res.writeHead(apiResponse.status, { "Content-Type": "application/json" });
      res.end(responseText);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Erro no proxy local", details: String(err) }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`[Black Rhino] Proxy local do Melhor Envio rodando em http://localhost:${PORT}`);
});
