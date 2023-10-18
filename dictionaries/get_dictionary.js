import enUS from "./languages/en-US";
import ptBR from "./languages/pt-BR";

export const dictionary = {
    'en-US': enUS,
    'pt-BR': ptBR
};

const defaultLocale = "pt-BR";
export default (lang) => dictionary[lang] ?? dictionary[defaultLocale];