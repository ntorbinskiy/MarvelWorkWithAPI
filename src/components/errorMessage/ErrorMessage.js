import React from "react";
import img from "./error.gif";
const ErrorMessage = () => {
  return (
    <>
      <img src={img} alt="Error" style={{
       width: "260px",
       height: "260px",
       display:"block",
       margin: "0 auto" 
      }} />
    </>
  );
};

export default ErrorMessage;
