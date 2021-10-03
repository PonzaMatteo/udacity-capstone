import { getUserId } from "@functions/auth/handler";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { GardenService } from "@libs/garden/garden";
import { middyfy } from "@libs/lambda";
import { createLogger } from "@libs/log/log";

import schema from "./schema";

const logger = createLogger("plants-handler");

const service = new GardenService();

const plantsHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema.plants> =
  async (event) => {
    const userId = getUserId(event);
    logger.info(`received new get plants event for user ${userId}`, event);
    const plants = await service.getPlants(userId);
    return formatJSONResponse({
      items: plants,
    });
  };

const createPlantHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof schema.createPlantRequest
> = async (event) => {
  const userId = getUserId(event);
  logger.info(`received new create plant event for user ${userId}`, event);
  const req: CreatePlantRequest = event.body;
  const plant = await service.createPlant(userId, req);
  return formatJSONResponse({ item: plant });
};

export const getAllPlants = middyfy(plantsHandler);
export const createPlant = middyfy(createPlantHandler);
