import { createSelector } from "reselect";

const menuSelector = createSelector(
  (state) => {
    return state.get("menu");
  },
  (menu) => {
    return menu.toJS();
  }
);

const settingsSelector = createSelector(
  (state) => {
    return state.get("settings");
  },
  (settings) => {
    return settings.toJS();
  }
);

export {
  menuSelector,
  settingsSelector
};
