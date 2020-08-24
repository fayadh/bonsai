import * as React from "react";

import AdminLogin from "../../components/AdminLogin";
import Users from "../../components/Users";

class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <AdminLogin />
        {/* <Users /> */}
      </div>
    );
  }
}

export default App;
