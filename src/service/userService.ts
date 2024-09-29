export const checkUser = (payload: UserState) => {
  try {
    //MOCK USER AUTH API
    if (
      payload.userName === payload.mockUserName &&
      payload.password === payload.mockPassword
    ) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error('User Auth Error');
  }
};
