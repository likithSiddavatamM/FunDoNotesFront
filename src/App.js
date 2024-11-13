import logo from './logo.svg';
import SignUpImg1 from './SignUp.png'
import './App.css';
import './FunDoNotesSignUp.css'
import './FunDoNotesSignIn.css'
import Button from '@mui/material/Button';

function App() {
  return <Button variant="outlined">Outlined</Button>
}

export default App;

export function SignUp() {
  return (
    <div className="signup-container">
      <div className="signup-form-box">
        <h1>Fundo</h1>
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
          <button type="submit" className="signup-submit-button">Register</button>
        </form>
        <a href="./FunDoNotesSignIn.html" className="signup-sign-in-link">Sign in instead</a>
      </div>
      <div className="signup-info-box">
        <img src={SignUpImg1} alt="User Icon" style={{ width: '250px', height: 'auto' }} />
        <p>One account. All of Fundo working for you.</p>
      </div>
    </div>
  );
}


export function Signin(){
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
            <a href="#">Forgot password</a>
            <a href="#">Create account</a>
          </div>

          <button type="submit" className="signin-submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}

