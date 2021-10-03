import { createLogger } from "@libs/log/log";
import { nanoid } from 'nanoid'

export class GardenService {
  repo = new GardenRepository();

  getPlants(userId: string): Array<Plant> {
    return this.repo.findPlantsByUserId(userId);
  }

  createPlant(userId: string, params: CreatePlantRequest): Plant {
      if(!params.name || params.name.length < 3) {
          throw new Error("`name` is required and must be longer than 3")
      }
      return this.repo.createPlant({
        name: params.name,
        createdAt: new Date().toISOString(),
        plantId: nanoid(8),
        userId: userId,
        photos: []
      })
  }
}

class GardenRepository {
  logger = createLogger("garden-repository");

  findPlantsByUserId(userId: string): Array<Plant> {
    this.logger.info(`finding plants by user id ${userId}`);
    return [
      {
        userId: "google-oauth2|100194933125537411888",
        plantId: "plant123",
        name: "birch",
        photos: ["https://via.placeholder.com/350x150"],
        createdAt: new Date().toISOString(),
      },
    ];
  }
  createPlant(p: Plant): Plant {
    this.logger.info(`creating plant`, p);
    return p;
  }
}
