import React from "react";

import Token from '../abis/Token.json'

import { useDispatch, useSelector } from "react-redux";


import {startGame,playAgain,finishGame} from "../redux/actions/gameActions"

import {checkBalance,transferTokens,gameTransferTokens,
  allowedTokensToPlay,
  gameTransferTokens2
} from "../redux/actions/userActions"

export const GameToken = ({}) => {

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

  const finishGame_button = () =>{

    if (playingNow)
      dispatch(finishGame(token,gameAddress,web3_accounts[0],timesPlayed,tokensAvailableToCollect))
    else
      alert("You need to first Start the Game")

    
  }

    return (
        <>

          <button onClick={() => 
            startGame_button()
          }>
            Game Start 
          </button>

          <button onClick={() => 
            playAgain_button()
          }>
            Play Again 
          </button>


          <button onClick={() => 
            finishGame_button()
          }>
            Finish Game 
          </button>

          {web3_available==true?
          <p>
            You have this amount of cash = 
            {user1_tokens} Ftoken
          </p>:true}


          {web3_available==true?
          <p>
            You have this allowance to play the game = 
            {user1_allowance} Ftoken
          </p>:true}

          <button onClick={() => 
            collectMyTokens_button()
          }>
            Collect My Tokens
          </button>
          
          {web3_available==true?
          <p>
            Tokens that you won ready to collect= 
            {tokensAvailableToCollect} Ftoken
          </p>:true}
        </>

    )
}