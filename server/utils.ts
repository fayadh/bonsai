import { sign } from "jsonwebtoken";

// NOTE: FOR EXAMPLE PURPOSES ONLY
const { TOKEN_SECRET = "mySecret" } = process.env;

export const signToken = (payload: any) => sign(payload, TOKEN_SECRET);