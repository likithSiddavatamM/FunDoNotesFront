import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { loginApiCall } from '../../utils/Api';

export default function Signin(){
  const navigate = useNavigate()
  const handleLogin = ()=>{
    loginApiCall()
  }
  return (
    <div className="signin-container">
      <div className="signin-form-box">
        <h1 className="signin-logo">Fundo</h1>
        <h2>Sign in</h2>
        <p>Use your Fundo Account</p>
        <form>
          <input type="text" className="signin-input-field" placeholder="Email or phone*" required />
          <input type="password" className="signin-input-field" placeholder="Password*" required />
          <div className="signin-links">
            <a>Forgot password</a>
            <a onClick={()=>navigate(`/signup`)}>Create account</a>
          </div>
          <button className="signin-submit-button" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}
  
  