import React, { useContext, useState } from 'react';
import '../styles/SignUp.css';
import {Link} from 'react-router-dom';
import { MovieContext } from '../context/moviesContext';

const SignUp = () => {
    const [password1, setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const [invalidCredentails,setInvalidCredentails] = useState(false);
    const {userName, setUserName, userEmail, setUserEmail } = useContext(MovieContext);
    
    const handleSignUpFormSubmission = (e)=>{
        e.preventDefault();
        const formdata = new FormData(e.target);
        setUserName(formdata.get('Username'));
        setUserEmail(formdata.get('userEmail'));
        if(password1!=password2){
          setInvalidCredentails(true);
        }else{
          setInvalidCredentails(false);
        }
    }
    const handlePasswordInput = (e)=>{
      if(e.target.name == 'password1'){
        setPassword1(e.target.value);
      }
      if(e.target.name == 'password2'){
        setPassword2(e.target.value);
      }
    }

  return (
    <div className='signUp'>
      
      <form onSubmit={handleSignUpFormSubmission}>
        <h1> SignUp</h1>
        <label htmlFor='Username'>Username</label>
        <input type='text' name='Username' placeholder='Enter username'></input>
        <label htmlFor='userEmail'>Email</label>
        <input type='text' name='userEmail' placeholder='xyz@myemail.com'></input>
        <label htmlFor='password1'>password</label>
        <input type='password' name='password1' placeholder='********' onChange={handlePasswordInput}></input>
        <label htmlFor='password2'>Confirm Password</label>
        <input type='password' name='password2' placeholder='********' onChange={handlePasswordInput} ></input>
        { invalidCredentails? <p style={{color: 'red'}}> Password must be same!!!!  </p> : null}
        <button type='submit' className='submitButton'>SignUp</button>
        <p> Already have an account? <Link to='/Login'>login</Link> </p>
      </form>
    </div>
  )
}

export default SignUp
