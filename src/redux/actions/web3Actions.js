import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'


import Token from '../../abis/Token.json'


export const WEB3INIT = "WEB3INIT";
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

  const _checkBalance = (userData) => {

    return {
      type: CHECK_BALANCE,
      payload: {
          userData
      },
    };
  };

  const _tst = (web3Info) => {

    return {
      type: CHECK_BALANCE,
      payload: {
          web3Info
      },
    };
  };


export const checkBalance = (token,account) => {
    return async (dispatch) => {
        let web3Info = {}

        // dispatch(_tst(web3Info));
        const userBalance = token.methods.balanceOf(account).call().then(res=>{

            web3Info["userBalance"] = res


            dispatch(_tst(web3Info));
        })

    }

}

// export const checkBalance = (token,account) => {
//     return (dispatch) => {

//         let userData = {}

//         try {
           
//             const userBalance = token.methods.balanceOf(account).call().then(res=>{

//                 userData["userBalance"] = res


//                 dispatch(_checkBalance(userData));
//             })

            

//         } catch(err) {
//            console.log("No Etherium Wallet")
//         }
        
//     }
// }

export const web3Initialize = () => {
    return async (dispatch) => {


        const provider = await detectEthereumProvider(); 

        let web3Info = {}

        try {
            window.web3 = new Web3(provider)


            web3Info["window_web3"] = window.web3 

            const accounts = await window.web3.eth.getAccounts()

            web3Info["accounts"] = accounts


            const networkId = await window.web3.eth.net.getId()
            const token = new window.web3.eth.Contract(Token.abi, Token.networks[networkId].address)

            web3Info["token"] = token

            const userBalance = await token.methods.balanceOf(accounts[0]).call()

            // web3Info["userBalance"] = "userBalance"
            web3Info["userBalance"] = userBalance


            dispatch(_web3Initialize(web3Info));

        } catch(err) {
           console.log("No Etherium Wallet")
        }




        
    }
}

