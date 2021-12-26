import * as web3ActionTags from "../actions/web3Actions";
import * as userActionTags from "../actions/userActions";


const stateUserInitial = {
  isAvailable: false,
  token: {},
//   accounts: [],
  web3: {},
//   balance: null,
};

const web3Reducer = (stateUser = stateUserInitial, action) => {
  const { type, payload } = action;

  switch (type) {
    case web3ActionTags.WEB3INIT:
      return {
        ...stateUser,
        web3: payload.web3Info.window_web3,
        token: payload.web3Info.token,
        isAvailable: true,
      };

    default:
      return {...stateUser};
  }
};

export default web3Reducer;
