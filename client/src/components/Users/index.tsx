import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import UserInfo from "./UserInfo";

export const GET_USERS = gql`
  query GetUsers {
    users {
      email
    }
  }
`;

export default function Users() {
  const { data, error, loading } = useQuery<any, any>(GET_USERS);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    console.log({ error });
    return <p>An error occurred</p>;
  }

  return (
    <div>
      {data &&
        data.users.length &&
        data.users.map((user: any) => <UserInfo key={user._id} user={user} />)}
    </div>
  );
}
