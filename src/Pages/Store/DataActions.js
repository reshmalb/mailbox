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

  export const sendMailData= async(newMail,email)=>{
            return async(dispatch)=>{     
                 const  sendRequest=async() =>{
                const response=await axios.post(`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${email}/inbox.json`,

                   email );
        
                    if(!response.statusText==='OK'){
                        throw new Error('Sending data failed')
                    }
                    else 
                    return  response.data;
        
                   }
        
                  try{
                     const responseData= await sendRequest(); 
                     dispatch(mailBoxAction.sentMail({
                        sentItems:{
                            sendTo:email,
                            subject:newMail.subject,
                            content:newMail.content,
                        }
                     }))                    
                     
                   }catch(error){
                    alert("error ")
                   }      
             }
         }    
   export const fetchMailBox=(email)=>{
            return async(dispatch)=>{
                const  getMailboxData=async()=>{
        
                  console.log("email",email);
                    const response=await axios.get(`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${email}.json`)
                            if(response.status!==200) {
                                throw new Error('Fetching mailbox data failed...')
                            }  
                    const data=response.data;   
                    console.log("mailbox data",response) 
                    return data;    
                    
                }
                try{
                   const mailboxData= await getMailboxData()
                   console.log("mailbox data2",mailboxData.mailboxDetails) 

                   dispatch(mailBoxAction.replaceMailbox({
                    inbox:mailboxData.inbox||[],
                    sentItems:mailboxData.sentItems||[],
                    drafts:mailboxData.drafts||[],
        
                   }))
                }catch(error){
                    console.log(error.message);
                }

            }
        }
        export const updateMailBox=(mailbox,email)=>{
            return async()=>{
                try{
                const response=
                await axios.put(`https://fir-login-aea12-default-rtdb.firebaseio.com/mailbox/${email}.json`,
                       mailbox);
                       if(response.status===200){
                        alert("mailbox updated successfully")
                       }


                }catch(error){
                    alert(error.message)
                }
            }
        }

        export const deleteData=(id)=>{
            return async()=>{
                try {
                    const response=await axios.delete(`https://fir-login-aea12-default-rtdb.firebaseio.com/expenses/${id}.json`);
                    if(response.status===200){
                       alert("Data deleted successfully")
                    }
                   
                  } catch (error) {
                    console.log(error);
                  }

            }
          
            
        }
        
