## graphql-subworkers-exer
This is a proof of concept.
This is a simple express server to be used by [this project](https://github.com/cnamqui/graphql-worker-threads-exer) to act as separate worker threads from the main GraphQL application.

The idea is that this server will mimic a microservice architecture and each endpoint is suppsoed to be a different service. 

We can mimic this by deploying multiple instances via docker   configuring the graphQL project to treat each instance as a different rest API

## Dockerfile
The docker file has a PORT env variable that you can change to test this out locally.

or simply run, from different bash/cmd terminals:
```
    PORT=5000 npm run start:dev
    PORT=5001 npm run start:dev
    PORT=5002 npm run start:dev

```