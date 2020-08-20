import * as React from "react";
import { ApolloProvider } from "react-apollo";

import apolloClient from "./createApolloClient";
import Products from "./components/Products";
import Nav from "./components/Nav";

class App extends React.Component<any, any> {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Nav />
        <Products />
      </ApolloProvider>
    );
  }
}

export default App;
