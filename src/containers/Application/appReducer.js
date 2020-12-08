import { fromJS } from "immutable";
import { reducerCreator } from "../../util/reducerCreator";
import {
  MENU_SET_CLASSNAMES,
  MENU_CONTAINER_ADD_CLASSNAME,
  MENU_CLICK_MOBILE_MENU,
  MENU_CHANGE_DEFAULT_CLASSES,
  CHANGE_LOCALE,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER
} from "./appActions";
import {
  defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
  localeOptions,
  defaultLocale
} from "./appConstants";

const INITIAL_STATE = fromJS({
  menu: {
    containerClassnames: defaultMenuType,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount: 0
  },
  settings: {
    locale: (localStorage.getItem("currentLanguage") && localeOptions.filter(x => { return x.id === localStorage.getItem("currentLanguage"); }).length > 0) ? localStorage.getItem("currentLanguage") : defaultLocale
  },
  authUser: {
    user: localStorage.getItem("user_id"),
    loading: false
  }
});

const menuSetClassnameHandler = (state, action) => {
  const { containerClassnames, menuClickCount } = action.payload;
  return state
    .setIn(["menu", "containerClassnames"], containerClassnames)
    .setIn(["menu", "menuClickCount"], menuClickCount);
};

const menuClickMobileMenuHandler = (state, action) => {
  const { containerClassnames, menuClickCount } = action.payload;
  return state
    .setIn(["menu", "containerClassnames"], containerClassnames)
    .setIn(["menu", "menuClickCount"], menuClickCount);
};

const menuContainerAddClassnameHandler = (state, action) => {
  return state.setIn(["menu", "containerClassnames"], action.payload);
};

const menuChangeDefaultClassesHandler = (state, action) => {
  return state.setIn(["menu", "containerClassnames"], action.payload);
};

const changeLocaleHandler = (state, action) => {
  return state.setIn(["settings", "locale"], action.payload);
};

const loginUserHandler = (state) => {
  return state.setIn(["authUser", "loading"], true);
};

const loginUserSuccessHandler = (state, action) => {
  return state
    .setIn(["authUser", "loading"], false)
    .setIn(["authUser", "user"], action.payload);
};

const registerUserHandler = (state) => {
  return state.setIn(["authUser", "loading"], true);
};

const registerUserSuccessHandler = (state, action) => {
  return state
    .setIn(["authUser", "loading"], false)
    .setIn(["authUser", "user"], action.payload);
};

const logoutHandler = (state) => {
  return state.setIn(["authUser", "user"], null);
};

const handlers = {
  [LOGIN_USER]: loginUserHandler,
  [LOGIN_USER_SUCCESS]: loginUserSuccessHandler,
  [REGISTER_USER]: registerUserHandler,
  [REGISTER_USER_SUCCESS]: registerUserSuccessHandler,
  [LOGOUT_USER]: logoutHandler,
  [MENU_SET_CLASSNAMES]: menuSetClassnameHandler,
  [MENU_CLICK_MOBILE_MENU]: menuClickMobileMenuHandler,
  [MENU_CONTAINER_ADD_CLASSNAME]: menuContainerAddClassnameHandler,
  [MENU_CHANGE_DEFAULT_CLASSES]: menuChangeDefaultClassesHandler,
  [CHANGE_LOCALE]: changeLocaleHandler
};

export default reducerCreator(handlers, INITIAL_STATE);
