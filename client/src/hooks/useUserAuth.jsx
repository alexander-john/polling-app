import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../context/UserContext";

const useUserAuth = () => {
  // destructure user, updateUser, and clearUser from UserContext
  const { user, updateUser, clearUser } = useContext(UserContext);
  // get the navigate function from react-router-dom to handle navigation
  const navigate = useNavigate();

  useEffect(() => {
    // if user is already available, do nothing
    if (user) return;

    // flag to track if the component is still mounted
    let isMounted = true;

    // function to fetch user information from the API
    const fetchUserInfo = async () => {
      try {
        // send a GET request to the user info endpoint
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        // if the component is still mounted and response data is available, update the user state
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        // log the error to the console
        console.error("Failed to fetch user info:", error);
        // if the component is still mounted, clear the user state and navigate to the login page
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    // call the fetchUserInfo function to fetch user information
    fetchUserInfo();

    // cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser]);  // dependencies for the useEffect hook
};

export default useUserAuth;
