import React, {useState} from "react";

import Token from '../abis/Token.json'

import { useDispatch, useSelector } from "react-redux";


import {startGame,playAgain,finishGame} from "../redux/actions/gameActions"

import {checkBalance,transferTokens,gameTransferTokens,
  allowedTokensToPlay,
  gameTransferTokens2
} from "../redux/actions/userActions"

export const SentTokens = ({}) => {

  const dispatch = useDispatch();

  const token = useSelector((state) => {
    return state.web3Data ? state.web3Data.token : null;
  });

  const gameAddress = useSelector((state) => {
    return state.web3Data ? state.web3Data.gameAddress : null;
  });

  const web3_accounts = useSelector((state) => {
    return state.userData ? state.userData.accounts : {};
  });

  const timesPlayed = useSelector((state) => {
    return state.gameData ? state.gameData.timesPlayed : false;
  });

  const tokensAvailableToCollect = useSelector((state) => {
    return state.userData ? state.userData.tokensAvailableToCollect : false;
  });

  const playingNow = useSelector((state) => {
    return state.gameData ? state.gameData.playingNow : false;
  });
  const web3_available = useSelector((state) => {
    return state.web3Data ? state.web3Data.isAvailable : false;
  });

  const user1_tokens = useSelector((state) => {
    return state.userData ? state.userData.balance : null;
  });

  const user1_allowance = useSelector((state) => {
    return state.userData ? state.userData.allowance : null;
  });

  const [accountSelect, setAccountSelect] = useState("0x0159B7f11793741e433cf169f567aBB9d3dA0768");


  const makeTransaction = () =>{

    dispatch(transferTokens(token,accountSelect,inputNumberTokens,web3_accounts[0]))
    // dispatch(gameTransferTokens(token,web3_accounts[0],inputNumberTokens,web3_accounts[0]))

  }

  const allowedTokensToPlay_button = () =>{

    dispatch(allowedTokensToPlay(token,gameAddress,web3_accounts[0]))

  }

  const gameTransferTokens_button = () =>{

    dispatch(gameTransferTokens2(token,gameAddress,tokensAvailableToCollect,web3_accounts[0]))

  }

  const startGame_button = () =>{

    dispatch(startGame(token,gameAddress,web3_accounts[0]))

  }

  const collectMyTokens_button = () =>{

    dispatch(gameTransferTokens2(token,gameAddress,tokensAvailableToCollect,web3_accounts[0]))

  }

  const playAgain_button = () =>{

    if (playingNow)
      dispatch(playAgain())
    else
      alert("You need to first Start the Game")

  }

  const [inputNumberTokens, setInputNumberTokens] = useState(0);

  const options = [
    {
      label: "Account 2",
      value: "0xccf83688a7B73cd8Db4BE77Be23099D2ABC5f4B1",
    },
    {
      label: "Account 3",
      value: "0x5004d250150Cd0644945F56BeDF15dEc934FA10d",
    },
    {
      label: "Account 4",
      value: "0x3DeB27cd0389D49f8404a0059bD70fF55d2EB37B",
    },
  ];

  const finishGame_button = () =>{

    if (playingNow)
      dispatch(finishGame(token,gameAddress,web3_accounts[0],timesPlayed,tokensAvailableToCollect))
    else
      alert("You need to first Start the Game")

    
  }

    return (
        <>
          <input 
            value={inputNumberTokens} 
            onChange={(e)=>{setInputNumberTokens(e.target.value)}}
          />

          <select
            value={accountSelect}
            onChange={(e) => {
              setAccountSelect(e.target.value)
            }}
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>


          

          <button onClick={() => 
            makeTransaction()
          }>
            Sent cash
          </button>

          <button onClick={() => 
            allowedTokensToPlay_button()
          }>
            allowedTokensToPlay
          </button>

          <button onClick={() => 
            gameTransferTokens_button()
          }>
            gameTransferTokens
          </button>
            
        </>

    )
}