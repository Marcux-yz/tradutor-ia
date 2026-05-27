export const receberDados = (): [HTMLTextAreaElement, HTMLButtonElement, HTMLButtonElement, HTMLButtonElement, HTMLDivElement, HTMLDivElement] => {
	const inputText = document.getElementById("input-text") as HTMLTextAreaElement | null
	const btnTranslate = document.getElementById("btn-translate") as HTMLButtonElement | null
	const btnCopy = document.getElementById("btn-copy") as HTMLButtonElement | null
	const btnClear = document.getElementById("btn-clear") as HTMLButtonElement | null
	const outputArea = document.getElementById("output-area") as HTMLDivElement | null
	const toastModal = document.getElementById("toast-modal") as HTMLDivElement | null

	if (!inputText || !btnTranslate || !btnCopy || !btnClear || !outputArea || !toastModal) throw new Error()

	return [inputText, btnTranslate, btnCopy, btnClear, outputArea, toastModal]
}