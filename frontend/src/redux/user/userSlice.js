import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currUser:null,
    loading:false,
    error:null
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart:(state)=>{
        state.loading=true,
        state.error=null
    },
    signInSuccess:(state,action)=>{
        state.currUser=action.payload,
        state.loading=false,
        state.error=null
    },
    signInFailure:(state)=>{
        state.currUser=null,
        state.loading=false
    }
  },
});

export const {signInFailure,signInStart,signInSuccess}=userSlice.actions;

export default userSlice.reducer;
