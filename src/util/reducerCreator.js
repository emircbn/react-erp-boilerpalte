import { fromJS } from "immutable";
import { APP_LOGOUT } from "./constants";

const _defaultHandler = (state) => {
  return state;
};

const reducerCreator = (handlers = {}, initialState = fromJS({}), defaultHandler = _defaultHandler) => {
  // add logout handlers for all reducer that created by `reducerCreator`
  handlers[APP_LOGOUT] = (state, action) => {
    try {
      // if foreign APP_LOGOUT handlers defined call it!
      if (typeof handlers[APP_LOGOUT] === "function") {
        return handlers[APP_LOGOUT](state, action);
      }
    } catch (e) {
      // silent
    }
    return initialState;
  };

  const functionCheck = (handler) => {
    return typeof handler === "function";
  };

  return (state = initialState, action = {}) => {
    const arrayHandlers = Array.isArray(handlers[action.type])
      ? handlers[action.type]
      : action.type && typeof handlers[action.type] === "function"
      ? [handlers[action.type]]
      : null;

    if (arrayHandlers != null && !arrayHandlers.every(functionCheck)) {
      throw new Error("one or more reducer(s) are not a function", arrayHandlers);
    }

    if (arrayHandlers != null) {
      return arrayHandlers.reduce((state, reducer) => {
        return reducer(state, action);
      }, state);
    }

    return defaultHandler(state, action);
  };
};

export { reducerCreator };
