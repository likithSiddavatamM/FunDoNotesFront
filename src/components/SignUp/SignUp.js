import './SignUp.css'
import SignUpImg1 from '../../assets/Signup.png'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/Api';
import { useState } from 'react';
import TextField from '@mui/material/TextField';


export default function SignUp() {
  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate();
  async function handleRegisterUser(e){
    e.preventDefault();
    if(firstName && lastName && email && (password == confirmPassword)){
      let status = await registerUser(firstName, lastName, email, password);
      if(status==201){
        alert("Registered successfully")
        navigate('/')
      }
      else
        alert("Registeration failed, check the creaditionals")
    }
  }

  return (
    <div className='simple'>
      <div className="signup-container">
        <div className="signup-form-box">
          <h1 style={{fontSize:"1.9em"}} >FunDoNotes</h1>
          <p>Create your Fundo Account</p>
          <form>
            <div className="signup-name-fields">
            <TextField className="signup-input-field" sx={{ mb: 3 }} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" variant="outlined" fullWidth />
            <TextField className="signup-input-field" sx={{ mb: 3 }} value={lastName} onChange={(e)=>{setLastName(e.target.value)}}placeholder="Last Name" variant="outlined" fullWidth  />
            </div>
            <TextField className="signup-input-field" sx={{ mb: 3 }} value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" variant="outlined" fullWidth />
            <div className="signup-password-fields">
              <TextField type='password' className="signup-input-field" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" variant="outlined" fullWidth />
              <TextField type='password' className="signup-input-field" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="Confirm Password" variant="outlined" fullWidth />
            </div>
            <p className="signup-password-instruction">Use 8 or more characters with a mix of letters, numbers & symbols</p>
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <Button variant="outlined" type="submit" sx={{ color:"#277365d4", border: "1px solid #277365d4" }} className="signup-submit-button" onClick={handleRegisterUser}>Register</Button>
            <a className="signup-sign-in-link" style={{cursor:"pointer", fontSize:"100%"}} onClick={()=>navigate(`/`)}>Sign in instead</a>
            </div>
          </form>
        </div>
        <div className="signup-info-box">
          <img src={SignUpImg1} alt="User Icon" style={{ width: '85%', height: '50%' }} />
          <p>One account. All of Fundo working for you.</p>
        </div>
      </div>
    </div>
  );
}