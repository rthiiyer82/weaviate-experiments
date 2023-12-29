import { IcreateClass } from "interface/createCollection";
import keys from "../../env.json";
import weaviate, { WeaviateClient, generateUuid5 } from "weaviate-ts-client";
const hostUrl = keys.node1.hostUrl;
const openAPIKey = keys.node1["X-OpenAI-Api-Key"]
// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer "+`${keys.apiKey}`);
// myHeaders.append("Content-Type" , "application/json");


export async function sendGraphqlQuery(query: string): Promise<any> {
    const res = await fetch("http://" + `${hostUrl}` + "/v1/graphql", {
        method: 'post',
        body: JSON.stringify({ query: query }),
        //  headers: myHeaders
    }).then(response => response.json()).then(data => {
        return data;
    }).catch((e) => { console.log("error", e) });
    return res;
}

export async function connectWeaviateInstanceLocalHost(): Promise<any> {
    const client: WeaviateClient = weaviate.client({
        scheme: 'http',
        host: keys.node1.hostUrl,  // Replace with your endpoint
        headers: { 'X-OpenAI-Api-Key': openAPIKey },  // Replace with your inference API key
    });
    return client;
}

export async function addClassToSchema(classObj: IcreateClass): Promise<any> {
    const client: WeaviateClient = await connectWeaviateInstanceLocalHost();
    // Add class to Schema
    await client.schema.classCreator().withClass(classObj).do();
}

export async function addObjectsToSchema(className: string, title: string, genres: string, keyword: string, cast: string): Promise<any> {
    const client: WeaviateClient = await connectWeaviateInstanceLocalHost();
    const result = await client.data.creator().withClassName(className).withProperties({
        title: title,
        genres: genres, keyword: keyword, cast: cast
    }).do();
    // console.log(JSON.stringify(result, null, 2));
}

export async function addTenantsToCollection(className: string, tenantObject: Object[]): Promise<any> {
    const client: WeaviateClient = await connectWeaviateInstanceLocalHost();
    await client.schema.tenantsCreator(className, tenantObject).do();
    const tenants = await client.schema.tenantsGetter(className).do();
    //  console.log(JSON.stringify(tenants, null, 2));
}

export async function addObjectsToMultitenantSchema(className: string, title: string, genres: string, keyword: string, cast: string, tenantName: string): Promise<any> {
    const client: WeaviateClient = await connectWeaviateInstanceLocalHost();
    await client.data.creator().withClassName(className).withProperties({
        title: title,
        genres: genres, keyword: keyword, cast: cast
    }).withTenant(tenantName).do();
    // console.log(JSON.stringify(result, null, 2));
}

export async function addObjectsWithVector(className: string, title: string): Promise<any> {
    const client: WeaviateClient = await connectWeaviateInstanceLocalHost();
    await client.data.creator().withClassName(className).withProperties({
        title: title
    }).withVector(Array(1536).fill(0.12345)).do();
    // console.log(JSON.stringify(result, null, 2));
}

export async function addObjectsWithID(className: string, title: string): Promise<any> {
    const client: WeaviateClient = await connectWeaviateInstanceLocalHost();
    await client.data.creator().withClassName(className).withProperties({
        title: title
    }).withId('12345678-e64f-5d94-90db-c8cfa3fc1234').do();
    // console.log(JSON.stringify(result, null, 2));
}

export async function addObjectsWithDeterministicID(className: string, title: string): Promise<any> {
    const client: WeaviateClient = await connectWeaviateInstanceLocalHost();
    await client.data.creator().withClassName(className).withProperties({
        title: title
    }).withId(generateUuid5(JSON.stringify(title))).do();
    // console.log(JSON.stringify(result, null, 2));
}


