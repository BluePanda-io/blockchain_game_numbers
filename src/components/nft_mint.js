import React, {useState} from "react";



import { useDispatch, useSelector } from "react-redux";

import { Card,CardHeader,CardMedia } from "@material-ui/core";




// import {startGame,playAgain,finishGame} from "../redux/actions/gameActions"

import {mintNFT} from "../redux/actions/NFT_Actions"

import {checkBalance,transferTokens,gameTransferTokens,
  allowedTokensToPlay,
  gameTransferTokens2
} from "../redux/actions/userActions"

export const NFT_Mint = ({}) => {

  const dispatch = useDispatch();

  const web3_accounts = useSelector((state) => {return state.userData ? state.userData.accounts : {};});
  const totalSupplyNFTs = useSelector((state) => {return state.nftData ? state.nftData.totalSupplyNFTs : {};});
  const NFT_contract = useSelector((state) => {return state.nftData ? state.nftData.NFT_contract : {};});
  const mint_nft_directory = useSelector((state) => {return state.nftData ? state.nftData.mint_nft_directory : {};});


  const mintNFT_button = () =>{


    console.log("f = ",NFT_contract,web3_accounts[0],totalSupplyNFTs)
    dispatch(mintNFT(NFT_contract,web3_accounts[0],totalSupplyNFTs))
    // dispatch(gameTransferTokens(token,web3_accounts[0],inputNumberTokens,web3_accounts[0]))

  }

  console.log("mint_nft_directory = ",mint_nft_directory)
  

    return (
        <>

          <button onClick={() => 
            mintNFT_button()
          }>
            Mint New MFT sdf
          </button>

          {mint_nft_directory?<img src={mint_nft_directory} alt="image" />:true}

        

        </>

    )
}