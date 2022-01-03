import * as web3ActionTags from "../actions/web3Actions";
import * as userActionTags from "../actions/userActions";


const stateUserInitial = {
  isAvailable: false,
  balanceOfNFTs: -1,
  NFT_contract: {},
};

const NFT_Reducer = (stateUser = stateUserInitial, action) => {
  const { type, payload } = action;

  switch (type) {
    case web3ActionTags.WEB3INIT:
      return {
        ...stateUser,
        NFT_contract: payload.web3Info.NFT_contract,
        balanceOfNFTs: payload.web3Info.balanceOfNFTs,
        isAvailable: true,
      };

    default:
      return {...stateUser};
  }
};

export default NFT_Reducer;
