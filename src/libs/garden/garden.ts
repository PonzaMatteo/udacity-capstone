import { nanoid } from "nanoid";
import { GardenRepository } from "./repository";

export class GardenService {
  repo = new GardenRepository();

  async getPlants(userId: string): Promise<Array<Plant>> {
    return await this.repo.findPlantsByUserId(userId);
  }

  async createPlant(
    userId: string,
    params: CreatePlantRequest
  ): Promise<Plant> {
    if (!params.name || params.name.length < 3) {
      throw new Error("`name` is required and must be longer than 3");
    }
    return await this.repo.createPlant({
      name: params.name,
      createdAt: new Date().toISOString(),
      plantId: nanoid(8),
      userId: userId,
      photos: [],
    });
  }
}
