import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface USER {
  displayName: string;
  photoUrl: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { uid: '', photoUrl: '', displayName: '' },
  },
  // reducerはactionと現在のstateを受け取る
  reducers: {
    login: (state, action) => {
      // ログイン成功時、firebaseから取得したユーザー情報をreduxのstateに反映。
      state.user = action.payload;
    },
    logout: (state) => {
      // state初期化
      state.user = { uid: '', photoUrl: '', displayName: '' };
    },
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
    },
  },
});

// export action
export const { login, logout, updateUserProfile } = userSlice.actions;
// ReduxのstoreのstateをreactのコンポーネントからuseSelectorで参照するときに指定する関数。
export const selectUser = (state: RootState) => state.user.user;
// export reducer
export default userSlice.reducer;
