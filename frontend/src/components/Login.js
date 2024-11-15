import React, { useContext, useState } from 'react';
import '../styles/Login.css';
import {Link, useNavigate} from 'react-router-dom';
import { MovieContext } from '../context/moviesContext';

const Login = () => {
    const [loginDetail, setLoginDetail] = useState({email: '', password:''});
    const [errMsg, setErrorMsg ] = useState('');
    const [successMsg, setSuccessMsg ] = useState('');
    const {accessToken,setAccessToken}= useContext(MovieContext);
    const navigate = useNavigate();

    const handleLoginFormSubmission = async (e,guestLogin)=>{
        e.preventDefault();
        if(!guestLogin && (loginDetail.email.length <=2 || loginDetail.password.length <=5)){
          setErrorMsg('Enter valid credentails');
        }else{
          setErrorMsg('');
          setSuccessMsg('');
            try{
              const res = await fetch('http://localhost:4000/auth/login',{
                headers: { 'Content-Type': 'application/json'},
                method: 'POST',
                body: guestLogin?JSON.stringify({email:'guest@email.com',password:'Guest@123'}):JSON.stringify(loginDetail),
                credentials: 'include'
              })
              const msg = await res.json();
              setAccessToken(msg.Access_Token);
              if(!res.ok){
                setErrorMsg(msg.message);
              }else{
                setSuccessMsg('You are now logged in');
                setTimeout(()=>{
                    navigate('/profile');
                },1000)
              }
            }catch(err){
              setErrorMsg('Failed to Login.Try again');             
            }
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
      <form>
        <h1> Login</h1>
        <label htmlFor='userEmail'>Email</label>
        <input type='text' name='userEmail' placeholder='xyz@myemail.com' onChange={handleEmailInput}></input>
        <label htmlFor='password1'>password</label>
        <input type='password' name='password' placeholder='********' onChange={handlePasswordInput}></input>
        { errMsg? <p style={{color: 'red'}}> {errMsg}  </p> : null}
       
        <button className='submitButton' onClick={(e)=>handleLoginFormSubmission(e,false)}>Login</button>
        <button className='submitButton' onClick={(e)=>handleLoginFormSubmission(e,true)}>Login As Guest</button>

        { successMsg? <p style={{color: 'green', fontSize:'xx-large'}}> {successMsg}  </p> : null}
        <p> Don't have an account?<Link to='/signUp'>Sign Up </Link> </p>

      </form>
    </div>
  )
}

export default Login
