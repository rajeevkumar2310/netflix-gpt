import React, { useState } from "react";
import Header from "./Header";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/cf244808-d722-428f-80a9-052acdf158ec/IN-en-20231106-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background"
        />
      </div>
      <div className="p-36">
        <form className="absolute w-4/12 p-16 grid bg-black bg-opacity-80 rounded-md mx-auto right-0 left-0 text-white">
          <div className="p-4">
            <p className="font-bold text-2xl mb-8">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </p>
            {!isSignInForm && (
              <input
                className="p-2 my-2 rounded-lg w-full bg-gray-700"
                type="text"
                placeholder="Full Name"
              />
            )}
            <input
              className="p-2 my-2 rounded-lg bg-gray-700 w-full"
              type="email"
              placeholder="Email address"
            />
            <input
              className="p-2 my-2 rounded-lg w-full bg-gray-700"
              type="password"
              placeholder="Password"
            />
            <button className="p-2 my-6 w-full bg-red-700 rounded-lg font-bold">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className="text-gray-500">
              {isSignInForm ? "New to Netflix?" : "Already a user?"}
              <span
                className="text-white cursor-pointer"
                onClick={toggleSignInForm}
              >
                {isSignInForm ? "Sign up now" : "Sign in now"}
              </span>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
