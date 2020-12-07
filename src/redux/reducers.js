/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux-immutable";
import settings from './settings/reducer';
import menu from './menu/reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    menu,
    settings,
    ...injectedReducers
  });
}
