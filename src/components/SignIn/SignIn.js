import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { loginApiCall } from '../../utils/Api';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Signin(){
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  const navigate = useNavigate()
  const handleLogin = async(e)=>{
    e.preventDefault();
    if(await loginApiCall(email, password))
        navigate('/dashboard/notes')
    else
        navigate('/')
  }

  return (
    <div className="signin-container">
      <div className="signin-form-box">
        <h1 className="signin-logo">FunDoNotes</h1>
        <h2>Sign in</h2>
        <p>Use your Fundo Account</p>
        <form>
          <TextField  type="text" sx={{ mb: 3 }} className="signin-input-field" placeholder="Email*" value={email} onChange={(e)=>{setEmail(e.target.value)}} required variant="outlined" fullWidth />
          <TextField  type="password" sx={{ mb: 3 }} className="signin-input-field" placeholder="Password*" value={password} onChange={(e)=>{setPassword(e.target.value)}} required variant="outlined" fullWidth />
          <div className="signin-links">
            <a style={{cursor:"pointer"}}>Forgot password</a>
            <a style={{cursor:"pointer"}} onClick={()=>navigate(`/signup`)}>Create account</a>
          </div>
          <Button variant="outlined" type="submit" sx={{ color:"#277365d4", border: "1px solid #277365d4" }} className="signin-submit-button" onClick={handleLogin}>Login</Button>
        </form>
      </div>
    </div>
  );
}
  
  