import { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';


import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctx = useContext(AuthContext);
 // const toShow = localStorage.getItem("token") === null;
 console.log("HI",ctx.logInToken);
  const toShow =  ctx.logInToken===null;
  console.log(toShow)
  const navigate = useNavigate();

 
 

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          { toShow && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          { !toShow && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          { !toShow && <li>
            <button onClick={ctx.removeToken}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;