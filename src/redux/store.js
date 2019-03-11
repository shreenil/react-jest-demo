import { applyMiddleware, createStore, compose } from "redux";
import reducer from "./reducers";
import thunk from 'redux-thunk';

const initState = {};
const middleware = [thunk];

export default createStore(
    reducer,
    initState,
    compose(
        applyMiddleware(...middleware)
    )
); 