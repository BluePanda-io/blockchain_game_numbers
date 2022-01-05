
import {checkAllowance,checkBalance,gameTransferTokens2} from "./userActions"



export const MINT_NFT = "MINT_NFT";
export const COLLECT_MY_NFTS = "COLLECT_MY_NFTS";


const _mintNFT = (web3Info) => {

    return {
      type: MINT_NFT,
      payload: {
          web3Info
      },
    };
  };

  const _collectMyNFTs = (web3Info) => {

    return {
      type: COLLECT_MY_NFTS,
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


        NFT_contract.methods.mint(pathDirectory).send({from:accountMe}).then((res)=>{
        

            web3Info["pathDirectory"] = pathDirectory

            web3Info["totalSupplyNFTs"] = (parseInt(totalSupplyNFTs)+1).toString()

            


            dispatch(_mintNFT(web3Info))

    
        })

        
    }
}


export const showNFTs =  (NFT_contract,accountMe) => {
    return async (dispatch) => {

        let web3Info = {}
        

        const balanceOfUser = await NFT_contract.methods.balanceOfAllTokensMintToAddress(accountMe).call()

        
        let pathDirectory;

        let NFTs_pathDirectory = [];
        for (let i=0;i<balanceOfUser;i++){

            try{
            pathDirectory = await NFT_contract.methods.tokenOfOwnerByIndexDirectory(accountMe,i).call()


            NFTs_pathDirectory.push({pathDirectory,index: i})
            } catch {
                console.log('NFT dont work ')
            }

            
        }


        web3Info["NFTs_pathDirectory"] = NFTs_pathDirectory



        dispatch(_collectMyNFTs(web3Info))

        
    }
}

export const sentNFT =  (NFT_contract,accountMe,accountSent,indexTokenSent) => {
    return async (dispatch) => {

        let web3Info = {}




        const tokenID = await NFT_contract.methods.tokenOfOwnerByIndex(accountMe,indexTokenSent).call()

        
        console.log("tokenID = ",tokenID)

        await NFT_contract.methods.transferFrom(accountMe,accountSent,tokenID).send({from:accountMe})

        
    }
}

