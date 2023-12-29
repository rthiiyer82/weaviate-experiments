import { loadFeature, defineFeature, DefineStepFunction } from "jest-cucumber";
import {
  addClassToSchema,
  connectWeaviateInstanceLocalHost,
  sendGraphqlQuery,
} from "@utils";
import { IgetSchemaOfClassResp } from "interface";
import { waitForAssertion } from "@utils";
import { IcreateClass, dataType } from "@interface";

const FEATURE_FILE = "E2ETests/features/manage-data/ManageCollections.feature";
const SCENARIO_TAG = "@manage-collection";

const feature = loadFeature(FEATURE_FILE, {
  tagFilter: SCENARIO_TAG,
});

defineFeature(feature, (test) => {
  const classWithProps: IcreateClass = {
    class: 'Article',
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

  test("create a collection , define properties and vectorizer properties", ({ given, when, then }) => {
    givenInstanceCreated(given);

    when(/^I provide collection name , properties , text2vec-contextionary vectorizer properties$/, async () => {
      addClassToSchema(classWithProps);
    });

    then(
      /^the collection is created successfully$/,
      async () => {
        await waitForAssertion(async () => {
          const client = await connectWeaviateInstanceLocalHost();
          const response: IgetSchemaOfClassResp = await client.schema.classGetter().withClassName(classWithProps.class).do();
          console.log(JSON.stringify(response));
          expect(response.class).toBe(classWithProps.class);
          expect(response.properties.length).toEqual(classWithProps.properties?.length);
          expect(response.multiTenancyConfig.enabled).toBe(false);
        });
      });
  });

  test("Configure each property to choose whether to vectorize property name, include property in vectorization, and choose tokenization type.", ({ given, when, then }) => {
    givenInstanceCreated(given);

    when(/^I configure each property to choose vectorizer and configure it$/, async () => {
      addClassToSchema(classWithProps);
    });

    then(
      /^the collection is created successfully$/,
      async () => {
        await waitForAssertion(async () => {
          const client = await connectWeaviateInstanceLocalHost();
          const response: IgetSchemaOfClassResp = await client.schema.classGetter().withClassName(classWithProps.class).do();
          console.log(JSON.stringify(response));
          expect(response.class).toBe(classWithProps.class);
          expect(response.properties.length).toEqual(classWithProps.properties?.length);
          response.properties.forEach(property=>{
            expect(property.moduleConfig["text2vec-contextionary"].vectorizePropertyName).toBeTruthy;
            expect(property.moduleConfig["text2vec-contextionary"].skip).toBeTruthy;
          })
        });
      });
  });

  test("specify distance metric settings", ({ given, when, then }) => {
    givenInstanceCreated(given);

    when(/^I specify vectorizer index settings for the collection$/, async () => {
      addClassToSchema(classWithProps);
    });

    then(
      /^the collection is created successfully$/,
      async () => {
        await waitForAssertion(async () => {
          const client = await connectWeaviateInstanceLocalHost();
          const response: IgetSchemaOfClassResp = await client.schema.classGetter().withClassName(classWithProps.class).do();
          expect(response.class).toBe(classWithProps.class);
          expect (response.vectorIndexConfig.distance).toBe("cosine");
        });
      });
  });

});
