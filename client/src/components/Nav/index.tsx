import * as React from "react";
import { Nav, NavItem } from "reactstrap";
import { GoogleLogin } from "react-google-login";

import { connect } from "../../utils";
import { login } from "../../store/slices/canonical/auth";

import "./styles.css";

const {
  GOOGLE_CLIENT_ID = "959206730822-j30lnpejcaab8ckvdhnakpr09fu1e2gq.apps.googleusercontent.com",
} = process.env;

const actionCreators = {
  login,
};

@connect(null, actionCreators)
class Navigation extends React.Component<Navigation.Props, null> {
  render() {
    const { login } = this.props;

    return (
      <Nav>
        <NavItem>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={(res: any) => login({ token: res.accessToken })}
            onFailure={(err) => console.log(err)}
            cookiePolicy={"single_host_origin"}
          />
        </NavItem>
      </Nav>
    );
  }
}

export namespace Navigation {
  export interface Props {
    login?: typeof login;
  }
}

export default Navigation;
