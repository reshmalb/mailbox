import axios from 'axios'

import { authActions } from './AuthStore'
import { expenseActions } from "./ExpenseStore";

export const  loginRequest=(user)=>{
    return async(dispatch)=>{
        const loginData=async()=>{
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
        const responseData=await loginData()
        console.log("login",responseData)
          dispatch(authActions.login({token:responseData.data.idToken,email:responseData.data.email}))
        }
        catch(error){
          console.log(error.message)
        }
    }
}


export const  SignupRequest=async (user)=>{
    
            try{
                const response=await axios.post(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmu2iAn2bEUPLR2hBHCQAhknCpMMWjz3o',{
                        email:user.email,
                        password:user.password,
                        returnSecureToken:true,
                    })
                    if(!response.statusText==='OK'){
                        throw new Error("Sign up Failed")
                    }
                    else{
                        return response;
                    }
    
                  
            } catch(error){
            console.log(error.message)
              }
            
        }

  export const sendExpenseData=(expense,email)=>{
            return async(dispatch)=>{     
                 const  sendRequest=async() =>{
                    const response=await axios.put(`https://fir-login-aea12-default-rtdb.firebaseio.com/expenses/${email}.json`,
                    {
                    expensedetails:expense.expensedetails,
                     
                    })
        
                    if(!response.statusText==='OK'){
                        throw new Error('Sending data failed')
                    }
        
                   }
        
                   try{
                      await sendRequest();                     
                     
                   }catch(error){
                    alert("error ")
                   }      
             }
         }    
   export const fetchData=(email)=>{
            return async(dispatch)=>{
                const fetchExistexpenseData=async()=>{
        
                  console.log("email",email);
                    const response=await axios.get(`https://fir-login-aea12-default-rtdb.firebaseio.com/expenses/${email}.json`)
                            if(response.statusText!=='OK') {
                                throw new Error('Fetching expense data failed...')
                            }  
                    const data=response.data;   
                    console.log("expense data",response) 
                    return data;    
                    
                }
                try{
                   const expenseData= await fetchExistexpenseData()
                   console.log("expense data",expenseData.expensedetails) 

                   dispatch(expenseActions.replaceExpense({
                    expensedetails:expenseData.expensedetails||[],
        
                   }))
                }catch(error){
                    console.log(error.message);
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
        
