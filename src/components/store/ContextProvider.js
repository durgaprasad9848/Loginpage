import { useState, useEffect } from "react";
import AuthContext from "./auth-context";
import { useNavigate } from "react-router-dom";

const ContextProvider = (props) => {
  const [loginToken, setLoginToken] = useState(null);

  const navigate = useNavigate();

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime < Date.now()) {
  
      removeTokenHandler();
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 10000;
    localStorage.setItem("expireTime", expireTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    //   window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      //   window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  const storeTokenHandler = (idToken) => {
    localStorage.setItem("token", idToken);
    localStorage.setItem("expireTime", Date.now());

    setLoginToken(() => {
      return idToken;
    });
  };

  const removeTokenHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    setLoginToken(() => null);
    navigate("/");
  };
  const userIsLogggedIn = !!loginToken;

  const contextValue = {
    isLoggedIn: userIsLogggedIn,
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
