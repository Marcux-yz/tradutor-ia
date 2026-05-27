export const copiarTraducao = async (textoTraduzido: string): Promise<void> => {
	await navigator.clipboard.writeText(textoTraduzido)
}