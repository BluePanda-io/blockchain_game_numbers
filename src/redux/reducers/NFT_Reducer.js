import * as web3ActionTags from "../actions/web3Actions";
import * as userActionTags from "../actions/userActions";
import * as nftActionTags from "../actions/NFT_Actions";


const stateUserInitial = {
  isAvailable: false,
  balanceOfNFTs: -1,
  totalSupplyNFTs: -1,
  NFT_contract: {},
  mint_nft_directory: "" 
};

const NFT_Reducer = (stateUser = stateUserInitial, action) => {
  const { type, payload } = action;

  switch (type) {
    case web3ActionTags.WEB3INIT:
      return {
        ...stateUser,
        NFT_contract: payload.web3Info.NFT_contract,
        balanceOfNFTs: payload.web3Info.balanceOfNFTs,
        totalSupplyNFTs: payload.web3Info.totalSupplyNFTs,
        isAvailable: true,
      };
    case nftActionTags.MINT_NFT:
      console.log("sdsssdsdsds")
      return {
        ...stateUser,
        mint_nft_directory: payload.web3Info.pathDirectory,
      };

    default:
      return {...stateUser};
  }
};

export default NFT_Reducer;
