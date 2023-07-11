import React from "react";
import { useHistory } from "react-router-dom";
import './styles/Welcome.css';

const Welcome = (props) => {
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };

  return (
    <div className="welcome-container">
        <h1>Welcome to the Job Board</h1>
        <p>Find your dream job today!</p>
    </div>
  );
};

export const ErrorPage = (props) => {
  return (
    <div>
      <h2>
        Error 404
      </h2>
    </div>
  );
};

export default Welcome;
