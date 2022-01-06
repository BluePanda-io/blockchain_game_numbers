import React, {useEffect,useState} from 'react'

import Web3 from 'web3'


import logo from './logo.svg';
import './App.css';

import Token from './abis/Token.json'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import {
//   BrowserRouter,
//   Routes,
//   Route
// } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {web3Initialize} from "./redux/actions/web3Actions"
import {checkBalance,transferTokens,gameTransferTokens,
  allowedTokensToPlay,
  gameTransferTokens2
} from "./redux/actions/userActions"

import {startGame,playAgain,finishGame} from "./redux/actions/gameActions"


import {NetworkChange} from "./components/networkChangeMetaMask"

import {GameToken} from "./components/gameToken"

import {SentTokens} from "./components/sentTokens"

import {NFT_Mint} from "./components/nft_mint"
import {ShowNFT_page} from "./components/show_nfts"





function App() {

  const dispatch = useDispatch();

  
  

  useEffect(() => {

    dispatch(web3Initialize())

  }, []);


  const web3_available = useSelector((state) => {return state.web3Data ? state.web3Data.isAvailable : false;});

  const web3_accounts = useSelector((state) => {return state.userData ? state.userData.accounts : {};});

  const token = useSelector((state) => {return state.web3Data ? state.web3Data.token : null;});

  const gameAddress = useSelector((state) => {return state.web3Data ? state.web3Data.gameAddress : null;});
  

  const playAgain_button = () =>{

    if (playingNow)
      dispatch(playAgain())
    else
      alert("You need to first Start the Game")

  }



  window.ethereum.on('accountsChanged', function (accounts) {
    console.log("The ddress changed SOS (!!!)= ",accounts)
    dispatch(web3Initialize())
  })


  window.ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
  });
  

  

  

  const playingNow = useSelector((state) => {return state.gameData ? state.gameData.playingNow : false});

  const timesPlayed = useSelector((state) => {return state.gameData ? state.gameData.timesPlayed : false});
  const numberOfGame = useSelector((state) => {return state.gameData ? state.gameData.numberOfGame : false});

  const tokenWon = useSelector((state) => {return state.gameData ? state.gameData.tokenWon : false});

  const tokensAvailableToCollect = useSelector((state) => {return state.userData ? state.userData.tokensAvailableToCollect : false});


  const finishGame_button = () =>{

    if (playingNow)
      dispatch(finishGame(token,gameAddress,web3_accounts[0],timesPlayed,tokensAvailableToCollect))
    else
      alert("You need to first Start the GameToken")
  }
  

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
  

    const clickNumberOfGame = (e, name,idx) => {
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

    const Home = () => (
      <div>
        <h2>Home</h2>
      </div>
    );
    
    const About = () => (
      <div>
        <h2>About</h2>
      </div>
    );
    
    

  return (
    <>

        

    
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {web3_available==true?
            <p>
              HEY HEY TORA 2 Your Address = 
              {web3_accounts}

              {/* This is the Token Total Supply:{totalSupply} */}
            </p>:true}


            <NetworkChange />



            {web3_available==true?
            <>

            <Router>
              <nav style={{padding: "20px"}}>
                <Link to="/">Sent Cash</Link>
                <Link to="/t">___</Link>
                <Link to="/about">Play Game</Link>
                <Link to="/t">___</Link>
                <Link to="/nft_mint">NFT Mint</Link>
                <Link to="/t">___</Link>
                <Link to="/show_nfts">Show My NFTs</Link>
              </nav>
              <Routes>
                <Route path="/" element={<SentTokens/>} />
                <Route path="/about" element={<GameToken />} />
                <Route path="/nft_mint" element={<NFT_Mint/>} />
                <Route path="/show_nfts" element={<ShowNFT_page/>} />
              </Routes>
            </Router>



          
            
    

            </>:true}

            {playingNow?
            <>
            {Products.map((p,idx) => (
              <button  
              disabled = {p.disableButton}
              onClick={e=>{ clickNumberOfGame(e, p.name,idx); }} 
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
