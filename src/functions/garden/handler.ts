import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const plantsHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema.plants> =
  async (event) => {
    return formatJSONResponse({
      message: {
        items: [
          {
            userId: "user",
            plantId: "plant123",
            name: "birch",
            photos: ["https://via.placeholder.com/350x150"],
          },
        ],
      },
      event,
    });
  };

const createPlantHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema.createPlantRequest
> = async (event) => {
  return formatJSONResponse({
    message: {
      item: {
        userId: "user",
        plantId: "plant123",
        name: "birch",
        photos: ["https://via.placeholder.com/350x150"],
      },
      event,
    },
  });
};

export const getAllPlants = middyfy(plantsHandler);
export const createPlant = middyfy(createPlantHandler);
