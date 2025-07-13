import React, { useState, useEffect } from "react";

import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useUser } from "../../components/Context/UserContext";
import { query, collection, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { dataBase } from "../../config/firebaseConfig";
import "./Authentications.css";

function Authentications(props) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { user, setUser } = useUser();

  const auth = getAuth();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const changeHandler = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = async (e, data) => {
    try {
      // If 'e' is an event, extract form data
      const formData =
        e && e.target
          ? {
              email: e.target.elements.email.value,
              password: e.target.elements.password.value,
              confirmPassword: e.target.elements.confirmPassword
                ? e.target.elements.confirmPassword.value
                : null,
            }
          : data;

      console.log("formData:", formData);

      let qUser;

      if (!formData.email || !formData.password) {
        throw new Error("Email and password are required for sign-up.");
      }

      if (isLoginMode) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        setUser(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        setUser(userCredential.user);
      }

      if (user) {
        qUser = query(
          collection(dataBase, "resumes"),
          where("userid", "==", user.uid)
        );
      } else {
        qUser = collection(dataBase, "resumes");
      }

      const querySnapshot = await getDocs(qUser);

      console.log("Query:", qUser);
      console.log("Snapshot:", querySnapshot);

      const myResumeArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));

      console.log("My Resume Data:", myResumeArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        {isLoginMode ? (
          <Login
            name={props.name}
            submitHandler={(e, data) => submitHandler(e, data)}
            changeHandler={changeHandler}
            toggleText="Don't have an account? Sign Up"
            toggleOnClick={toggleMode}
          />
        ) : (
          <SignUp
            name={props.name}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            toggleOnClick={toggleMode}
          />
        )}
      </div>
    </div>
  );
}

export default Authentications;
