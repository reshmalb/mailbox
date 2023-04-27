import {createSlice}  from '@reduxjs/toolkit'

const mailBoxSlice=createSlice({
    name:'mailbox',
    initialState:{
             emailId:null,
             mailBox: {
                inbox: [],
                sentItems: [],
                drafts: []
              },
              unreadEmails:0,
              isChange:false,
             //inbox,sentItems,Drafts
    },
    reducers:{
                sentMail(state,action){
                     state.isChange=true;
                     const newMailItem=action.payload;
                     state.emailId=localStorage.getItem('email')
                     state.mailBox.sentItems.push(newMailItem);                 

                },
                replaceMailbox(state,action){
                    state.emailId = localStorage.getItem('email')
                    state.mailBox.inbox = action.payload.inbox || [];
                    state.mailBox.sentItems = action.payload.sentItems || [];
                    state.mailBox.drafts = action.payload.drafts || [];
                    const count = state.mailBox.inbox.reduce((accumulator, currentValue) => {
                        if (currentValue.isRead === false) {
                          return accumulator + 1;
                        }
                        return accumulator;
                      }, 0);
                    state.unreadEmails=count;
               },
               updateReadMails(state,action){
                  state.isChange=true;
                  const existitem=state.mailBox.inbox.find((item)=> item.id===action.payload.id);
                 
                  if(existitem){
                    existitem.isRead=action.payload.isRead;
                  }
                     const count = state.mailBox.inbox.reduce((accumulator, currentValue) => {
                        if (currentValue.isRead === false) {
                          return accumulator + 1;
                        }
                        return accumulator;
                      }, 0);
                    state.unreadEmails=count;

               },
               deleteEmails(state,action){
                state.isChange=true;
                console.log("mailstore")
                state.mailBox.inbox=state.mailBox.inbox.filter((item)=>item.id!==action.payload);
                const count = state.mailBox.inbox.reduce((accumulator, currentValue) => {
                  if (currentValue.isRead === false) {
                    return accumulator + 1;
                  }
                  return accumulator;
                }, 0);
              state.unreadEmails=count;
               }
             

    }
})
export const mailBoxAction=mailBoxSlice.actions;
export default mailBoxSlice.reducer;