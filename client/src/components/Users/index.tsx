import * as React from "react";
import { Query } from "react-apollo";
import { gql } from "@apollo/client";

import "./styles.css";

const GET_USERS = gql`
  {
    query
    GetUsers {
      user {
        email
      }
    }
  }
`;

//@ts-ignore
const withUsers = (Component) => (props) => {
  return (
    //@ts-ignore
    <Query query={GET_USERS}>
      {/* //@ts-ignore */}
      {({ loading, data }) => {
        return (
          <Component
            usersLoading={loading}
            users={data && data.users}
            {...props}
          />
        );
      }}
    </Query>
  );
};

class UsersList extends React.Component {
  showUsers() {
    //@ts-ignore
    const { users, usersLoading } = this.props;

    //@ts-ignore
    if (!usersLoading && users && users.length > 0) {
      //@ts-ignore
      return users.map(({ email }) => {
        return <div>{email}</div>;
      });
    } else {
      return (
        <div>
          <h3>No users available</h3>
        </div>
      );
    }
  }

  render() {
    return <div>{this.showUsers()}</div>;
  }
}

export default withUsers(UsersList);
