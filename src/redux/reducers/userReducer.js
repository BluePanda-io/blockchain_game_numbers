import * as web3ActionTags from "../actions/web3Actions";
import * as userActionTags from "../actions/userActions";
import * as gameActionTags from "../actions/gameActions";

const stateUserInitial = {
  isAvailable: false,
  accounts: [],
  balance: null,
  allowance: null,
  tokensAvailableToCollect: 0,
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
        tokensAvailableToCollect: payload.web3Info.tokensAvailableToCollect,
      };
    case web3ActionTags.CHANGE_ADDRESS_METAMASK:
      return {
        ...stateUser,
        web3: payload.web3Info.window_web3,
        token: payload.web3Info.token,
        gameAddress: payload.web3Info.gameAddress,
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
    case gameActionTags.FINISH_GAME:
      return {
        ...stateUser,
        tokensAvailableToCollect: payload.web3Info.tokensAvailableToCollect,
      };
    case userActionTags.CHANGE_TOKENS_AVAIL_COLLECT:
      // console.log("payload.web3Info.tokensAvailableToCollect = ",payload.web3Info.tokensAvailableToCollect)
      return {
        ...stateUser,
        tokensAvailableToCollect: payload.web3Info.tokensAvailableToCollect,
      };

    default:
      return {...stateUser};
  }
};

export default userReducer;
