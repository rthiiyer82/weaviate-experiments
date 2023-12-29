import weaviate, { WeaviateClient, ApiKey } from "weaviate-ts-client";
import data from "../movies.json";


const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: "2svtvmayspesiy70ha1wzg.c0.europe-west3.dev.gcp.weaviate.cloud",
  // host: envVar.hostUrl,
  apiKey: new ApiKey("Yrvg3MAQrlZ9zqSQNvhAsVKFqFMA4UpOJZvF"),
  // headers: {
  //   "X-OpenAI-Api-Key": "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",
  // },
});

// host: "my-first-sandbox-cluster-od5caixl.weaviate.network",
// apiKey: new ApiKey("5XV31j8irYbCSHorQn5zhUPItBL0F0ajmjUK"),

async function connection() {
  const response = await client.schema.getter().do();
  // console.log(JSON.stringify(response, null, 2));
}

connection();

// form the schema
const classObj = {
  class: "Movies_recommendation",
  vectorizer:"text2vec-contextionary",
  moduleConfig:{
    text2veccontextionary: {
      vectorizeClassName: false,
    }
  },
  // vectorIndexConfig:{
  //   distance: "dot",
  //   pq:{
  //     enabled: true,
  //     trainingLimit: 1
  //   }
  // },
  description: "Various Info about movies",
  properties: [
    {
      name: "title",
      dataType: ["string"],
      description: "The name of the movie",
    },
    {
      name: "genres",
      dataType: ["string"],
      description: "The genres of the movie",
    },
    {
      name: "keywords",
      dataType: ["string"],
      description: "main keywords of the movie",
    },
    {
      name: "popularity",
      dataType: ["string"],
      description: "popularity of the movie",
    },
    {
      name: "runtime",
      dataType: ["string"],
      description: "runtime of the movie",
    },
    {
      name: "cast",
      dataType: ["string"],
      description: "The cast of the movie",
    },
    {
      name: "language",
      dataType: ["string"],
      description: "language in which movie was made",
    },
    {
      name: "tagline",
      dataType: ["string"],
      description: "tagline of the movie",
    },
    {
      name: "revenue",
      dataType: ["string"],
      description: "revenue of the movie",
    },
    {
      name: "director",
      dataType: ["string"],
      description: "Director of the movie",
    },
  ],
};

async function addSchema() {
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(JSON.stringify(res, null, 2));
}

async function readAndAddFile(): Promise<void> {
  var batcher = client.batch.objectsBatcher();
  const batchSize = 100;
  let counter = 0;
 
  for (const movieProperties of data as any) {
    console.log(movieProperties.original_title);
    const obj = {
      class: "Movies_recommendation",
      properties: {
        title: `${movieProperties.original_title ?? ""}`,
        genres: `${movieProperties.genres ?? ""}`,
        keywords: `${movieProperties.keywords ?? ""}`,
        popularity: `${movieProperties.popularity ?? ""}`,
        runtime: `${movieProperties.runtime ?? ""}`,
        cast: `${movieProperties.cast?? ""}`,
        // language: movieProperties.spoken_languages.forEach((childarray: any)=>{childarray.name, childarray.iso_639_1}),
        tagline: `${movieProperties.tagline?? ""}`,
        revenue: `${movieProperties.revenue ?? ""}`,
        director: `${movieProperties.director ?? ""}`,
      },
    };
    batcher = batcher.withObject(obj);
    if (counter++ == batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      // console.log(res);

      // restart the batch queue
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }
  const res = await batcher.do();
  console.log(JSON.stringify(res));
  // console.log(res);
}


async function run() {
  // await addSchema();
  await readAndAddFile();
}

run();
