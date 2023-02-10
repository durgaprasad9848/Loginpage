import {useRef,useContext} from 'react';
import AuthContext from '../store/auth-context';
import classes from './ProfileForm.module.css';
import {useNavigate} from 'react-router-dom';

const ProfileForm = () => {

  const navigate = useNavigate();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const formSubmitHandler = event =>{
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    console.log(enteredNewPassword);

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDRuVNpK483qXGu6QL_IOKaFmOV7seq2_4",{
      method: 'POST',
      body: JSON.stringify({
        idToken : authCtx.logInToken,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json' 
      }
    }).then((res)=>{
        // assumption : Always success.

          navigate('/');
    });

  }


  return (
    <form className={classes.form} onSubmit = {formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
