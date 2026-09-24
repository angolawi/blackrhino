/**
 * Cloudflare Worker / Serverless Proxy para API do Melhor Envio
 * 
 * Finalidade:
 * 1. Proteger o Bearer Token do Melhor Envio no lado do servidor/worker (variável de ambiente secreta).
 * 2. Injetar cabeçalhos CORS (Access-Control-Allow-Origin: *) para permitir requisições do frontend da loja.
 * 3. Encaminhar o cálculo de frete para a rota oficial https://melhorenvio.com.br/api/v2/me/shipment/calculate.
 * 
 * Como implantar no Cloudflare (Plano Gratuito - leva 2 minutos):
 * 1. Acesse https://dash.cloudflare.com -> Workers & Pages -> Create Worker.
 * 2. Cole este código no editor do Worker.
 * 3. Vá em Settings -> Variables and Secrets -> Adicione MELHOR_ENVIO_TOKEN com o seu token Bearer.
 * 4. Copie a URL do seu worker (ex: https://blackrhino-frete.<seu-subdominio>.workers.dev).
 * 5. Configure no seu repositório / .env.local:
 *    NEXT_PUBLIC_MELHOR_ENVIO_ENDPOINT=https://blackrhino-frete.<seu-subdominio>.workers.dev
 */

const MELHOR_ENVIO_CALCULATE_URL = "https://melhorenvio.com.br/api/v2/me/shipment/calculate";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env) {
    // Trata requisição preflight OPTIONS do navegador
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Método não permitido. Utilize POST para cálculo de frete." }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    try {
      // Obtém o token configurado no ambiente do Worker ou no cabeçalho Authorization da requisição
      const rawToken =
        env.MELHOR_ENVIO_TOKEN ||
        request.headers.get("Authorization") ||
        request.headers.get("authorization");

      const token = rawToken
        ? rawToken.replace(/^Bearer\s+/i, "").trim().replace(/^["']|["']$/g, "")
        : null;

      if (!token) {
        return new Response(
          JSON.stringify({ error: "Token do Melhor Envio não configurado no worker (MELHOR_ENVIO_TOKEN)." }),
          {
            status: 401,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      const body = await request.text();

      const melhorenvioResponse = await fetch(MELHOR_ENVIO_CALCULATE_URL, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "User-Agent": "BlackRhino/1.0 (contato@blackrhino.com.br)",
        },
        body: body,
      });

      const responseData = await melhorenvioResponse.text();

      return new Response(responseData, {
        status: melhorenvioResponse.status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Erro interno no proxy do Melhor Envio", details: String(err) }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
};
