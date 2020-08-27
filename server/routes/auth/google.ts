import * as express from "express";

import passport from "../../passport";

const app = express();

app.get(
  "/",
  (req, _, next) => {
    const { returnTo = "http://localhost:8080" } = req.query;
    req.session.returnTo = returnTo;
    next();
  },
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
    accessType: "offline",
  })
);

app.get("/success", (req, res) => {
  res.redirect(req.session.returnTo);
});

app.get("/failure", (_, res) => {
  console.log("failure callback :(");
  res.sendStatus(401);
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("access-token-service");
  res.cookie("isSignedIn", false);
  res.sendStatus(200);
});

app.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

export default app;
