import { loadFeature, defineFeature, DefineStepFunction } from "jest-cucumber";
import {
  addClassToSchema,
  addObjectsToMultitenantSchema,
  addObjectsToSchema,
  addTenantsToCollection,
  connectWeaviateInstanceLocalHost,
} from "@utils";
import { waitForAssertion } from "@utils";
import { IcreateClass, dataType } from "@interface";

const FEATURE_FILE = "E2ETests/features/manage-data/CreateObject.feature";
const SCENARIO_TAG = "@create-object-multitenant";

const feature = loadFeature(FEATURE_FILE, {
  tagFilter: SCENARIO_TAG,
});

defineFeature(feature, (test) => {
  const classWithProps: IcreateClass = {
    class: 'MoviesRecommendationMultitenant',
    vectorizer: "text2vec-contextionary",
    vectorIndexType: 'hnsw',
    moduleConfig: {
      "text2vec-contextionary": {
        vectorizeClassName: false
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
        name: "title",
        dataType: [dataType.text],
        description: "The name of the movie",
      },
      {
        name: "genres",
        dataType: [dataType.text],
        description: "The genres of the movie",
      },
      {
        name: "keywords",
        dataType: [dataType.text],
        description: "main keywords of the movie",
      },
      {
        name: "popularity",
        dataType: [dataType.text],
        description: "popularity of the movie",
      },
      {
        name: "runtime",
        dataType: [dataType.text],
        description: "runtime of the movie",
      },
      {
        name: "cast",
        dataType: [dataType.text],
        description: "The cast of the movie",
      },
      {
        name: "language",
        dataType: [dataType.text],
        description: "language in which movie was made",
      },
      {
        name: "tagline",
        dataType: [dataType.text],
        description: "tagline of the movie",
      },
      {
        name: "revenue",
        dataType: [dataType.text],
        description: "revenue of the movie",
      },
      {
        name: "director",
        dataType: [dataType.text],
        description: "Director of the movie",
      },
    ],
  };

  const objectPropValue = {
    title: "Avatar",
    genres: "Action Adventure Fantasy Science Fiction",
    keyword: "culture clash future space war space colony society",
    popularity: "150.437577",
    runtime: "162.0",
    cast: "Sam Worthington Zoe Saldana Sigourney Weaver Stephen Lang Michelle Rodriguez",
    language:"english",
    revenue: "5875768686",
    director: "James Cameron"
  }

  const tenantObject= [
    {name: "tenantA"}, {name: "tenantB"}];

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

  const andCollectionCreated = (and: DefineStepFunction): void => {
    and("I have a multitenant collection", async () => {
      await addClassToSchema(classWithProps);
      await addTenantsToCollection(classWithProps.class,tenantObject);
    });
  };

  test("Create an Object in a multi-tenant class", ({ given, when, then , and}) => {
    givenInstanceCreated(given);
    andCollectionCreated(and);

    when(/^I add objects to a multi-tenant collection$/, async () => {
      await addObjectsToMultitenantSchema(classWithProps.class, objectPropValue.title, objectPropValue.genres,
        objectPropValue.keyword, objectPropValue.cast, "tenantA");
    });

    then(
      /^the object is added successfully$/,
      async () => {
        await waitForAssertion(async () => {
          const client = await connectWeaviateInstanceLocalHost();
          const response = await client.graphql.get().withClassName(classWithProps.class).withTenant('tenantA').withFields('title genres language director revenue cast').do();
          const result: typeof objectPropValue = response.data.Get[classWithProps.class];
          expect (result.cast).toBeDefined;
          expect (result.genres).toBeDefined;
          expect (result.keyword).toBeDefined;
          expect (result.title).toBeDefined;
          });
      });
  }); 

});

