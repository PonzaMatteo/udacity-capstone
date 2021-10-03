import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

export const garden = {
  getAllPlants: {
    handler: `${handlerPath(__dirname)}/handler.getAllPlants`,
    events: [
      {
        http: {
          method: "get",
          path: "plants",
          cors: true,
          authorizer: {
            name: "auth"
          },
        },
      },
    ],
  },
  createPlant: {
    handler: `${handlerPath(__dirname)}/handler.createPlant`,
    events: [
      {
        http: {
          method: "post",
          path: "plants",
          authorizer: {
            name: "auth"
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
