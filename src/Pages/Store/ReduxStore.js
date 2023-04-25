import { configureStore } from "@reduxjs/toolkit";

import AuthorizationReducer  from './AuthStore'
import MailBoxReducer from './MailBoxStore'

const store=configureStore({
    reducer:{mailbox:MailBoxReducer,
              author: AuthorizationReducer,
              
            }  
});


export default store;

