import React, { useRef, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleBtnClick = () => {
    const msg = checkValidData(email.current.value, password.current.value);
    setErrorMsg(msg);

    if (msg) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              "https://occ-0-2040-3662.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMsg(error.message);
            });
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    }
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="absolute w-4/12 p-16 grid bg-black bg-opacity-80 rounded-md mx-auto right-0 left-0 text-white"
        >
          <div className="p-4">
            <p className="font-bold text-2xl mb-8">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </p>
            {!isSignInForm && (
              <input
                ref={name}
                className="p-2 my-2 rounded-lg w-full bg-gray-700"
                type="text"
                placeholder="Full Name"
              />
            )}
            <input
              ref={email}
              className="p-2 my-2 rounded-lg bg-gray-700 w-full"
              type="email"
              placeholder="Email address"
            />
            <input
              ref={password}
              className="p-2 my-2 rounded-lg w-full bg-gray-700"
              type="password"
              placeholder="Password"
            />
            <p className="text-red-600">{errorMsg}</p>
            <button
              className="p-2 my-6 w-full bg-red-700 rounded-lg font-bold"
              onClick={handleBtnClick}
            >
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
