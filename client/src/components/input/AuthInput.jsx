import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const AuthInput = ({ value, onChange, label, placeholder, type }) => {
  // State to manage the visibility of the password
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the visibility of the password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {/* Label for the input field */}
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box">
        {/* Input field */}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* Toggle password visibility icon */}
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
