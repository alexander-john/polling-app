// Summary:
// This file defines the LoginForm component, which handles user login functionality.
// It includes state management for email, password, and error messages, form validation, 
// API requests for user authentication, and navigation to the dashboard upon successful login.

// Import necessary modules and components
import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../../components/input/AuthInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

// Define the LoginForm component
const LoginForm = () => {
    // State variables to manage email, password, and error messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    // Get the updateUser function from UserContext to update user state
    const { updateUser } = useContext(UserContext);

    // Get the navigate function from react-router-dom to handle navigation
    const navigate = useNavigate();

    // Handle login form submit
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate email format
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return; // Exit the function if email is invalid
        }

        // Check if password is provided
        if (!password) {
            setError("Please enter the password");
            return; // Exit the function if password is empty
        }

        setError(""); // Clear any previous error messages

        // Login API
        try {
            // Send a POST request to the login endpoint with email and password
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            
            // Destructure token and user from response data
            const { token, user } = response.data;

            if (token) {
                // If a token is received, store it in local storage
                localStorage.setItem("token", token);
                updateUser(user); // Update user state with the received user data
                navigate("/dashboard"); // Navigate to the dashboard page
            }
        } catch (error) {
            // Handle errors from the API request
            if (error.response && error.response.data.message) {
                // Set specific error message if available
                setError(error.response.data.message);
            } else {
                // Set a generic error message if no specific message is available
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">
                    Welcome Back
                </h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>

                <form onSubmit={handleLogin}>
                    {/* Email input field */}
                    <AuthInput
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@example.com"
                        type="text"
                    />

                    {/* Password input field */}
                    <AuthInput
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Min 8 Characters"
                        type="password"
                    />

                    {/* Display error message if any */}
                    {error && (
                        <p className="text-red-500 text-xs pb-2.5">{error}</p>
                    )}

                    {/* Submit button */}
                    <button type="submit" className="btn-primary">
                        LOGIN
                    </button>

                    {/* Link to the signup page */}
                    <p className="text-[13px] text-slate-800 mt-3">
                        Don’t have an account?{" "}
                        <Link
                            className="font-medium text-primary underline"
                            to="/signup"
                        >
                            SignUp
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default LoginForm;
