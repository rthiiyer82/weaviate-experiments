import { basicSemanticSeach } from "../query/basicSemanticSearch.query";
import { loadFeature, defineFeature, DefineStepFunction } from "jest-cucumber";
import {
  connectWeaviateInstance,
  sendGraphqlQuery,
} from "../util/commonFunctions";

const FEATURE_FILE = "E2ETests/src/features/SemanticSearch.feature";
const SCENARIO_TAG = "@basic-semantic-search";

const feature = loadFeature(FEATURE_FILE, {
  tagFilter: SCENARIO_TAG,
});

defineFeature(feature, (test) => {
  const givenInstanceCreated = (given: DefineStepFunction): void => {
    given("I have movies class available in weaviate instance", async () => {
      const body = await connectWeaviateInstance();
      expect(body).toBeDefined();
    });
  };

  test("Basic Semantic Search", ({ given, when, then }) => {
    givenInstanceCreated(given);

    when(/^I perform a basic Semantic search (.*)$/, async (query: string) => {
      const searchGraphQLQuery = basicSemanticSeach(query);
      const responseBody = await sendGraphqlQuery(searchGraphQLQuery);
      expect(responseBody).toBeDefined();
    });

    then(
      /^I should see a valid (.*) , (.*) , (.*) for (.*)$/,
      async (
        movieName: string,
        genres: string,
        popularity: string,
        query: string
      ) => {
        const responseBody = await sendGraphqlQuery(basicSemanticSeach(query));
        const movieNameActual =
          responseBody.data.Get.Movies_recommendation.find(
            (name) => name.title === movieName
          );
        expect(movieNameActual.title).toBe(movieName);
        expect(movieNameActual.genres).toBe(genres);
        expect(movieNameActual.popularity).toBe(popularity);
      }
    );
  });
});
