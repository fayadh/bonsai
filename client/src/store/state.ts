import { RouterState } from "connected-react-router";

interface State {
  canonical: State.Canonical;
  router: RouterState;
}

namespace State {
  export interface Canonical {
    auth: Canonical.Auth;
  }

  export namespace Canonical {
    export namespace Auth {
      export type Token = string;

      export interface User {
        profile: User.Profile;
      }
      export namespace User {
        export interface Profile {
          name: Profile.name;
        }

        export namespace Profile {
          export type name = String;
        }
      }
    }

    export interface Auth {
      isLoggingIn: boolean;
      user: Auth.User;
      token: Auth.Token;
    }
  }
}

export default State;
