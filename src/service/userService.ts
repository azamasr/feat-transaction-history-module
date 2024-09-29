export const checkUser = (payload: UserState) => {
  try {
    if (
      payload.userName === payload.mockUserName &&
      payload.password === payload.mockPassword
    ) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('checkUser error', error);
    return false;
  }
};
