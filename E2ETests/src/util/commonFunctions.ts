import keys from "../../../env.json";

const hostUrl = keys.host;
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+`${keys.apiKey}`);
myHeaders.append("Content-Type" , "application/json");


export async function sendGraphqlQuery(query: string): Promise<any> {
    const res=  await fetch("https://"+ `${hostUrl}`+ "/v1/graphql",{
         method: 'post',
         body: JSON.stringify({query: query}),
         headers: myHeaders
     } ).then(response=> response.json()).then(data=>{
         return data;
     }).catch((e)=>{console.log("error", e)}); 
     return res;
 }

 export async function connectWeaviateInstance():Promise<any>{
    const res = await fetch("https://"+ `${hostUrl}`+ "/v1/schema",{
        headers: myHeaders
    } );
    return res.json();
 }

 