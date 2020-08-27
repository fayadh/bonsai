import * as React from "react";

export const LoginButton: React.FC = () => {
  return (
    <a
      href={`http://localhost:3000/auth/google?returnTo=${encodeURIComponent(
        "http://localhost:8080"
      )}`}
    >
      Login Google
    </a>
  );
};

export default LoginButton;
