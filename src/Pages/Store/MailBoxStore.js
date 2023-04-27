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
                      console.log("count",count);
                    state.unreadEmails=count;
                   console.log("mailbox inside dataactions",state.mailBox.inbox,state.mailBox.unreadEmails)
               },
               updateReadMails(state,action){
                  state.isChange=true;
                  const existitem=state.mailBox.inbox.find((item)=> item.id===action.payload.id);
                  existitem.inbox[action.payload.id].isRead=true;

               },
             

    }
})
export const mailBoxAction=mailBoxSlice.actions;
export default mailBoxSlice.reducer;