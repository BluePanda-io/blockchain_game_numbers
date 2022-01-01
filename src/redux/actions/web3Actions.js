import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'


import Token from '../../abis/Token.json'


export const WEB3INIT = "WEB3INIT";
export const CHANGE_ADDRESS_METAMASK = "CHANGE_ADDRESS_METAMASK";
export const FF = "FF";
export const CHECK_BALANCE = "CHECK_BALANCE";


const _web3Initialize = (web3Info) => {

    return {
      type: WEB3INIT,
      payload: {
          web3Info
      },
    };
  };

const _changeAddressMetamask = (web3Info) => {

    return {
        type: CHANGE_ADDRESS_METAMASK,
        payload: {
            web3Info
        },
    };
};


export const changeAddressMetamask = () => {
    return async (dispatch) => {


        const provider = await detectEthereumProvider(); 

        let web3Info = {}

        window.web3 = new Web3(window.ethereum)


        web3Info["window_web3"] = window.web3 



        const accounts = await window.web3.eth.getAccounts()
        web3Info["accounts"] = accounts


        const networkId = await window.web3.eth.net.getId()



        const token = new window.web3.eth.Contract(Token.abi, Token.networks[networkId].address)

        web3Info["token"] = token




        const gameAddress = await token.methods.gameAddress().call()
        web3Info["gameAddress"] = gameAddress



        const userBalance = await token.methods.balanceOf(accounts[0]).call()
        web3Info["userBalance"] = userBalance



        const userAllowance = await token.methods.allowance(gameAddress,accounts[0]).call()
        web3Info["userAllowance"] = userAllowance


        const startAddress = web3Info["accounts"][0].substring(0, 5)


        let tokensAvailableToCollect = localStorage.getItem(`tokensAvailableToCollect_${startAddress}`)
        if (localStorage.getItem(`tokensAvailableToCollect_${startAddress}`)){
            web3Info["tokensAvailableToCollect"] = parseInt(tokensAvailableToCollect)
        } else {
            localStorage.setItem(`tokensAvailableToCollect_${startAddress}`, 0);
            web3Info["tokensAvailableToCollect"] = 0
        }




        dispatch(_changeAddressMetamask(web3Info));

        
    }
}


export const web3Initialize = () => {
    return async (dispatch) => {


        const provider = await detectEthereumProvider(); 

        let web3Info = {}

        try {
            console.log("tt -> 0.5",Token.abi)
            console.log("tt -> 1",window.ethereum)
            console.log("tt -> 1.5",provider)
            window.web3 = new Web3(window.ethereum)


            web3Info["window_web3"] = window.web3 

            console.log("tt -> 2",window.web3 )


            const accounts = await window.web3.eth.getAccounts()
            web3Info["accounts"] = accounts


            console.log("tt -> 3",accounts)
            
            const networkId = await window.web3.eth.net.getId()

            console.log("tt -> 3.5",networkId)
            console.log("tt -> 3.7",Token.abi)
            console.log("tt -> 3.8",Token.networks[networkId])
            console.log("tt -> 3.8",Token.networks)


            const token = new window.web3.eth.Contract(Token.abi, Token.networks[networkId].address)

            web3Info["token"] = token



            console.log("tt -> 4",token)


            const gameAddress = await token.methods.gameAddress().call()
            web3Info["gameAddress"] = gameAddress



            const userBalance = await token.methods.balanceOf(accounts[0]).call()
            web3Info["userBalance"] = userBalance

            console.log("tt -> 5",userBalance)



            const userAllowance = await token.methods.allowance(gameAddress,accounts[0]).call()
            web3Info["userAllowance"] = userAllowance

            console.log("tt -> 5",userAllowance)

            

            const startAddress = web3Info["accounts"][0].substring(0, 5)




            let tokensAvailableToCollect = localStorage.getItem(`tokensAvailableToCollect_${startAddress}`)
            if (localStorage.getItem(`tokensAvailableToCollect_${startAddress}`)){
                web3Info["tokensAvailableToCollect"] = parseInt(tokensAvailableToCollect)
            } else {
                localStorage.setItem(`tokensAvailableToCollect_${startAddress}`, 0);
                web3Info["tokensAvailableToCollect"] = 0
            }


            console.log("tt -> 6",web3Info["tokensAvailableToCollect"])


            dispatch(_web3Initialize(web3Info));

        } catch(err) {
           console.log("No Etherium Wallet")
        }




        
    }
}

