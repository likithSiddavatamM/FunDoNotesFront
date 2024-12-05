import { useNavigate } from 'react-router-dom';
import './ForgotPassword.scss';
import { forgotPassword } from '../../utils/Api';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ForgotPassword() {
  let [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: "" });

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrors({ email: "" });
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const status = await forgotPassword(email);
    
    if (status == 200) {
        alert(`link sent to ${email}`)
        navigate('/')
    } else {
      setErrors({ email: "Email is not registered with us, please go with the registration" });
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-form-box">
        <h1 className="forgot-logo">FunDoNotes</h1>
        <p>Please enter your registered email</p>
        <form>
          <TextField 
            type="text" 
            sx={{ mb:3, borderColor: "red" }} 
            className="forgot-input-field" 
            placeholder="Email*" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
            }} 
            error={!!errors.email} 
            helperText={errors.email} 
            variant="outlined" 
            fullWidth 
          /><br/>
          <Button 
            variant="outlined" 
            type="submit" 
            sx={{ color: "#277365d4", border: "1px solid #277365d4" }} 
            className="forgot-submit-button" 
            onClick={handleForgotPassword}
          >
            Send link
          </Button>
        </form>
      </div>
    </div>
  );
}
