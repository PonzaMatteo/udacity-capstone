import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

export const garden = {
  getAllPlants: {
    handler: `${handlerPath(__dirname)}/handler.getAllPlants`,
    tracing: true,
    iamRoleStatementsInherit: true,
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:Query"],
        Resource: [
          "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.PLANTS_TABLE}/*/*",
          "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.PLANTS_TABLE}",
        ],
      },
    ],
    events: [
      {
        http: {
          method: "get",
          path: "plants",
          cors: true,
          authorizer: {
            name: "auth",
          },
        },
      },
    ],
  },
  createPlant: {
    handler: `${handlerPath(__dirname)}/handler.createPlant`,
    iamRoleStatementsInherit: true,
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:Query", "dynamodb:PutItem"],
        Resource: [
          "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.PLANTS_TABLE}/*/*",
          "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.PLANTS_TABLE}",
        ],
      },
    ],
    events: [
      {
        http: {
          method: "post",
          path: "plants",
          authorizer: {
            name: "auth",
          },
          cors: true,
          request: {
            schemas: {
              "application/json": schema.createPlantRequest,
            },
          },
        },
      },
    ],
  },
};
