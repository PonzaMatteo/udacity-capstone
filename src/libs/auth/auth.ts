import { createLogger } from "../log/log";
import { Algorithm, decode, verify } from "jsonwebtoken";
import "source-map-support/register";
import { Jwt } from "./models";

export class AuthVerifier {
  logger = createLogger("auth-verifier");
  cert: string;
  algo: Array<Algorithm>;

  constructor(cert: string, algo: Array<Algorithm> = ["RS256"]) {
    this.logger.info("initializing logger")
    this.cert = cert;
    this.algo = algo;
  }

  async verifyToken(authHeader: string) {
    this.logger.info("start to verify token");

    const token = this.getTokenFromAuthHeader(authHeader);
    const jwt: Jwt = decode(token, { complete: true }) as Jwt;
    verify(token, this.cert, { algorithms: this.algo });

    this.logger.info("token verified", token);
    return Promise.resolve(jwt.payload);
  }

  getTokenFromAuthHeader(authHeader: string): string {
    if (!authHeader) throw new Error("Missing authentication header");

    if (!authHeader.toLowerCase().startsWith("bearer "))
      throw new Error(
        "Invalid authentication header: it does not begin with `Bearer `"
      );

    const split = authHeader.split(" ");
    const token = split[1];

    return token;
  }
}
