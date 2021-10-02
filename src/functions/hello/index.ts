import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const hello = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        request: {
          schemas: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
