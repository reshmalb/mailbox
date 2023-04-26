import {createSlice}  from '@reduxjs/toolkit'

const initialAuth =
 { isAuthenticated : false,
    token:null,
    email:null,
   }

const authSlice = createSlice({
    name:'authorization',
    initialState:initialAuth,
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.token=action.payload.token;
            state.email=action.payload.email;
            localStorage.setItem('email',state.email)
            localStorage.setItem('token',state.token)
           
            // console.log("token",state.token)
            // console.log("userid",state.userId);
        },
        logout(state){
            state.isAuthenticated=false;
            state.token=null;
            state.email=null;
            localStorage.removeItem('token');
            localStorage.removeItem('email')
        },

    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;