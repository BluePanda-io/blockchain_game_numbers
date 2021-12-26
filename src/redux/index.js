import web3Reducer from './reducers/web3Reducer';
import userReducer from './reducers/userReducer';



import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

const ourDepartments = combineReducers({
   web3Data: web3Reducer,
   user: userReducer,
});

const store = createStore(
   ourDepartments,
   composeWithDevTools(applyMiddleware(thunk))
   // process.env.REACT_APP_ENVIRONMENT === 'dev' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
);

export default store;
