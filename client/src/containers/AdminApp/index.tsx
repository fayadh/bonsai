import * as React from "react";

import Login from "../../components/AdminLogin";
import Users from "../../components/Users";
import { IS_LOGGED_IN } from "../../apollo/operations/queries";
import { useQuery } from "@apollo/client";

import "./styles.css";

const App: React.FC = () => {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);

  return (
    <div className="admin-app-root">{isLoggedIn ? <Users /> : <Login />}</div>
  );
};

export default App;
