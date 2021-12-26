import web3Reducer from './reducers/web3Reducer';
// import ClientLoginReducer from './reducers/clientLoginReducer';
// import usersDataAllReducer from './reducers/usersDataAllReducer';
// import metricsReducer from './reducers/metricsReducer';
// import usersFilteredData from './reducers/usersFilteredData';
// import notificaitonsReducer from './reducers/notificaitonsReducer';
// import BankInfoReducer from './reducers/BankInfoReducer';
// import partnerCompaniesInfoReducer from './reducers/partnerCompaniesInfoReducer';
// import FinancialSpecialistCompaniesInfoReducer from './reducers/FinancialSpecialistCompaniesInfoReducer';
// // notificaitonsReducer
// import AgentListReducer from './reducers/AgentListReducer';
// import BrokerListReducer from './reducers/BrokerListReducer';
// import PromoterListReducer from './reducers/PromoterListReducer';

// import alertReducer from './reducers/alertReducer';
// import loadingReducer from './reducers/loadingReducer';
// import youtubeReducer from './reducers/youtubeReducer';
// import isMountedReducer from './reducers/isMountedReducer';
// import partnerReducer from './reducers/partnerReducer';
// import chatReducer from './reducers/chatReducer';
// import agentsClientsReducer from './reducers/agentClientsReducer';

// import structureCompanyReducer from './reducers/structureCompanyReducer.js';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

const ourDepartments = combineReducers({
   web3Data: web3Reducer,
});

const store = createStore(
   ourDepartments,
   composeWithDevTools(applyMiddleware(thunk))
   // process.env.REACT_APP_ENVIRONMENT === 'dev' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
);

export default store;
