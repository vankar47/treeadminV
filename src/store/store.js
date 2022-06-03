import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
const combinedReducers = combineReducers({
  auth: authReducer
});

const store = createStore(combinedReducers);

export default store;
