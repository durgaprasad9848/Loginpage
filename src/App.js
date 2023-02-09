import { Switch, Route,Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import ContextProvider from "./components/store/ContextProvider";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ContextProvider>
      <Layout>
        <Routes>
          <Route path="/" exact element={<HomePage/>}/>
      
          <Route path="/auth" exact element = {<AuthPage/>}/>
        
          <Route path="/profile" exact element = {<UserProfile/>}/>
          
        </Routes>
      </Layout>
    </ContextProvider>
  );
}

export default App;
