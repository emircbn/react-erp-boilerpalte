import { createSelector } from "reselect";

const appSelector = (state) => {
  return state.get("app");
};

const menuSelector = createSelector(
  (state) => {
    return appSelector(state).get("menu");
  },
  (menu) => {
    return menu.toJS();
  }
);

const settingsSelector = createSelector(
  (state) => {
    return appSelector(state).get("settings");
  },
  (settings) => {
    return settings.toJS();
  }
);

const authUserSelector = createSelector(
  (state) => {
    return appSelector(state).get("authUser");
  },
  (authUser) => {
    return authUser.toJS();
  }
);

export {
  menuSelector,
  settingsSelector,
  authUserSelector
};
