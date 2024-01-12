import { createStore, applyMiddleware } from "redux";

import { thunk } from 'redux-thunk';

import reducer from "./reducer";

import rootReducer from "./accountReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;