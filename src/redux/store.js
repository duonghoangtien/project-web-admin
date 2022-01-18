import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import departmentReducer from "./reducers/departmentReducer";
import employeeReducer from "./reducers/employeeReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const reducer = combineReducers({
  auth: authReducer,
  department: departmentReducer,
  employee: employeeReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const middleware = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
export default store;
