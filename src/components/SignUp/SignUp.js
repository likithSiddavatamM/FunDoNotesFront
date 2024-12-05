import "./SignUp.scss";
import SignUpImg1 from "../../assets/3532323.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/Api";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { firstName, lastName, email, password } = formData;
    const status = await registerUser(firstName, lastName, email, password);
    if (status === 201) {
      alert("Registered successfully");
      navigate("/");
    } else {
      setErrors({ general: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="signup-fullscreen">
      <div className="signup-container">
        <div className="signup-form-box">
          <h1 style={{ fontSize: "1.9em" }}>FunDoNotes</h1>
          <p style={{textAlign:"center"}}>Create your Fundo Account</p>
          <form>
            <div className="signup-name-fields">
              <TextField
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
            </div>
            <TextField
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />
            <div className="signup-password-fields">
              <TextField
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
            </div>
            {errors.general && (
              <p style={{ fontFamily: "sans-serif", color: "red" }}>
                {errors.general}
              </p>
            )}
            <p className="signup-password-instruction">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </p>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                variant="outlined"
                type="submit"
                sx={{ color: "#277365d4", border: "1px solid #277365d4" }}
                className="signup-submit-button"
                onClick={handleRegisterUser}
              >
                Register
              </Button>
              <a
                className="signup-sign-in-link"
                style={{ cursor: "pointer", fontSize: "100%" }}
                onClick={() => navigate(`/`)}
              >
                Sign in instead
              </a>
            </div>
          </form>
        </div>
        <div className="signup-info-box">
          <img
            src={SignUpImg1}
            alt="User Icon"
            style={{ width: "85%", height: "50%", opacity: "70%" }}
          />
          <p>One account. All of Fundo working for you.</p>
        </div>
      </div>
    </div>
  );
}
