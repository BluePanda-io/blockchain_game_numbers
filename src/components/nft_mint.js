import React, {useState} from "react";

import Token from '../abis/Token.json'

import { useDispatch, useSelector } from "react-redux";


import {startGame,playAgain,finishGame} from "../redux/actions/gameActions"

import {checkBalance,transferTokens,gameTransferTokens,
  allowedTokensToPlay,
  gameTransferTokens2
} from "../redux/actions/userActions"

export const NFT_Mint = ({}) => {

  const mintNFT_button = () =>{


    console.log("f")
    // dispatch(transferTokens(token,accountSelect,inputNumberTokens,web3_accounts[0]))
    // dispatch(gameTransferTokens(token,web3_accounts[0],inputNumberTokens,web3_accounts[0]))

  }
  

    return (
        <>

          <button onClick={() => 
            mintNFT_button()
          }>
            Mint New MFT
          </button>

        </>

    )
}