import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY })

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Permite que o seu frontend acesse o server
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url)

    if (req.method === "OPTIONS") {
      return new Response("OK", { headers: corsHeaders })
    }

    if (req.method === "POST" && url.pathname === "/traduzir") {
      try {
        const { texto } = await req.json()
        
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `Translate the following text into English and show only the translation: ${texto}`
        })

        return new Response(response.text || "", {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "text/plain; charset=utf-8"
          }
        })
      } catch (error) {
        console.error("Erro no backend:", error)
        return new Response("Erro interno no servidor", { 
          status: 500, 
          headers: corsHeaders 
        })
      }
    }

    return new Response("Não encontrado", { status: 404, headers: corsHeaders })
  },
})

console.log("Servidor backend rodando na porta 3000 com CORS ativado!")