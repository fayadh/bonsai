import * as passport from "passport";

import strategies from "./strategies";

strategies.map((strategy) => passport.use(strategy));

export default passport;
