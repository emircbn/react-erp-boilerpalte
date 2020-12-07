import { CHANGE_LOCALE } from "../../constants/actionTypes";
import { defaultLocale, localeOptions } from "../../constants/defaultValues";

const INIT_STATE = {
  locale: (localStorage.getItem("currentLanguage") && localeOptions.filter(x => { return x.id === localStorage.getItem("currentLanguage"); }).length > 0) ? localStorage.getItem("currentLanguage") : defaultLocale
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload };

    default: return { ...state };
  }
};
