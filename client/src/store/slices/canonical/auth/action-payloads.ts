import State from "@/store/state";

export namespace Login {
  export namespace start {
    export interface payload {
      token: string;
    }

    export interface action {
      payload: payload;
    }
  }

  export namespace success {
    export interface payload {
      user: State.Canonical.Auth.User;
    }

    export interface action {
      payload: payload;
    }
  }

  export namespace failure {
    export interface payload {
      message: string;
    }

    export interface action {
      payload: payload;
    }
  }
}
