
import {checkAllowance,checkBalance,gameTransferTokens2} from "./userActions"



export const START_GAME = "START_GAME";
export const PLAY_AGAIN = "PLAY_AGAIN";
export const FINISH_GAME = "FINISH_GAME";


const _startGame = (web3Info) => {

    return {
      type: START_GAME,
      payload: {
          web3Info
      },
    };
  };


export const playAgain = () => {

    return {
        type: PLAY_AGAIN,
        payload: {
        },
    };
};

const _finishGame = () => {

    return {
        type: FINISH_GAME,
        payload: {
        },
    };
};


export const startGame = (token,gameAddress,accountMe) => {
    return (dispatch) => {

        let web3Info = {}

        try {

            token.methods.startGame().send({from:accountMe}).then((res)=>{
          
                dispatch(checkBalance(token,accountMe))

                dispatch(checkAllowance(token,gameAddress,accountMe))


                web3Info["playingNow"] = true


                web3Info["numberOfGame"] = Math.floor(Math.random() * 10);

                dispatch(_startGame(web3Info))

        
            })

        } catch(err) {
           console.log("I cant sent cash ")
        }
        
    }
}


export const finishGame = (token,gameAddress,accountMe,timesPlayed) => {
    return (dispatch) => {

        let web3Info = {}

        try {

            console.log("timesPlayed = ",timesPlayed)
            if (timesPlayed===0){ // Find it on 1 time
                dispatch(gameTransferTokens2(token,gameAddress,10,accountMe))
                dispatch(_finishGame())
            } else if (timesPlayed===1){ // Find it on 2 time
                dispatch(gameTransferTokens2(token,gameAddress,7,accountMe))
                dispatch(_finishGame())
            } else if (timesPlayed===2){ // Find it on 3 time
                dispatch(gameTransferTokens2(token,gameAddress,5,accountMe))
                dispatch(_finishGame())
            } else if (timesPlayed >=3){ // Find it on 4+ time
                dispatch(_finishGame())
            }

        } catch(err) {
           console.log("I cant sent cash ")
        }
        
    }
}
