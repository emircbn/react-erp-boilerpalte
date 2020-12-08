import _conformsTo from "lodash/conformsTo";
import _isFunction from "lodash/isFunction";
import _isObject from "lodash/isObject";
import invariant from "invariant";

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = {
    dispatch: _isFunction,
    subscribe: _isFunction,
    getState: _isFunction,
    replaceReducer: _isFunction,
    runSaga: _isFunction,
    injectedReducers: _isObject,
    injectedSagas: _isObject
  };

  invariant(_conformsTo(store, shape), "(app/utils...) injectors: Expected a valid redux store");
}
