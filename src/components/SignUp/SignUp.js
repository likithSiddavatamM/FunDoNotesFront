import './SignUp.css'
import SignUpImg1 from '../../assets/SignUp.png'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className='simple'>
      <div className="signup-container">
        <div className="signup-form-box">
          <h1>FunDo</h1>
          <p>Create your Fundo Account</p>
          <form>
            <div className="signup-name-fields">
              <input type="text" className="signup-input-field" placeholder="First Name" />
              <input type="text" className="signup-input-field" placeholder="Last Name" />
            </div>
            <input type="text" className="signup-input-field" placeholder="Username" />
            <div className="signup-password-fields">
              <input type="password" className="signup-input-field" placeholder="Password" />
              <input type="password" className="signup-input-field" placeholder="Confirm Password" />
            </div>
            <p className="signup-password-instruction">Use 8 or more characters with a mix of letters, numbers & symbols</p>
            <Button variant="outlined" type="submit" className="signup-submit-button">Register</Button>
          </form>
          <a className="signup-sign-in-link" onClick={()=>navigate(`/`)}>Sign in instead</a>
        </div>
        <div className="signup-info-box">
          <img src={SignUpImg1} alt="User Icon" style={{ width: '250px', height: 'auto' }} />
          <p>One account. All of Fundo working for you.</p>
        </div>
      </div>
    </div>
  );
}