import React from "react";
import { useLocation } from "react-router-dom";
import { NavMenu } from "./NavMenu";

export const Response = () => {
  const location = useLocation();
  const { title, desc, userName } = location.state;
  return (
    <div>
      <NavMenu amount={userName} />
      <div className="container text-center">
        <div className="row">
          <h1>{title}</h1>

          <h2>
            {userName}
            {desc}
          </h2>
        </div>
      </div>
    </div>
  );
};
