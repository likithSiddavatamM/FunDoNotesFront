import { useNavigate } from 'react-router-dom';
import './ResetPassword.scss';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../utils/Api';

export default function ResetPassword() {
  let [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ password: "" });
  const navigate = useNavigate();

  const {token} = useParams()

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({ password: "" });
    const newErrors = {};
    
    if (!password.trim())
      newErrors.password = "password is required.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const response = await resetPassword(password, token);
    
    if (response.data.code == 200) {
        alert(response.data.data)
        navigate('/')
    } else
      setErrors({ password: "Something went wrong. Please try again." });
  };

  return (
    <div className="reset-container">
      <div className="reset-form-box">
        <h1 className="reset-logo">FunDoNotes</h1>
        <p>Please enter your password</p>
        <form>
          <TextField 
            type="text" 
            sx={{ mb:3, borderColor: "red" }} 
            className="reset-input-field" 
            placeholder="password*" 
            value={password} 
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
            }} 
            error={!!errors.password} 
            helperText={errors.password} 
            variant="outlined" 
            fullWidth 
          /><br/>
          <Button 
            variant="outlined" 
            type="submit" 
            sx={{ color: "#277365d4", border: "1px solid #277365d4" }} 
            className="reset-submit-button" 
            onClick={handleResetPassword}
          >
            Change password
          </Button>
        </form>
      </div>
    </div>
  );
}