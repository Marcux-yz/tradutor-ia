import { copiarTraducao } from "./features/copiarTraducao"
import { receberDados } from "./features/receberDados"
import { traduzir } from "./features/traduzir"
import { tratarDados } from "./features/tratarDados"

const main = async (): Promise<void> => {
  const [inputText, btnTranslate, btnCopy, btnClear, outputArea, toastModal] = receberDados()

  btnTranslate.addEventListener("click", async () => {
    const dadosTratados = tratarDados(inputText.value)
    
    if (!dadosTratados) {
      outputArea.textContent = "Sua tradução aparecerá bem aqui"
      return
    }

    outputArea.textContent = "Traduzindo..."

    try {
      const traducao = await traduzir(dadosTratados)
      
      outputArea.textContent = traducao
      
    } catch (error) {
      console.error(error)
      outputArea.textContent = "Houve um erro ao tentar traduzir. Tente novamente."
    }
  })

  // BÔNUS: Quando limpar o input, limpa também a área de tradução para o padrão
  btnClear.addEventListener("click", () => {
    inputText.value = ""
    outputArea.textContent = "Sua tradução aparecerá bem aqui"
  })

  btnCopy.addEventListener("click", async () => {
    const textoParaCopiar = outputArea.textContent?.trim()

    const placeholders = [
      "Sua tradução aparecerá bem aqui", 
      "Traduzindo...", 
      "Houve um erro ao tentar traduzir. Tente novamente."
    ]

    if (textoParaCopiar && !placeholders.includes(textoParaCopiar)) {
      await copiarTraducao(textoParaCopiar)
      toastModal.classList.add("show")

      setTimeout(() => {
        toastModal.classList.remove("show")
      }, 2000)
    }
  })
}

await main()

export {}