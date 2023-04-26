import {createSlice}  from '@reduxjs/toolkit'

const mailBoxSlice=createSlice({
    name:'mailbox',
    initialState:{
             emailId:null,
             mailBox: {
                inbox: [],
                sentItems: [],
                drafts: []
              }
             //inbox,sentItems,Drafts
    },
    reducers:{
                sentMail(state,action){
                     const newMailItem=action.payload;
                     state.emailId=localStorage.getItem('email')
                     state.mailBox.sentItems.push(newMailItem);                 

                },
                replaceMailbox(state,action){
                    state.emailId = localStorage.getItem('email')
                    state.mailBox.inbox = action.payload.inbox || [];
                    state.mailBox.sentItems = action.payload.sentItems || [];
                    state.mailBox.drafts = action.payload.drafts || [];
                console.log("mailbox inside dataactions",state.mailBox.inbox,state.mailBox.sentItems,state.mailBox.drafts)
               },
             

    }
})
export const mailBoxAction=mailBoxSlice.actions;
export default mailBoxSlice.reducer;