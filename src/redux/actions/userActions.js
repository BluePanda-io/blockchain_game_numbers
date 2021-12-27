

export const CHECK_BALANCE = "CHECK_BALANCE";

const _checkBalance = (web3Info) => {

    return {
      type: CHECK_BALANCE,
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


export const gameTransferTokens = (token,accountSend,numberOfTokens,accountMe) => {
    return (dispatch) => {

        const gameAddress = "0xadF98a8b0908C15867a438989CeE6583Ab6fdd18"

        try {

            token.methods.transfer(accountSend,numberOfTokens).send({from:gameAddress}).then((res)=>{
          
                dispatch(checkBalance(token,accountMe))
        
            })

        } catch(err) {
           console.log("I cant sent cash ")
        }
        
    }
}

