import text from "./fr.json";

export function getIndice(instruction: string) {
    const indice: any = text[instruction];
    return indice;
}