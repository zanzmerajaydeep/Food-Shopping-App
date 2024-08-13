import React from "react";
import { FaExclamationCircle } from 'react-icons/fa';

export const ErrorElement = () => {

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '58vh',
    backgroundColor: '#f8f8f8',
  };

  const contentStyle = {
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '3rem',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  };

  const paragraphStyle = {
    fontSize: '1.5rem',
    color: '#777',
    marginBottom: '1rem',
  };
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headingStyle}>
          <FaExclamationCircle /> Oops!
        </h1>
        <p style={paragraphStyle}>
          We're sorry, but the page you are looking for cannot be found.
        </p>
        <p style={paragraphStyle}>
          Please make sure you have entered the correct URL or try again later.
        </p>
       
      </div>
    </div>
  );
};
