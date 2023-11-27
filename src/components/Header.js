import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        // User is signed out
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute z-30 w-full bg-gradient-to-b from-black flex flex-col md:flex-row justify-between">
      <img
        className="w-48 h-24 px-4 py-2 mx-auto md:mx-0"
        src={LOGO}
        alt="Logo"
      />
      {user && (
        <div className="flex justify-between md:justify-normal">
          <button
            className="px-4 py-2 mx-2 my-auto rounded-lg m-2 bg-teal-700 text-white"
            onClick={handleGptSearchClick}
          >
            {gptSearch ? "Homepage" : "Gpt Search"}
          </button>
          <img
            className="w-12 h-12 mx-2 my-auto"
            src={user?.photoURL}
            alt="user"
          />
          <button
            className="bg-red-700 rounded-lg p-2 mx-2 my-auto w-28 h-12 text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          {gptSearch && (
            <select
              className="p-2 bg-gray-700 text-white my-auto rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
