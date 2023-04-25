import {createSlice}  from '@reduxjs/toolkit'

const mailBoxSlice=createSlice({
    name:'mailbox',
    initialState:{
             emailId:null,
             mailBox:[],//inbox,sentItems,Drafts
    },
    reducers:{
                sentMail(state,action){
                     const newMailItem=action.payload;
                     state.emailId=localStorage.getItem('email')
                     state.mailBox.sentItems.push(newMailItem);                 

                },
               replaceMailBox(state,action){
                state.emailId=localStorage.getItem('email')
                state.mailBox.inbox.push(action.payload.inbox)
                state.mailBox.sentItems.push(action.mailBox.sentItems)
                state.mailBox.drafts.push(action.payload.drafts)
               },
             

    }
})
export const mailBoxAction=mailBoxSlice.reducer;
export default mailBoxSlice.reducer;