import * as React from "react";
import { ApolloProvider } from "react-apollo";

import apolloClient from "./createApolloClient";
import Products from "./components/Products";

class App extends React.Component<any, any> {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Products />
      </ApolloProvider>
    );
  }
}

export default App;
