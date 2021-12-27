

export const CHECK_BALANCE = "CHECK_BALANCE";
export const CHECK_ALLOWANCE = "CHECK_ALLOWANCE";

const _checkBalance = (web3Info) => {

    return {
      type: CHECK_BALANCE,
      payload: {
          web3Info
      },
    };
  };

  const _checkAllowance= (web3Info) => {

    return {
      type: CHECK_ALLOWANCE,
      payload: {
          web3Info
      },
    };
  };


export const checkBalance = (token,account) => {
    return (dispatch) => {

        let web3Info = {}

        console.log("this is amazing")

        try {
           
            token.methods.balanceOf(account).call().then(res=>{

                web3Info["userBalance"] = res


                dispatch(_checkBalance(web3Info));
            })

            

        } catch(err) {
           console.log("No Etherium Wallet")
        }
        
    }
}

export const checkAllowance = (token,gameAddress,account) => {
    return (dispatch) => {

        let web3Info = {}

        console.log("this is amazing")

        try {
           
            token.methods.allowance(gameAddress,account).call().then(res=>{

                web3Info["userAllowance"] = res


                dispatch(_checkAllowance(web3Info));
            })

            

        } catch(err) {
           console.log("No Etherium Wallet")
        }
        
    }
}

export const transferTokens = (token,accountSend,numberOfTokens,accountMe) => {
    return (dispatch) => {

        try {

            token.methods.transfer(accountSend,numberOfTokens).send({from:accountMe}).then((res)=>{
          
                dispatch(checkBalance(token,accountMe))
        
            })

        } catch(err) {
           console.log("I cant sent cash ")
        }
        
    }
}


// export const gameTransferTokens = (token,gameAddress,numberOfTokens,accountMe) => {
//     return (dispatch) => {


//         // try {

//         //     token.methods.transferFrom(gameAddress,accountMe,numberOfTokens).send({from:accountMe}).then((res)=>{
          
//         //         dispatch(checkBalance(token,accountMe))
        
//         //     })

//         // } catch(err) {
//         //    console.log("I cant sent cash ")
//         // }
        
//     }
// }

export const gameTransferTokens2 = (token,gameAddress,numberOfTokens,accountMe) => {
    return (dispatch) => {


        try {

            token.methods.transferFrom(gameAddress,accountMe,numberOfTokens).send({from:accountMe}).then((res)=>{
          
                dispatch(checkBalance(token,accountMe))
                dispatch(checkAllowance(token,gameAddress,accountMe))

        
            })

        } catch(err) {
           console.log("I cant sent cash ")
        }
        
    }
}

export const allowedTokensToPlay = (token,gameAddress,accountMe) => {
    return (dispatch) => {


        try {

            token.methods.allowedTokensToPlay().send({from:accountMe}).then((res)=>{
          
                dispatch(checkAllowance(token,gameAddress,accountMe))
        
            })

        } catch(err) {
           console.log("I cant sent cash ")
        }
        
    }
}

