import {StateCreator} from 'zustand';

// Actions interface
interface UserActions {
  setInitialState: () => void;
  setLoginUser: (loginData: Partial<UserState>) => void;
}

// Combined slice interface
export interface UserSlice {
  user: UserState & UserActions;
}

// Initial state
const initialUserState: UserState = {
  userName: 'John Doe',
  password: 'abcd123',
};

// Create slice
export const createUserSlice: StateCreator<UserSlice> = set => ({
  user: {
    ...initialUserState,
    setInitialState: () =>
      set(state => ({
        user: {
          ...state.user,
          ...initialUserState,
        },
      })),
    setLoginUser: (loginData: Partial<UserState> | UserState) =>
      set(state => ({
        user: {
          ...state.user,
          ...loginData,
        },
      })),
  },
});

// Type for the entire store
export type UserStore = ReturnType<typeof createUserSlice>;
