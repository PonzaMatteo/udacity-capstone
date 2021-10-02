import { handlerPath } from "@libs/handlerResolver";

export const auth = {
    handler: `${handlerPath(__dirname)}/handler.authHandler`,
  }