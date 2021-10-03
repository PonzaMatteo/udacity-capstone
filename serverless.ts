import type { AWS } from "@serverless/typescript";

import { hello } from "@functions/hello";
import { auth } from "@functions/auth";
import { garden } from "@functions/garden";

const serverlessConfiguration: AWS = {
  app: "udacity-capstone",
  service: "udacity-capstone",
  configValidationMode: "error",
  frameworkVersion: "2",
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-plugin-tracing",
    "serverless-iam-roles-per-function",
    "serverless-esbuild",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "dev",
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PLANTS_TABLE: "Plants-${self:provider.stage}",
      PLANTS_CREATED_AT_INDEX: "CreatedAtIndex",
    },
    lambdaHashingVersion: "20201221",
    tracing: {
      apiGateway: true,
      lambda: true,
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["xray:PutTraceSegments", "xray:PutTelemetryRecords"],
        Resource: ["*"],
      },
    ],
  },

  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers":
              "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
            "gatewayresponse.header.Access-Control-Allow-Methods":
              "'GET,OPTIONS,POST'",
          },
          ResponseType: "DEFAULT_4XX",
          RestApiId: { Ref: "ApiGatewayRestApi" },
        },
      },
      TodosTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "userId",
              AttributeType: "S",
            },
            {
              AttributeName: "plantId",
              AttributeType: "S",
            },
            {
              AttributeName: "createdAt",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "userId",
              KeyType: "HASH",
            },
            {
              AttributeName: "plantId",
              KeyType: "RANGE",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
          TableName: "${self:provider.environment.PLANTS_TABLE}",
          LocalSecondaryIndexes: [
            {
              IndexName: "${self:provider.environment.PLANTS_CREATED_AT_INDEX}",
              KeySchema: [
                {
                  AttributeName: "userId",
                  KeyType: "HASH",
                },
                {
                  AttributeName: "createdAt",
                  KeyType: "RANGE",
                },
              ],
              Projection: {
                ProjectionType: "ALL",
              },
            },
          ],
        },
      },
    },
  },
  // import the function via paths
  functions: { auth, hello, ...garden },
};

module.exports = serverlessConfiguration;
