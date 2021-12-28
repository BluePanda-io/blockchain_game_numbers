import * as web3ActionTags from "../actions/web3Actions";
import * as userActionTags from "../actions/userActions";
import * as gameActionTags from "../actions/gameActions";


const stateUserInitial = {
  playingNow: false,
  timesPlayed: 0,
};

const gameReducer = (stateUser = stateUserInitial, action) => {
  const { type, payload } = action;

  switch (type) {
    case gameActionTags.START_GAME:
      console.log("sdfasdfasdfasdfa")
      return {
        ...stateUser,
        playingNow: payload.web3Info.playingNow,
        timesPlayed: 0,
      };
    case gameActionTags.PLAY_AGAIN:
      console.log("sdfasdfasdfasdfa")
      return {
        ...stateUser,
        timesPlayed: stateUser.timesPlayed + 1,
      };
    case gameActionTags.FINISH_GAME:
      console.log("sdfasdfasdfasdfa")
      return {
        ...stateUser,
        playingNow: false,
        timesPlayed: 0,
      };

    default:
      return {...stateUser};
  }
};

export default gameReducer;
