
import {checkAllowance,checkBalance,gameTransferTokens2} from "./userActions"



export const MINT_NFT = "MINT_NFT";


const _mintNFT = (web3Info) => {

    return {
      type: MINT_NFT,
      payload: {
          web3Info
      },
    };
  };


export const mintNFT = (NFT_contract,accountMe,totalSupplyNFTs) => {
    return (dispatch) => {

        let web3Info = {}

        let totalSupplyNFTs2 = parseInt(totalSupplyNFTs)+1

        const pathDirectory = `/NFTs_pictures/NFT_${totalSupplyNFTs2.toString()}.png`

        // try {

            // NFT_contract.methods.mint(`tor.png`).send({from:accountMe}).then((res)=>{
            NFT_contract.methods.mint(pathDirectory).send({from:accountMe}).then((res)=>{
          

                web3Info["pathDirectory"] = pathDirectory


                dispatch(_mintNFT(web3Info))

        
            })

        // } catch(err) {
        //    console.log("I cant sent cash ")
        // }
        
    }
}

