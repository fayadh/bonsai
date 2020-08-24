import * as React from "react";

export default function UserInfo(props: any) {
  const {
    user: {
      email,
      // profile: { name },
    },
    key,
  } = props;
  return (
    <div key={key}>
      {/* <div>Name: {name}</div> */}
      <div>email: {email}</div>
    </div>
  );
}
