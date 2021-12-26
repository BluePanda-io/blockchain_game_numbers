// import * as loginActionTags from "../actions/loginActions";

const stateUserInitial = {
  isLogin: false,
  token: "",
  userJSON: {},
  userAccess: "",
};

const web3Reducer = (stateUser = stateUserInitial, action) => {
  const { type, payload } = action;

  switch (type) {
    // case loginActionTags.LOGIN_USER_EMAIL:
    //   return {
    //     ...stateUser,
    //     token: payload.token,
    //     userJSON: payload.userJSON,
    //     isLogin: true,
    //     userAccess: payload.userJSON.userAccess,
    //   };
    // case loginActionTags.LOGOUT_USER_USER:
    //   return { ...stateUserInitial };

    default:
      return stateUser;
  }
};

export default web3Reducer;
