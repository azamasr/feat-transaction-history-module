import {create} from 'zustand';

import {createUserSlice, UserSlice} from '../store/slice/userSlice';

export const userStore = create<UserSlice>((...a) => ({
  ...createUserSlice(...a),
}));

const store = {userStore};
export default store;
