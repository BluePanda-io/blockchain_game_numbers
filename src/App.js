import React, {useEffect,useState} from 'react'



import logo from './logo.svg';
import './App.css';

import Token from './abis/Token.json'



import { useDispatch, useSelector } from "react-redux";

import {web3Initialize} from "./redux/actions/web3Actions"
import {checkBalance} from "./redux/actions/userActions"



function App() {

  const dispatch = useDispatch();


  useEffect(() => {

    dispatch(web3Initialize())

  }, []);


  const web3_available = useSelector((state) => {
    return state.web3Data ? state.web3Data.isAvailable : false;
  });

  const web3_accounts = useSelector((state) => {
    return state.web3Data ? state.web3Data.accounts : {};
  });

  const token = useSelector((state) => {
    return state.web3Data ? state.web3Data.token : null;
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
    return state.user ? state.user.balance : null;
  });


  // const [user1_tokens, setUser1_tokens] = useState("");
  // useEffect( () => {
  //   if (token.methods){
  //     token.methods.balanceOf(web3_accounts[0]).call().then((res)=>{
  //       console.log("res = ",res)
  //       setUser1_tokens(res)
  //     })
  //   }

  // }, [token]);
  

  const makeTransaction = () =>{
    console.log("transaction ")
    token.methods.transfer("0xadF98a8b0908C15867a438989CeE6583Ab6fdd18",100).send({from:web3_accounts[0]}).then((res)=>{
      console.log("I sent the cash go and check ",res)

    })

  }

  const checkBalance = () =>{
    console.log("transaction ")

    dispatch(checkBalance())

    

  }


  return (
    <>
      
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {web3_available==true?
            <p>
              Edit <code>src/App.js</code> and save to reload.
              {web3_accounts}

              This is the Token Total Supply:{totalSupply}
            </p>:true}


            <button onClick={() => 
              makeTransaction()
            }>
              Sent cash
            </button>


            <button onClick={() => 
              checkBalance()
            }>
              check Balance
            </button>

            {web3_available==true?
            <p>
              You have this amount of cash = 
              {user1_tokens} Ftoken
            </p>:true}
            {user1_tokens==0?<p>you are broke little bitch</p>:<p>you are rich as fuck wow</p>}

          </header>
        </div>
    </>
  );
}

export default App;
