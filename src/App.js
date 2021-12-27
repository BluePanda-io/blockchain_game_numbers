import React, {useEffect,useState} from 'react'



import logo from './logo.svg';
import './App.css';

import Token from './abis/Token.json'



import { useDispatch, useSelector } from "react-redux";

import {web3Initialize} from "./redux/actions/web3Actions"
import {checkBalance,transferTokens,gameTransferTokens,
  allowedTokensToPlay,
  gameTransferTokens2
} from "./redux/actions/userActions"

import {startGame,playAgain} from "./redux/actions/gameActions"




function App() {

  const dispatch = useDispatch();

  



  useEffect(() => {

    dispatch(web3Initialize())

  }, []);


  const web3_available = useSelector((state) => {
    return state.web3Data ? state.web3Data.isAvailable : false;
  });

  const web3_accounts = useSelector((state) => {
    return state.userData ? state.userData.accounts : {};
  });

  const token = useSelector((state) => {
    return state.web3Data ? state.web3Data.token : null;
  });

  const gameAddress = useSelector((state) => {
    return state.web3Data ? state.web3Data.gameAddress : null;
  });



  const [totalSupply, setTotalSupply] = useState("");
  useEffect( () => {
    if (token.methods){
      token.methods.totalSupply().call().then((res)=>{
        setTotalSupply(res)
      })
    }

  }, [token]);

  const user1_tokens = useSelector((state) => {
    return state.userData ? state.userData.balance : null;
  });

  const user1_allowance = useSelector((state) => {
    return state.userData ? state.userData.allowance : null;
  });


  const makeTransaction = () =>{

    dispatch(transferTokens(token,accountSelect,inputNumberTokens,web3_accounts[0]))
    // dispatch(gameTransferTokens(token,web3_accounts[0],inputNumberTokens,web3_accounts[0]))

  }

  const allowedTokensToPlay_button = () =>{

    dispatch(allowedTokensToPlay(token,gameAddress,web3_accounts[0]))

  }

  const gameTransferTokens_button = () =>{

    dispatch(gameTransferTokens2(token,gameAddress,5,web3_accounts[0]))

  }

  const startGame_button = () =>{

    dispatch(startGame(token,gameAddress,web3_accounts[0]))

  }

  const playAgain_button = () =>{

    dispatch(playAgain())

  }


  const [inputNumberTokens, setInputNumberTokens] = useState(0);

  const options = [
    {
      label: "Account 2",
      value: "0x0159B7f11793741e433cf169f567aBB9d3dA0768",
    },
    {
      label: "Account 3",
      value: "0x030C645D235e31617c17524cBd2846e376a834bC",
    },
    {
      label: "Account 4",
      value: "0x0AEEaD84172ef58062eBD70697F22ABf13a302E2",
    },
  ];

  const [accountSelect, setAccountSelect] = useState("0x0159B7f11793741e433cf169f567aBB9d3dA0768");



  return (
    <>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {web3_available==true?
            <p>
              Your Address = 
              {web3_accounts}

              {/* This is the Token Total Supply:{totalSupply} */}
            </p>:true}


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

          </header>
        </div>
    </>

  );
}

export default App;
