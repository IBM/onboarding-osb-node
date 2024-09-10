# Open Service Broker reference application

## Overview

Every [service onboarding into the IBM Cloud Catalog](https://cloud.ibm.com/docs/sell?topic=sell-selling-clouds) is required to build a Broker application that follows the [Open Service Broker](https://github.com/openservicebrokerapi/servicebroker/blob/v2.12/spec.md) (OSB) specification.

This project provides:

- a NodeJs based OSB broker reference application that is capable of basic provisioning and deprovisioning of a service on IBM Cloud
- a Docker container image of the OSB broker app which one could deploy in a serverless environment

> Note that this broker is not production ready. It to be used as a starter or reference to help you build your production ready Broker.

## Running the code

### Prerequisites

To run Broker application in development you will need:

- Docker Desktop or an alternative (e.g. Rancher)
- [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)
- NodeJs, install using [nvm](https://github.com/nvm-sh/nvm) or a method of your choosing

### Development

1. Configure the environment variables using a `.env` file, template a template example is provided with the repo.
2. Start the application using the following commands:

```bash
yarn install
docker compose up
```

### Deployment

You can deploy this application using [Code Engine](https://cloud.ibm.com/docs/codeengine?topic=codeengine-application-workloads).

## Role of a OSB Broker

The general role of OSB is described in the [specification](https://github.com/openservicebrokerapi/servicebroker/blob/v2.12/spec.md#api-overview) and elaborated in an IBM Cloud specific context [here](https://cloud.ibm.com/docs/sell?topic=sell-broker-dev-host#broker-what-is).

### Resource Controller integration

On IBM Cloud, the platform subsystem responsible for managing the lifecycle of service instances is the Resource Controller (RC). Your Broker will accept requests from the Resource Controller at certain lifecycle events (i.e. provisioning, deprovisioning, etc.). To configure where the platform can reach your Broker using which credentials, you will use [Partner Center Sell](https://cloud.ibm.com/docs/sell?topic=sell-broker-onboard)

### Metering (optional)

Some implementers choose to submit the usage data of the service instances using the their Broker. To do this, the implementer must submit their metering data int the appropriate format to IBM Cloud's Metering API.

## Implementation details

### Authentication

Incoming requests from IBM Cloud's Resource Controller towards your Broker can use can use either `basic` or `bearer` authentication, depend on how you configured your Broker registration with IBM Cloud and your application.

#### Basic

The OSB spec requires that the Broker [supports authentication with the HTTP basic method](https://github.com/openservicebrokerapi/servicebroker/blob/v2.12/spec.md#authentication).

To configure this authentication method, head over to Partner Center Sell, find your broker and configure your broker according to these [instructions](https://cloud.ibm.com/docs/sell?topic=sell-broker-onboard) and pick `auth_scheme: basic`.

To configure this application to accept a basic authentication credential use the environment variables:

```bash
BROKER_BASIC_USERNAME=myUsername
BROKER_BASIC_PASSWORD=myPassword
```

#### Bearer

With this extension of the spec, the requests from IBM Cloud will use a JWT token. This JWT token will belong to an IAM ID (e.g. user or service Id) of your choosing.

To configure this authentication method, ead over to Partner Center Sell, find your broker and configure your broker according to these [instructions](https://cloud.ibm.com/docs/sell?topic=sell-broker-onboard) and pick and pick `auth_scheme: bearer` and in the password field provide an API key belonging to the ID of your choosing.

To configure the application to accept requests from a set of IBM Cloud IAM Ids, use the environment variables:

```bash
# BROKER_BEARER_IDENTITIES accepts a comma separated list of IAM IDs
BROKER_BEARER_IDENTITIES=iam-ServiceId-e2b83083-cfef-40ee-8185-1f1332afaa1f
```
