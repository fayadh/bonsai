import * as React from "react";
import { Nav, NavItem } from "reactstrap";
import { GoogleLogin } from "react-google-login";

import "./styles.css";

const {
  GOOGLE_CLIENT_ID = "959206730822-j30lnpejcaab8ckvdhnakpr09fu1e2gq.apps.googleusercontent.com",
} = process.env;

console.log({ GOOGLE_CLIENT_ID });

class Navigation extends React.Component {
  render() {
    return (
      <Nav>
        <NavItem>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={(res) => console.log(res)}
            onFailure={(err) => console.log(err)}
            cookiePolicy={"single_host_origin"}
          />
        </NavItem>
      </Nav>
    );
  }
}

export default Navigation;
