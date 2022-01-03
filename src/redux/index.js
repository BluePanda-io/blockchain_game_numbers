import web3Reducer from './reducers/web3Reducer';
import userReducer from './reducers/userReducer';
import gameReducer from './reducers/gameReducer';
import NFT_Reducer from './reducers/NFT_Reducer';



import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

const ourDepartments = combineReducers({
   web3Data: web3Reducer,
   userData: userReducer,
   gameData: gameReducer,
   nftData: NFT_Reducer,
});

const store = createStore(
   ourDepartments,
   composeWithDevTools(applyMiddleware(thunk))
   // process.env.REACT_APP_ENVIRONMENT === 'dev' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
);

export default store;
