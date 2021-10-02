import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const garden = {
  getAllPlants: {
    handler: `${handlerPath(__dirname)}/handler.getAllPlants`,
    events: [
      {
        http: {
          method: 'get',
          path: 'plants',
        }
      }
    ]
  },
  createPlant: {
    handler: `${handlerPath(__dirname)}/handler.createPlant`,
    events: [
      {
        http: {
          method: 'post',
          path: 'plants',
          schemas: {
            "application/json": schema.createPlantRequest
          }
        }
      }
    ]
  }
} 