# Capstone Project for Udacity

## Garden Application

Simple API that allow the user to create and retrieve plants information. 

For testing the postman collection an be used to interact with the:
- create
- retrieve
APIs. 

I copied over from the previous project the client that can be used for getting the auth token (but not for interacting with the app, since the frontend is not deeded)

X-Ray tracing is enabled and working. 

## Evidences

Demo of the interaction with the APIs.
![demo](img/demo.gif)

X-Ray tracing enabled.
![x-ray](img/x-ray.png)

# Rubric

I focused of the following items of the rubric:

**(Option 2):Codebase**
- [x] The code is split into multiple layers separating business logic from I/O related code.
- [x] Code of Lambda functions is split into multiple files/classes. The business logic of an application is separated from code for database access, file storage, and code related to AWS Lambda.
- [x] Code is implemented using async/await and Promises without using callbacks.

**Option 2):Best practices**
- [x] All resources in the application are defined in the "serverless.yml" file
- [x] Each function has its own set of permissions.
- [x] Application has sufficient monitoring -> X-Ray and Logs
- [x] HTTP requests are validated: -> schema + custom validation

**(Option 2):Architecture**
- [x] Data is stored in a table with a composite key.
- [x] 1:M (1 to many) relationship between users and items is modeled using a DynamoDB table that has a composite key [...]
- [x] Items are fetched using the "query()" method and not "scan()" method (which is less efficient on large datasets)