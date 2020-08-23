import * as React from "react";
import { ApolloProvider } from "@apollo/client";

import { client } from "./apollo/client";

import Nav from "./components/Nav";
// import Products from "./components/Products";

class App extends React.Component<any, any> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Nav />
        {/* <Products /> */}
      </ApolloProvider>
    );
  }
}

export default App;
