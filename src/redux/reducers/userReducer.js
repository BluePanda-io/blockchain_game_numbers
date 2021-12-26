import * as web3ActionTags from "../actions/web3Actions";
import * as userActionTags from "../actions/userActions";

const stateUserInitial = {
  isAvailable: false,
  accounts: [],
  balance: null,
};

const userReducer = (stateUser = stateUserInitial, action) => {
  const { type, payload } = action;

  switch (type) {
    case web3ActionTags.WEB3INIT:
      return {
        ...stateUser,
        accounts: payload.web3Info.accounts,
        balance: payload.web3Info.userBalance,
        isAvailable: true,
      };
    case userActionTags.CHECK_BALANCE:
      return {
        ...stateUser,
        balance: payload.userData.userBalance,
        // balance: payload.web3Info.userBalance,
      };
    // case web3ActionTags.WEB3INIT:
    //   return { ...stateUserInitial };

    default:
      return {...stateUser};
  }
};

export default userReducer;
