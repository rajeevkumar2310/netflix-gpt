import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PHOTO_URL, BACKGROUND_IMG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
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
            photoURL: PHOTO_URL,
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
            })
            .catch((error) => {
              // An error occurred
              setErrorMsg(error.message);
            });
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
          const user = userCredential.user;
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
          className="h-screen md:w-screen object-cover"
          src={BACKGROUND_IMG_URL}
          alt="background"
        />
      </div>
      <div className="p-36">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="absolute w-5/6 md:w-4/12 p-8 grid bg-black bg-opacity-80 rounded-md mx-auto right-0 left-0 text-white"
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
