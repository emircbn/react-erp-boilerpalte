import { fromJS } from "immutable";
import { reducerCreator } from "../../util/reducerCreator";
import { defaultMenuType, subHiddenBreakpoint, menuHiddenBreakpoint } from "Constants/defaultValues";
import {
  MENU_SET_CLASSNAMES,
  MENU_CONTAINER_ADD_CLASSNAME,
  MENU_CLICK_MOBILE_MENU,
  MENU_CHANGE_DEFAULT_CLASSES
} from "Constants/actionTypes";


const INITIAL_STATE = fromJS({
  containerClassnames: defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
  menuClickCount: 0
});

const menuSetClassnameHandler = (state, action) => {
  const { containerClassnames, menuClickCount } = action.payload;
  return state
    .set("containerClassnames", containerClassnames)
    .set("menuClickCount", menuClickCount);
};

const menuClickMobileMenuHandler = (state, action) => {
  const { containerClassnames, menuClickCount } = action.payload;
  return state
    .set("containerClassnames", containerClassnames)
    .set("menuClickCount", menuClickCount);
};

const menuContainerAddClassnameHandler = (state, action) => {
  return state.set("containerClassnames", action.payload);
};

const menuChangeDefaultClassesHandler = (state, action) => {
  return state.set("containerClassnames", action.payload);
};

const handlers = {
  [MENU_SET_CLASSNAMES]: menuSetClassnameHandler,
  [MENU_CLICK_MOBILE_MENU]: menuClickMobileMenuHandler,
  [MENU_CONTAINER_ADD_CLASSNAME]: menuContainerAddClassnameHandler,
  [MENU_CHANGE_DEFAULT_CLASSES]: menuChangeDefaultClassesHandler
};

export default reducerCreator(handlers, INITIAL_STATE);
