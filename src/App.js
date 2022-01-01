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

import {startGame,playAgain,finishGame} from "./redux/actions/gameActions"




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


  window.ethereum.on('accountsChanged', function (accounts) {
    console.log("The ddress changed SOS (!!!)= ",accounts)
    dispatch(web3Initialize())
  })


  window.ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
  });
  

  const connectMetamask_button = async () =>{

    const accounts3 = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account3 = accounts3[0];

    console.log("account3 = ",account3)

  }


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

  const playAgain_button = () =>{

    if (playingNow)
      dispatch(playAgain())
    else
      alert("You need to first Start the Game")

  }

  const playingNow = useSelector((state) => {
    return state.gameData ? state.gameData.playingNow : false;
  });

  const timesPlayed = useSelector((state) => {
    return state.gameData ? state.gameData.timesPlayed : false;
  });
  const numberOfGame = useSelector((state) => {
    return state.gameData ? state.gameData.numberOfGame : false;
  });

  const tokenWon = useSelector((state) => {
    return state.gameData ? state.gameData.tokenWon : false;
  });

  const tokensAvailableToCollect = useSelector((state) => {
    return state.userData ? state.userData.tokensAvailableToCollect : false;
  });

  const finishGame_button = () =>{

    if (playingNow)
      dispatch(finishGame(token,gameAddress,web3_accounts[0],timesPlayed,tokensAvailableToCollect))
    else
      alert("You need to first Start the Game")

    

  }

  const collectMyTokens_button = () =>{

    dispatch(gameTransferTokens2(token,gameAddress,tokensAvailableToCollect,web3_accounts[0]))

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

  const [accountSelect, setAccountSelect] = useState("0x0159B7f11793741e433cf169f567aBB9d3dA0768");


  const [Products,setProducts] = useState([{
    name: "1",
    disableButton: false,
  },{
    name: "2",
    disableButton: false,
  },{
    name: "3",
    disableButton: false,
  },{
    name: "4",
    disableButton: false,
  },{
    name: "5",
    disableButton: false,
  },{
    name: "6",
    disableButton: false,
  },{
    name: "7",
    disableButton: false,
  },{
    name: "8",
    disableButton: false,
  },{
    name: "9",
    disableButton: false,
  }])
  

    const onClickFunction = (e, name,idx) => {
      e.preventDefault();
      
      let Products2 = Products

      let idx1 = idx+1


      if (numberOfGame===idx1){
        finishGame_button()
        // alert("You Woooon yeaaaaa")
        for (let i=0;i<9;i++){
          Products2[i].disableButton = false;
        }
      } else if (numberOfGame<idx1){
        playAgain_button()

        for (let i=idx1-1;i<9;i++){
          Products2[i].disableButton = true;
        }
      } else {
        playAgain_button()

        for (let i=0;i<=idx1-1;i++){
          Products2[i].disableButton = true;
          
        }
      }

      setProducts(Products2)


    }
    

  return (
    <>
    
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {web3_available==true?
            <p>
              HEY HEY TORA Your Address = 
              {web3_accounts}

              {/* This is the Token Total Supply:{totalSupply} */}
            </p>:true}

            <button onClick={() => 
              connectMetamask_button()
            }>
              Connect Metamask
            </button>


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

            <br/>
              <br/>
              <br/>
              <br/>

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

            

            {playingNow?
            <>
            {Products.map((p,idx) => (
              <button  
              disabled = {p.disableButton}
              onClick={e=>{ onClickFunction(e, p.name,idx); }} 
              key={p.name}
              >
                {p.name}
              </button>
            ))}
            </>:
            <>
            {tokenWon>-1?<p>You just won: {tokenWon}Fcoin</p>:true}
            </>}

              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>

          </header>


          <>

              
          
            

          </>
        </div>
    </>

  );
}

export default App;
