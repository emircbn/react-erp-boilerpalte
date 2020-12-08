import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { fromJS } from "immutable";
import createReducer from "./reducer";
import sagas from "./sagas";


const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

export function configureStore(initialState) {

  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== "production" && typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false
      })
      : compose;

  const store = createStore(createReducer(), fromJS(initialState), composeEnhancers(...enhancers));

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {sagas}; // Saga registry


  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
