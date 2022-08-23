import React from "react";
import { Container, Navbar } from "reactstrap";
import "./NavMenu.css";

export const NavMenu = (props) => {
  const {userName} = props
  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <div className="col-8">
            <div className="smoke display-1">SND Store</div>
          </div>
          <div className="col-4">Client: {userName}</div>
        </Container>
      </Navbar>
    </header>
  );
}
