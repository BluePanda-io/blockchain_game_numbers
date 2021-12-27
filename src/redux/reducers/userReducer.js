import * as web3ActionTags from "../actions/web3Actions";
import * as userActionTags from "../actions/userActions";

const stateUserInitial = {
  isAvailable: false,
  accounts: [],
  balance: null,
  allowance: null,
};

const userReducer = (stateUser = stateUserInitial, action) => {
  const { type, payload } = action;

  switch (type) {
    case web3ActionTags.WEB3INIT:
      return {
        ...stateUser,
        accounts: payload.web3Info.accounts,
        balance: payload.web3Info.userBalance,
        allowance: payload.web3Info.userAllowance,
        isAvailable: true,
      };
    case userActionTags.CHECK_BALANCE:
      return {
        ...stateUser,
        balance: payload.web3Info.userBalance,
      };
    case userActionTags.CHECK_ALLOWANCE:
      return {
        ...stateUser,
        allowance: payload.web3Info.userAllowance,
      };

    default:
      return {...stateUser};
  }
};

export default userReducer;
