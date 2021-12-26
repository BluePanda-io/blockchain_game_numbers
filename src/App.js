import React, {useEffect} from 'react'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'


import logo from './logo.svg';
import './App.css';

import Token from './abis/Token.json'

import { Provider } from "react-redux";
import store from "./redux/index";



function App() {

  useEffect(() => {
    loadBlockchainData()
  }, []);

  const loadBlockchainData = async () => {
    // console.log("torino2")
    const web3 = new Web3(Web3.giveProvider || 'https://localhost:7545')
    // const web3 = new Web3(window.ethereum)
    // console.log("web3 = ",web3)

    // const networkId = await web3.eth.net.getId()
    // console.log("networkId = ",networkId)

    // const accounts = await web3.eth.getAccounts()
    // console.log("accounts = ",accounts)


    // const network2 = await web3.eth.net.getNetworkType()
    // // web3.eth.net.getNetworkType().then(console.log("gulano"))
    // console.log("network2 = ",network2)

    // // const accounts = await web3.eth.getAccounts()

    // // console.log("accounts = ",accounts)

    // ------------------------

    // var accounts = await web3.eth.getAccounts();
    // var userAccount =accounts[0]

    // console.log("userAccount = ",userAccount)

    // ------------------------

    const provider = await detectEthereumProvider(); 

    if (provider){
      console.log("Etherium wallet is connected")
      window.web3 = new Web3(provider)

      const accounts = await window.web3.eth.getAccounts()
      console.log("accounts = ",accounts)

      const network2 = await window.web3.eth.net.getNetworkType()
      console.log("network2 = ",network2)

      const networkId = await window.web3.eth.net.getId()
      console.log("networkId = ",networkId)

      console.log("abi = ",Token.abi )


      const token = new window.web3.eth.Contract(Token.abi, Token.networks[networkId].address)
      console.log("token = ",token )

      const totalSupply = await token.methods.totalSupply().call()
      console.log("totalSupply", totalSupply)



      
    } else {
      console.log("No Etherium")
    }

    // ------------------------

    // let w3
    // if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
    //   //getting Permission to access
    //   window.ethereum.enable();
    //   w3 = new Web3(window.ethereum);

    //   const accounts = await window.web3.eth.getAccounts()
    //   console.log("accounts = ",accounts)

    // }else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //   w3 = new Web3(window.web3.currentProvider);
    //   // In legacy MetaMask acccounts are always exposed

    //   console.log("toni2")


    // } else {
    //   alert("No MetaMask detected, please install MetaMask first");
    //   console.log("toni3")

    // }


  }


  

  return (
    <>
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Provider>
    </>
  );
}

export default App;
