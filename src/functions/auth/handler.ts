import { AuthVerifier } from "@libs/auth/auth";
import { middyfy } from "@libs/lambda";
import { createLogger } from "@libs/log/log";
import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";
import { decode } from "jsonwebtoken";

import { AUTH_CERTIFICATE } from "src/config/config";

const logger = createLogger("auth-handler");
const authorizer = new AuthVerifier(AUTH_CERTIFICATE);

export const authHandler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  logger.info("Authorizing a user", event.authorizationToken);
  try {
    const jwtToken = await authorizer.verifyToken(event.authorizationToken);
    logger.info("User was authorized", jwtToken);

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*",
          },
        ],
      },
    };
  } catch (e) {
    logger.error("User not authorized", { error: e.message });

    return {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: "*",
          },
        ],
      },
    };
  }
};

export function getUserId(event: any): string {
  const authorization = event?.headers?.Authorization
  if (!authorization) {
    throw Error("missing auth token")
  }
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}

 function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  return decodedJwt.sub
}

export const auth = middyfy(authHandler)