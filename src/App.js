import logo from './logo.svg';
import './App.css';
import './FunDoNotesSignUp.css'
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
        <a href="../FunDoNotesSignIn/FunDoNotesSignIn.html" className="signup-sign-in-link">Sign in instead</a>
      </div>
      <div className="signup-info-box">
        <img src="SignupImg.png" alt="User Icon" style={{ width: '250px', height: 'auto' }} />
        <p>One account. All of Fundo working for you.</p>
      </div>
    </div>
  );
}