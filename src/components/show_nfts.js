import React, {useState} from "react";



import { useDispatch, useSelector } from "react-redux";

import { Card,CardHeader,CardMedia } from "@material-ui/core";




// import {startGame,playAgain,finishGame} from "../redux/actions/gameActions"

import {mintNFT,showNFTs,sentNFT} from "../redux/actions/NFT_Actions"

import {checkBalance,transferTokens,gameTransferTokens,
  allowedTokensToPlay,
  gameTransferTokens2
} from "../redux/actions/userActions"

export const ShowNFT_page = ({}) => {

  const dispatch = useDispatch();

  const web3_accounts = useSelector((state) => {return state.userData ? state.userData.accounts : {};});
  const totalSupplyNFTs = useSelector((state) => {return state.nftData ? state.nftData.totalSupplyNFTs : {};});
  const NFT_contract = useSelector((state) => {return state.nftData ? state.nftData.NFT_contract : {};});
  const mint_nft_directory = useSelector((state) => {return state.nftData ? state.nftData.mint_nft_directory : {};});
  const NFTs_pathDirectory = useSelector((state) => {return state.nftData ? state.nftData.NFTs_pathDirectory : {};});


  const showNFTs_button = () =>{


    // console.log("f = ",NFT_contract,web3_accounts[0],totalSupplyNFTs)
    dispatch(showNFTs(NFT_contract,web3_accounts[0],totalSupplyNFTs))
    // dispatch(gameTransferTokens(token,web3_accounts[0],inputNumberTokens,web3_accounts[0]))

  }

  const sentNFT_button = () =>{


    // // console.log("f = ",NFT_contract,web3_accounts[0],totalSupplyNFTs)
    // dispatch(showNFTs(NFT_contract,web3_accounts[0],totalSupplyNFTs))
    // // dispatch(gameTransferTokens(token,web3_accounts[0],inputNumberTokens,web3_accounts[0]))

    console.log("selectNFT = ",selectNFT)
    console.log("selectNFT 2= ",NFTs_pathDirectory[selectNFT].index)

    console.log("NFT_contract,web3_accounts[0],accountSelect,NFTs_pathDirectory[selectNFT].index = ",NFT_contract,web3_accounts[0],accountSelect,NFTs_pathDirectory[selectNFT].index)

    dispatch(sentNFT(NFT_contract,web3_accounts[0],accountSelect,NFTs_pathDirectory[selectNFT].index));


  }



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
  
  const [accountSelect, setAccountSelect] = useState(options[0].value);


  const [selectNFT,setSelectNFT] = useState(-1)
  

    return (
        <>

          <button onClick={() => 
            showNFTs_button()
          }>
            Show NFTs that I have 
          </button>

          <br/>
          <br/>

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
            sentNFT_button()
          }>
            Sent NFT 
          </button>

          <br/>


          {NFTs_pathDirectory.map((pathNFT,idx) => (
            <>
              {pathNFT.pathDirectory!=""?
              <>
              <input
                type="radio"
                checked={idx === selectNFT}
                onChange={()=>{
                  setSelectNFT(idx)
                }}
              />
              {pathNFT.pathDirectory?<img src={pathNFT.pathDirectory} alt="image" />:true}
              <br/>
              </>:true}
            </>
            ))}

          

        

        </>

    )
}