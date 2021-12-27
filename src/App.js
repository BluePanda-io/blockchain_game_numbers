import React, {useEffect,useState} from 'react'



import logo from './logo.svg';
import './App.css';

import Token from './abis/Token.json'



import { useDispatch, useSelector } from "react-redux";

import {web3Initialize} from "./redux/actions/web3Actions"
import {checkBalance,transferTokens,gameTransferTokens} from "./redux/actions/userActions"



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


  const makeTransaction = () =>{

    // dispatch(transferTokens(token,accountSelect,inputNumberTokens,web3_accounts[0]))
    dispatch(gameTransferTokens(token,web3_accounts[0],inputNumberTokens,web3_accounts[0]))

  }

  const checkBalance_button = () =>{
    console.log("transaction ")
    
    dispatch(checkBalance(token,web3_accounts[0]))

  }


  const [inputNumberTokens, setInputNumberTokens] = useState(0);

  const options = [
    {
      label: "Account 2",
      value: "0xadF98a8b0908C15867a438989CeE6583Ab6fdd18",
    },
    {
      label: "Account 3",
      value: "0x5A235E3d3bAc7b361C92922960F2AEf7FA093F87",
    },
    {
      label: "Account 4",
      value: "0x53c92252AA0da19185A69fE01651C633520fC407",
    },
  ];

  const [accountSelect, setAccountSelect] = useState("0x5A235E3d3bAc7b361C92922960F2AEf7FA093F87");



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
              checkBalance_button()
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
