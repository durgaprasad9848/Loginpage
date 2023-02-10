import { useState } from "react";
import AuthContext from "./auth-context";
import {useNavigate} from 'react-router-dom';

const ContextProvider = (props) => {
  // const initialToken = localStorage.getItem("token");
  
  const [loginToken, setLoginToken] = useState();

  const navigate = useNavigate();

  const storeTokenHandler = (idToken) => {
    
   localStorage.setItem("token",idToken);
    
    setLoginToken(() => {
      return idToken;
    });
  };

  const removeTokenHandler = () => {
    localStorage.removeItem("token");
    setLoginToken(() => "");
    navigate('/');
  };
const userIsLogggedIn = !!loginToken;
  
 

  const contextValue = {
    isLoggedIn:userIsLogggedIn,
    logInToken: loginToken,
    storeToken: storeTokenHandler,
    removeToken: removeTokenHandler,
  };

 
 

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
