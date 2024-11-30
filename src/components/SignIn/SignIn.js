import { useNavigate } from 'react-router-dom';
import './SignIn.scss';
import { loginApiCall } from '../../utils/Api';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Signin(){
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = await loginApiCall(email, password);
    if (success) {
      navigate("/dashboard/notes");
    } else {
      setErrors({
        email: " ",
        password: "Email or password is incorrect.",
      });
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form-box">
        <h1 className="signin-logo">FunDoNotes</h1>
        <h2>Sign in</h2>
        <p>Use your Fundo Account</p>
        <form>
          <TextField  type="text" sx={{ mb: 3, borderColor:"red"}} className="signin-input-field" placeholder="Email*" value={email} onChange={(e)=>{setEmail(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, email: "" }));}} error={!!errors.email} helperText={errors.email} variant="outlined" fullWidth /> 
          <TextField  type="password" sx={{ mb: 3 }} className="signin-input-field" placeholder="Password*" value={password} onChange={(e)=>{setPassword(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, password: "" }));}} error={!!errors.password} helperText={errors.password} variant="outlined" fullWidth />
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
  
  