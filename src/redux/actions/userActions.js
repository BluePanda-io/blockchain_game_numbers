import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'


import Token from '../../abis/Token.json'


export const CHECK_BALANCE = "CHECK_BALANCE";

const _checkBalance = (userData) => {

    return {
      type: CHECK_BALANCE,
      payload: {
          userData
      },
    };
  };


export const checkBalance = (token,account) => {
    return (dispatch) => {

        let userData = {}

        try {
           
            const userBalance = token.methods.balanceOf(account).call().then(res=>{

                userData["userBalance"] = res


                dispatch(_checkBalance(userData));
            })

            

        } catch(err) {
           console.log("No Etherium Wallet")
        }
        
    }
}

