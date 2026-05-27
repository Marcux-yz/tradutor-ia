export const traduzir = async (texto: string): Promise<string> => {
  const response = await fetch("http://localhost:3000/traduzir", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ texto })
  })

  if (!response.ok) throw new Error()

  return await response.text()
}