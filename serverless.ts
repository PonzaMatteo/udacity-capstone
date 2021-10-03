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
    "serverless-esbuild",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
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
  // import the function via paths
  functions: { auth, hello, ...garden },

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
    },
  },
};

module.exports = serverlessConfiguration;
