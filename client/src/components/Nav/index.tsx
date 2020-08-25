import * as React from "react";
import { Nav, NavItem } from "reactstrap";

import Auth from "./Auth";
import "./styles.css";

export function Navigation() {
  return (
    <Nav>
      <NavItem>
        <Auth />
      </NavItem>
    </Nav>
  );
}

export default Navigation;
