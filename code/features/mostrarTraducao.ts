import { receberDados } from "./receberDados"

export const mostrarTraducao = (textoTraduzido: string): void => {
	const outputArea = receberDados()[3]
	outputArea.textContent = textoTraduzido
}