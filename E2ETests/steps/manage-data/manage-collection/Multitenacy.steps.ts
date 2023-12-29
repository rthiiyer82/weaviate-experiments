import { loadFeature, defineFeature, DefineStepFunction } from "jest-cucumber";
import {
  addClassToSchema,
  connectWeaviateInstanceLocalHost,
} from "@utils";
import { IgetSchemaOfClassResp } from "interface";
import { waitForAssertion } from "@utils";
import { IcreateClass, dataType } from "@interface";

const FEATURE_FILE = "E2ETests/features/manage-data/ManageCollections.feature";
const SCENARIO_TAG = "@multi-tenancy";

const feature = loadFeature(FEATURE_FILE, {
  tagFilter: SCENARIO_TAG,
});

defineFeature(feature, (test) => {
  const classWithProps: IcreateClass = {
    class: 'ArticleMultitenancy',
    vectorizer: "text2vec-contextionary",
    vectorIndexType: 'hnsw',
    moduleConfig: {
      "text2vec-contextionary": {
        vectorizeClassName: true
      },
    },
    vectorIndexConfig:{
      distance: "cosine",
    },
    multiTenancyConfig:{
        enabled: true
    },
    properties: [
      {
        name: 'title',
        dataType: [dataType.text],
        moduleConfig: {
          "text2vec-contextionary": {
            vectorizePropertyName: true,
            tokenization: 'lowercase',
            skip: true,
          }
        }
      },
      {
        name: 'body',
        dataType: [dataType.text],
        moduleConfig: {
          "text2vec-contextionary": {
            vectorizePropertyName: true,
            tokenization: 'whitespace',
            skip: true
          },
        },
      },
    ],
  };

  beforeEach(async () => {
    const client = await connectWeaviateInstanceLocalHost();
    await client.schema.classDeleter().withClassName(classWithProps.class).do();
  });


  const givenInstanceCreated = (given: DefineStepFunction): void => {
    given("I have a weaviate client connection", async () => {
      const body = await connectWeaviateInstanceLocalHost();
      expect(body).toBeDefined();
    });
  };

  test("enable multi-tenancy in a class", ({ given, when, then }) => {
    givenInstanceCreated(given);

    when(/^I enable multi-tenancy settings for the collection$/, async () => {
      addClassToSchema(classWithProps);
    });

    then(
      /^the collection is created successfully$/,
      async () => {
        await waitForAssertion(async () => {
          const client = await connectWeaviateInstanceLocalHost();
          const response: IgetSchemaOfClassResp = await client.schema.classGetter().withClassName(classWithProps.class).do();
          expect(response.class).toBe(classWithProps.class);
          expect(response.multiTenancyConfig.enabled).toBe(true);
        });
      });
  });
});
