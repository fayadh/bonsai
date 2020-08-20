import { createSelector } from "reselect";

import canonicalSelector from "../";

export const authSelector = createSelector(
  canonicalSelector,
  ({ auth }) => auth
);

export const authTokenSelector = createSelector(
  authSelector,
  ({ token }) => token
);

export const userSelector = createSelector(authSelector, ({ user }) => user);

export const authProfileSelector = createSelector(
  userSelector,
  ({ profile }) => profile
);

export default authSelector;
