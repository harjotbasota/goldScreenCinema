import React, { useState } from 'react';
import '../styles/Login.css';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const [loginDetail, setLoginDetail] = useState({email: '', password:''});
    const [errMsg, setErrorMsg ] = useState('');
    const [successMsg, setSuccessMsg ] = useState('');
    const navigate = useNavigate();
    
    const handleLoginFormSubmission = async (e)=>{
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');
          try{
            const res = await fetch('http://localhost:4000/auth/login',{
              headers: { 'Content-Type': 'application/json'},
              method: 'POST',
              body: JSON.stringify(loginDetail)
            })
            const msg = await res.json();
            if(!res.ok){
              setErrorMsg(msg.message);
            }else{
              setSuccessMsg('You are now logged in');
              setTimeout(()=>{
                  console.log('navigate to root');
              },1300)
            }
          }catch(err){
            setErrorMsg('Failed to Login.Try again');             
          }

      }
        
    const handlePasswordInput = (e)=>{
      setLoginDetail({...loginDetail, password: e.target.value});
    }
    const handleEmailInput = (e)=>{
      setLoginDetail({...loginDetail, email: e.target.value});
    }

  return (
    <div className='Login'>
      <form onSubmit={handleLoginFormSubmission}>
        <h1> Login</h1>
        <label htmlFor='userEmail'>Email</label>
        <input type='text' name='userEmail' placeholder='xyz@myemail.com' onChange={handleEmailInput}></input>
        <label htmlFor='password1'>password</label>
        <input type='password' name='password' placeholder='********' onChange={handlePasswordInput}></input>
        { errMsg? <p style={{color: 'red'}}> {errMsg}  </p> : null}
       
        <button className='submitButton' onClick={handleLoginFormSubmission}>Login</button>
        { successMsg? <p style={{color: 'green', fontSize:'xx-large'}}> {successMsg}  </p> : null}
        <p> Don't have an account?<Link to='/signUp'>Sign Up </Link> </p>

      </form>
    </div>
  )
}

export default Login
