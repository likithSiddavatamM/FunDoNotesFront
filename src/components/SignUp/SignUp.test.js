// import React , {act} from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import SignUp from "./SignUp";
// import { registerUser } from "../../utils/Api";

// jest.mock("../../utils/Api", () => ({
//   registerUser: jest.fn().mockResolvedValue(201), // Mock successful registration
// }));

// describe("SignUp Component", () => {
//   it("renders first name, last name, email, password fields with register button, and validates fields", async () => {
//     render(
//       <MemoryRouter>
//         <SignUp />
//       </MemoryRouter>
//     );
  
//     // Use findBy methods to ensure async rendering
//     const firstNameField = await screen.findByPlaceholderText(/first name/i);
//     const lastNameField = await screen.findByPlaceholderText(/last name/i);
//     const emailField = await screen.findByPlaceholderText(/email/i);
//     const passwordField = await screen.findByPlaceholderText("Password");
//     const confirmPasswordField = await screen.findByPlaceholderText("Confirm Password");
//     const registerButton = await screen.findByRole("button", { name: /register/i });
  
//     // Check if form elements are rendered
//     expect(firstNameField).toBeInTheDocument();
//     expect(lastNameField).toBeInTheDocument();
//     expect(emailField).toBeInTheDocument();
//     expect(passwordField).toBeInTheDocument();
//     expect(confirmPasswordField).toBeInTheDocument();
//     expect(registerButton).toBeInTheDocument();
  
//     // Simulate user input
//     fireEvent.change(firstNameField, { target: { value: "John" } });
//     fireEvent.change(lastNameField, { target: { value: "Doe" } });
//     fireEvent.change(emailField, { target: { value: "john.doe@example.com" } });
//     fireEvent.change(passwordField, { target: { value: "Password123" } });
//     fireEvent.change(confirmPasswordField, { target: { value: "Password123" } });
  
//     // Simulate button click
//     await act(async () => {
//       fireEvent.click(registerButton);
//     });
  
//     // Check if the registerUser function is called with correct parameters
//     expect(registerUser).toHaveBeenCalledWith("John", "Doe", "john.doe@example.com", "Password123");
  
//     // Check for successful registration (mock response is 201)
//     expect(screen.getByText("Registered successfully")).toBeInTheDocument();
//   });
  

//   // it("shows validation errors when fields are empty or passwords do not match", async () => {
//   //   render(
//   //     <MemoryRouter>
//   //       <SignUp />
//   //     </MemoryRouter>
//   //   );

//   //   const registerButton = await screen.findByRole("button", { name: /register/i });

//   //   // Simulate button click without filling out the form
//   //   fireEvent.click(registerButton);

//   //   // Check for error messages
//   //   expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
//   //   expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
//   //   expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
//   //   expect(await screen.findByText(/password is required/i)).toBeInTheDocument();

//   //   // Simulate user input with mismatched passwords
//   //   const passwordField = await screen.findByPlaceholderText(/password/i);
//   //   const confirmPasswordField = await screen.findByPlaceholderText(/confirm password/i);
//   //   fireEvent.change(passwordField, { target: { value: "Password123" } });
//   //   fireEvent.change(confirmPasswordField, { target: { value: "Password456" } });

//   //   // Simulate button click again
//   //   fireEvent.click(registerButton);

//   //   // Check for password mismatch error
//   //   expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
//   // });
// });


import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";

describe("SignUp Component", () => {
  it("renders the signup form with all fields and the register button", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    expect(screen.getByText(/sign in instead/i)).toBeInTheDocument();
  });
});


describe("SignUp Component", () => {
  it("displays error messages when required fields are empty", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const registerButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});