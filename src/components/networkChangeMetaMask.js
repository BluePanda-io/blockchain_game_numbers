import React from "react";

import Token from '../abis/Token.json'


const networksInfo = {
    // https://chainid.network/chains.json
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"]
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org"
      ],
      blockExplorerUrls: ["https://bscscan.com"]
    },
  };

export const NetworkChange = ({}) => {

    const changeNetwork = async (networkName ) => {
        try {
          console.log("networksInfo[networkName] = ",networksInfo[`${networkName}`],networkName)
          if (!window.ethereum) throw new Error("No crypto wallet found");
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...networksInfo[networkName]
              }
            ]
          });
        } catch (err) {
          console.log("error",err.message);
        }
      };


      const connectMetamask_button = async () =>{

            console.log("het")
        
            const accounts3 = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account3 = accounts3[0];
        
            
            const networkId = await window.web3.eth.net.getId()
            
            console.log("account3 = ",accounts3,networkId,Token.networks[networkId])
        
            if (Token.networks[networkId]==undefined){
              changeNetwork("polygon")
        
        
            }
        }
    

    return (

        <button 
        onClick={() => 
            connectMetamask_button()
        }
        >
            Connect Metamask
        </button>

    )
}