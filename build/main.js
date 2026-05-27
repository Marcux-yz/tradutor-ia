// code/features/copiarTraducao.ts
var copiarTraducao = async (textoTraduzido) => {
  await navigator.clipboard.writeText(textoTraduzido);
};

// code/features/receberDados.ts
var receberDados = () => {
  const inputText = document.getElementById("input-text");
  const btnTranslate = document.getElementById("btn-translate");
  const btnCopy = document.getElementById("btn-copy");
  const btnClear = document.getElementById("btn-clear");
  const outputArea = document.getElementById("output-area");
  const toastModal = document.getElementById("toast-modal");
  if (!inputText || !btnTranslate || !btnCopy || !btnClear || !outputArea || !toastModal)
    throw new Error;
  return [inputText, btnTranslate, btnCopy, btnClear, outputArea, toastModal];
};

// code/features/traduzir.ts
var traduzir = async (texto) => {
  const response = await fetch("http://localhost:3000/traduzir", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ texto })
  });
  if (!response.ok)
    throw new Error;
  return await response.text();
};

// code/features/tratarDados.ts
var tratarDados = (dados) => dados.trim();

// code/main.ts
var main = async () => {
  const [inputText, btnTranslate, btnCopy, btnClear, outputArea, toastModal] = receberDados();
  btnTranslate.addEventListener("click", async () => {
    const dadosTratados = tratarDados(inputText.value);
    if (!dadosTratados) {
      outputArea.textContent = "Sua tradução aparecerá bem aqui";
      return;
    }
    outputArea.textContent = "Traduzindo...";
    try {
      const traducao = await traduzir(dadosTratados);
      outputArea.textContent = traducao;
    } catch (error) {
      console.error(error);
      outputArea.textContent = "Houve um erro ao tentar traduzir. Tente novamente.";
    }
  });
  btnClear.addEventListener("click", () => {
    inputText.value = "";
    outputArea.textContent = "Sua tradução aparecerá bem aqui";
  });
  btnCopy.addEventListener("click", async () => {
    const textoParaCopiar = outputArea.textContent?.trim();
    const placeholders = [
      "Sua tradução aparecerá bem aqui",
      "Traduzindo...",
      "Houve um erro ao tentar traduzir. Tente novamente."
    ];
    if (textoParaCopiar && !placeholders.includes(textoParaCopiar)) {
      await copiarTraducao(textoParaCopiar);
      toastModal.classList.add("show");
      setTimeout(() => {
        toastModal.classList.remove("show");
      }, 2000);
    }
  });
};
await main();
