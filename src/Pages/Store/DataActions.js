import axios from 'axios'

import { authActions } from './AuthStore'
import { mailBoxAction } from './MailBoxStore'




export const  loginRequest=(user)=>{
    return async(dispatch)=>{
        const loginData=async()=>{
        console.log("userData",user)

            const response=await axios.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmu2iAn2bEUPLR2hBHCQAhknCpMMWjz3o',{
                    email:user.email,
                    password:user.password,
                    returnSecureToken:true,
                })
                if(!response.statusText==='OK'){
                    throw new Error("Authentication failed")
                }
                else{
                    return response;
                }

              
        }

        try{
         const   responseData=await loginData()
          console.log("inside login request",responseData)
           dispatch(authActions.login({token:responseData.data.idToken,email:responseData.data.email}))
          }
        catch(error){
          console.log(error.message)
        }
    }
}

// export const  SignupRequest=async (user)=>{
    
//             try{
//                 const response=await axios.post(
//                     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmu2iAn2bEUPLR2hBHCQAhknCpMMWjz3o',{
//                         email:user.email,
//                         password:user.password,
//                         returnSecureToken:true,
//                     })
//                     if(!response.statusText==='OK'){
//                         throw new Error("Sign up Failed")
//                     }
//                     else{
//                         return response;
//                     }
    
                  
//             } catch(error){
//             console.log(error.message)
//               }
            
//         }

  export const sendMailData= (newMail,email)=>{
    const reciever=email.replaceAll('.','')
            console.log("inside apicall")
            return async(dispatch)=>{     
                 const  sendRequest=async() =>{
                const response=await axios.post(
                    `https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${reciever}/inbox.json`,newMail);
                   
        
                    if(!response.statusText==='OK'){

                        const draftresponse=await axios.post(
                            `https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${newMail.sentFrom}/drafts.json`,newMail);
                           if(draftresponse.status===200){
                            alert("drafts saved successfully")
                           }


                        throw new Error('Sending data failed');                        
                        
                    }
                    else 
                    return  response;
        
                   }
        
                  try{
                     const responseData= await sendRequest(); 
                       if(responseData.status===200){
                        alert("email send successfully")
                        //for updating sentitems in firebase
                        try{
                          const sender=newMail.sentFrom.replaceAll('.','')
                          
                          const sentData={
                                   sentTo:email,
                                   subject:newMail.subject,
                                   content:newMail.content,
                                   date:newMail.date,
                                   time:newMail.time
                          }         
                         const sentresponse=await axios.post(
                                `https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${sender}/sentitems.json`,
                                sentData);
                                if(sentresponse.status===200){
                                    dispatch(mailBoxAction.sentMail(sentData))               

                                }
                               
                               
                        }catch(error){
                            console.log("error in uploading sentitems")

                        }


                       }
                     
                       
                     
                   }catch(error){
                    alert("error ")
                   }      
             }

         }    
   export const fetchMailBox=(email)=>{
            return async(dispatch)=>{
                const  getMailboxData=async()=>{
        
                    const response=await axios.get(`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${email}.json`)
                            if(response.status!==200) {
                                throw new Error('Fetching mailbox data failed...')
                            }  
                    //const data=response.data;   
                    return response;    
                    
                }
                try{
                   const mailbox= await getMailboxData()
                   const mailboxData=mailbox.data;
                   const inboxArray = 'inbox' in mailboxData?
                    Object.entries(mailboxData.inbox).map(([id, email]) => ({ id, ...email }))
                    :[];
                 const  sentItemsArray = 'sentitems' in mailboxData
                     ? Object.entries(mailboxData.sentitems).map(([id, email]) => ({ id, ...email }))
                     : [];

                   const draftArray ='drafts' in mailboxData?
                    Object.entries(mailboxData.draft).map(([id, email]) => ({ id, ...email }))
                    :[];
                    
                   dispatch(mailBoxAction.replaceMailbox({
                    inbox:inboxArray,
                    sentItems:sentItemsArray,
                    drafts:draftArray        
                   }))
                }catch(error){
                    console.log("error inside fetch");
                }

            }
           
        }

   export const updateReadEmails=(id,email,updatedMail)=>{
    const sender=email.replaceAll('.','')
    console.log(id,email,sender,updatedMail)
       return async(dispatch)=>{
               const updateRead=async()=>{
                    try{
                        const response=await axios.put(
                            `https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${sender}/inbox/${id}.json`,updatedMail);                           


                       if(!response.status===200){
                        throw new Error('Failed in updatedReadMails')
                       }
                      else{
                        return response;

                      }
                    }catch(error){
                        console.log(error.message)

                    }
               }
               try{
                const responseData=await updateRead();
                dispatch(mailBoxAction.updateReadMails(updatedMail))

               }catch(error){
                console.log("error in dispatch action of updated read mails");
               }
       }
        

         }
       
      
export const deleteData=(id,email)=>{
          const sender=email.replaceAll('.','')
          console.log(sender);
            return async(dispatch)=>{
                console.log("inside return")
              const deleteEmail=async()=>{
                console.log("inside deletemaiil")

                    try {
                        const response=await axios.delete(`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${sender}/inbox/${id}.json`);
                        if(!response.status===200){
                            throw new Error("Deletion failed")
                          
                        }
                        else{
                            alert("email deleted successfully")
                            return response;
                        }
                       
                      } catch (error) {
                        console.log(error.message);
                      }
                    }
                      try{
                        const responseData=await deleteEmail();
                        console.log("responseData",responseData.data)
                         dispatch(mailBoxAction.deleteEmails(id))
  
                      }catch(error){
                        console.log("error in dispatch actions")
                      }
                     
                
               

            }
          
            
        }
        export const deleteSentItems=(id,email)=>{
            const sender=email.replaceAll('.','')
            console.log(sender);
              return async(dispatch)=>{
                  console.log("inside return")
                const deleteEmail=async()=>{
                  console.log("inside deletemaiil")
  
                      try {
                          const response=await axios.delete(`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${sender}/sentItems/${id}.json`);
                          if(!response.status===200){
                              throw new Error("Deletion failed")
                            
                          }
                          else{
                              alert("email deleted successfully")
                              return response;
                          }
                         
                        } catch (error) {
                          console.log(error.message);
                        }
                      }
                        try{
                          const responseData=await deleteEmail();
                          console.log("responseData",responseData.data)
                           dispatch(mailBoxAction.deleteSentEmails(id))
    
                        }catch(error){
                          console.log("error in dispatch actions")
                        }
                       
                  
                 
  
              }
            
              
          }
          
  
        
