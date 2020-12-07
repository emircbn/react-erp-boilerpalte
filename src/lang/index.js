import { addLocaleData } from "react-intl";
import trLang from "./entries/tr-TR";
import enLang from "./entries/en-US";

const AppLocale = {
  tr: trLang,
  en: enLang
};

addLocaleData(AppLocale.tr.data);
addLocaleData(AppLocale.en.data);

export default AppLocale;
