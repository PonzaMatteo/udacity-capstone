import * as winston from "winston";

export const createLogger = (name: string) => {
 return  winston.createLogger({
    defaultMeta: {
      name: name,
    },
    format: winston.format.json(),
    transports: [
      new winston.transports.Console()
    ]
  });
};
