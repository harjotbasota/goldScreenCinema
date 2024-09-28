import React, { useContext, useState } from 'react';
import '../styles/SignUp.css';
import {Link} from 'react-router-dom';
import { MovieContext } from '../context/moviesContext';

const SignUp = () => {
    const [password1, setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const [invalidCredentails,setInvalidCredentails] = useState(true);
    const {userName, setUserName, userEmail, setUserEmail } = useContext(MovieContext);
    
    const handleSignUpFormSubmission = (e)=>{
        e.preventDefault();
        const formdata = new FormData(e.target);
        setUserName(formdata.get('Username'));
        setUserEmail(formdata.get('userEmail'));
    }

  return (
    <div className='signUp'>
      
      <form onSubmit={handleSignUpFormSubmission}>
        <h1> SignUp</h1>
        <label>Username</label>
        <input type='text' name='Username'></input>
        <label>Email</label>
        <input type='text' name='userEmail'></input>
        <label>password</label>
        <input type='password' name='password1' ></input>
        <label>Confirm Password</label>
        <input type='password' name='password2' ></input>
        { invalidCredentails? <p style={{color: 'red'}}> Password must be same!!!!  </p> : null}
        <input type='submit' value='Sign Up' disabled={invalidCredentails}></input>
        <p> Already have an account? <Link to='/Login'>login</Link> </p>
      </form>
    </div>
  )
}

export default SignUp
