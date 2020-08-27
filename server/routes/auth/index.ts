import Google from "./google";

import * as express from "express";

const app = express();

app.use("/google", Google);

export default app;
