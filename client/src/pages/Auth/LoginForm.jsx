import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../../components/input/AuthInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  // state variables to manage email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // get the updateUser function from UserContext to update user state
  const { updateUser } = useContext(UserContext);
  // get the navigate function from react-router-dom to handle navigation
  const navigate = useNavigate();

  // handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent the default form submission behavior

    // validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return; // exit the function if password is empty
    }

    // check if password is provided
    if (!password) {
      setError("Please enter the password");
      return; // exit the function if password is empty
    }

    setError(""); // clear any previous error messages

    // login API
    try {
      // send a POST request to the login endpoint with email and password
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      // destructure token and user from response data
      const { token, user } = response.data;

      if (token) {
        // if a token is received, store it in local storage
        localStorage.setItem("token", token);
        updateUser(user);
        // navigate to the dashboard page
        navigate("/dashboard");
      }
    } catch (error) {
      // handle errors from the API request
      if (error.response && error.response.data.message) {
        // set specific error message if available
        setError(error.response.data.message);
      } else {
        // set a generic error message if no specific message is available
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          {/* email input field */}
          <AuthInput
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          {/* password input field */}
          <AuthInput
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {/* display error message if any */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          {/* submit button */}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          {/* link to the signup page */}
          <p className="text-[13px] text-slate-800 mt-3">
            Don’t have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
