import React, {useState } from 'react';
import '../styles/SignUp.css';
import {Link, useNavigate} from 'react-router-dom';
import validator from 'validator';

const SignUp = () => {
    const [password1, setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const [signUpDetail, setSignUpDetail] = useState({username: '', email:'', password:''});
    const [errMsg, setErrorMsg ] = useState('');
    const [successMsg, setSuccessMsg ] = useState('');
    const navigate = useNavigate();
    
    const handleSignUpFormSubmission = async (e)=>{
        e.preventDefault();
        if(password1!==password2){
          setErrorMsg('Password Must be Same');
        }
        else if(signUpDetail.username.length <=5 || signUpDetail.password.length <=5){
          setErrorMsg('Username and/or Password too short')
        }else if(!validator.isEmail(signUpDetail.email)){
          setErrorMsg('Enter a valid Email');
        }
        else{
          setErrorMsg('');
          setSuccessMsg('');
          console.log('calling the api');
            try{
              const res = await fetch('http://localhost:4000/auth/signup',{
                headers: { 'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(signUpDetail)
              })
              console.log('response status :',res.ok);
              const msg = await res.json();

              if(!res.ok){
                setErrorMsg(msg.message);
              }else{
                setSuccessMsg('Account has been created');
                setTimeout(()=>{
                  navigate('/login');
                },1300)
              }
            }catch(err){
              console.log('error is invoked');
              setErrorMsg('Failed to create Account. Please try again later');             
            }
        }
      }
        
    const handlePasswordInput = (e)=>{
      if(e.target.name == 'password1'){
        setPassword1(e.target.value);
      }
      if(e.target.name == 'password2'){
        setPassword2(e.target.value);
        setSignUpDetail({...signUpDetail,password:e.target.value})
      }
    }
    const handleUserNameInput =(e)=>{
      setSignUpDetail({...signUpDetail, username: e.target.value});
    }
    const handleEmailInput = (e)=>{
      setSignUpDetail({...signUpDetail, email: e.target.value});
    }

  return (
    <div className='signUp'>
      <form onSubmit={handleSignUpFormSubmission}>
        <h1> SignUp</h1>
        <label htmlFor='Username'>Username</label>
        <input type='text' name='Username' placeholder='Enter username' onChange={handleUserNameInput}></input>
        <label htmlFor='userEmail'>Email</label>
        <input type='text' name='userEmail' placeholder='xyz@myemail.com' onChange={handleEmailInput}></input>
        <label htmlFor='password1'>password</label>
        <input type='password' name='password1' placeholder='********' onChange={handlePasswordInput}></input>
        <label htmlFor='password2'>Confirm Password</label>
        <input type='password' name='password2' placeholder='********' onChange={handlePasswordInput}></input>
        { errMsg? <p style={{color: 'red'}}> {errMsg}  </p> : null}
       
        <button aria-label='signUpSubmitButton' className='submitButton' onClick={handleSignUpFormSubmission}>SignUp</button>
        { successMsg? <p style={{color: 'green', fontSize:'xx-large'}}> {successMsg}  </p> : null}
        <p> Already have an account?<Link to='/Login'>login </Link> </p>

      </form>
    </div>
  )
}

export default SignUp
