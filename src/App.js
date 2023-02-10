import { Route,Routes } from "react-router-dom";
import AuthContext from "./components/store/auth-context";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import ContextProvider from "./components/store/ContextProvider";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { useContext } from "react";

function App() {
 
  const authCtx = useContext(AuthContext);
  return (
    <ContextProvider>
      <Layout>
        <Routes>
          <Route path="/" exact element={<HomePage/>}/>
        {!authCtx.isLoggedIn && (
          <Route path="/auth" exact element = {<AuthPage/>}/>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/profile" exact element = {<UserProfile/>}/>
        )}
         
          <Route path ="*" exact element = {<HomePage/>} />
           
        </Routes>
      </Layout>
    </ContextProvider>
  );
}

export default App;
