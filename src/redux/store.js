import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./rootReducer";

import rootSaga from "./sagas";


const sagaMiddleware= createSagaMiddleware();

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const store = createStore(rootReducer ,applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga)

export default store;
