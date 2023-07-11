import React, { useContext, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";
import "./styles/login.css";

const Login = (props) => {
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <div className="body">
      <div>
        <h1 className="title">Login</h1>
      </div>
      <div>
        <EmailInput
          label="Email"
          value={loginDetails.email}
          onChange={(event) => handleInput("email", event.target.value)}
          inputErrorHandler={inputErrorHandler}
          handleInputError={handleInputError}
          className="inputBox"
        />
      </div>
      <div className="space"></div>
      <div>
        <PasswordInput
          label="Password"
          value={loginDetails.password}
          onChange={(event) => handleInput("password", event.target.value)}
          className="inputBox"
        />
      </div>
      <div>
        <button className="submitButton" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
