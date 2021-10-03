import { createLogger } from "@libs/log/log";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as AWSXRay from "aws-xray-sdk";
import * as AWS from "aws-sdk";
import { PLANTS_CREATED_AT_INDEX, PLANTS_TABLE } from "src/config/config";

export class GardenRepository {
  client: DocumentClient;
  logger = createLogger("garden-repository");

  constructor() {
    const client: DocumentClient = new AWS.DynamoDB.DocumentClient({
      service: new AWS.DynamoDB(),
    });

    // ugly solution to this problem 🥲
    // https://github.com/aws/aws-sdk-js/issues/1846
    AWSXRay.captureAWSClient((client as any).service);

    this.client = client;
  }

  async findPlantsByUserId(userId: string): Promise<Array<Plant>> {
    this.logger.info(`finding plants by user id ${userId}`);
    const res = await this.client
      .query({
        TableName: PLANTS_TABLE,
        IndexName: PLANTS_CREATED_AT_INDEX,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      .promise();

    return res.Items as Array<Plant>;
  }

  async createPlant(p: Plant): Promise<Plant> {
    const res = await this.client
      .put({
        TableName: PLANTS_TABLE,
        Item: p,
      })
      .promise();

    this.logger.info(`creating plant: ${res}`);
    return p;
  }
}
