import { fromJS } from "immutable";
import { CHANGE_LOCALE } from "../../constants/actionTypes";
import { defaultLocale, localeOptions } from "../../constants/defaultValues";
import { reducerCreator } from "../../util/reducerCreator";

const INITIAL_STATE = fromJS({
  locale: (localStorage.getItem("currentLanguage") && localeOptions.filter(x => { return x.id === localStorage.getItem("currentLanguage"); }).length > 0) ? localStorage.getItem("currentLanguage") : defaultLocale
});

const changeLocaleHandler = (state, action) => {
  return state.set("locale", action.payload);
};

const handlers = {
  [CHANGE_LOCALE]: changeLocaleHandler
};

export default reducerCreator(handlers, INITIAL_STATE);
