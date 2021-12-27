
import {checkAllowance,checkBalance} from "./userActions"



export const START_GAME = "START_GAME";
export const PLAY_AGAIN = "PLAY_AGAIN";


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


export const startGame = (token,gameAddress,accountMe) => {
    return (dispatch) => {

        let web3Info = {}

        try {

            token.methods.startGame().send({from:accountMe}).then((res)=>{
          
                dispatch(checkBalance(token,accountMe))

                dispatch(checkAllowance(token,gameAddress,accountMe))


                web3Info["playingNow"] = true
                dispatch(_startGame(web3Info))

        
            })

        } catch(err) {
           console.log("I cant sent cash ")
        }
        
    }
}
