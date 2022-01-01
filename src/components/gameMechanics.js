import React from "react";

import Token from '../abis/Token.json'



export const Game = ({}) => {

    

    return (
        <>

        <button onClick={() => 
          startGame_button()
        }>
          Game Start 
        </button>

        <button onClick={() => 
          playAgain_button()
        }>
          Play Again 
        </button>


        <button onClick={() => 
          finishGame_button()
        }>
          Finish Game 
        </button>

        {web3_available==true?
        <p>
          You have this amount of cash = 
          {user1_tokens} Ftoken
        </p>:true}


        {web3_available==true?
        <p>
          You have this allowance to play the game = 
          {user1_allowance} Ftoken
        </p>:true}

        <button onClick={() => 
          collectMyTokens_button()
        }>
          Collect My Tokens
        </button>
        
        {web3_available==true?
        <p>
          Tokens that you won ready to collect= 
          {tokensAvailableToCollect} Ftoken
        </p>:true}

        </>:true}

        {playingNow?
        <>
        {Products.map((p,idx) => (
          <button  
          disabled = {p.disableButton}
          onClick={e=>{ onClickFunction(e, p.name,idx); }} 
          key={p.name}
          >
            {p.name}
          </button>
        ))}
        </>:
        <>
        {tokenWon>-1?<p>You just won: {tokenWon}Fcoin</p>:true}
        </>}
        </>

    )
}