# Goal:

E2E Automated tests to verify the features of weaviate instance. The example used for testing is the movies-recommedation example.

## Usage

The framework uses JEST and JEST BDD to draft the scenarios and to automate them.

To install all the dependency

```
yarn install

```

To build the test , run 

```
yarn build

```

To run the tests locally:

```
yarn test

```
The framework uses the `env.json` file where weavaite cluster's host url, weaviate api Key, openai api keys are configured. e.g Add `env.json` to the repository and then add the following fields to the json file.

`
    {
      "host": "",
      "apiKey": "",
      "X-OpenAI-Api-Key": ""
    }
`

## Execution Report

The test execution report gets generated automatically and is stored by the name 'test-report.html'. The framework uses Jest-reporter.

## Improvements

- To add more test coverage on various weaviate features like conecting to weaviate instance , class/Schema , upload of data set and performing queries.
- Test coverage on uploading data set on multiple instances on a multi node setup.
