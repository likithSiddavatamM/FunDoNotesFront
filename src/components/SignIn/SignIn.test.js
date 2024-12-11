import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signin from "./Signin";

describe("Signin Component", () => {
  it("renders email and password fields with login button, and validates email", () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    const emailField = screen.getByPlaceholderText(/email\*/i);
    const passwordField = screen.getByPlaceholderText(/password\*/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
}); 