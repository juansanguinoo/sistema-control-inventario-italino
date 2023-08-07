import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    typeof (window as any) === "object" &&
      typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
);

export type RootState = ReturnType<typeof store.getState>;
