import { ObjectsBatchDeleter } from "weaviate-ts-client";

export enum dataType{
    text= "text",
    object= "object",
    date= "date",
    blob = "blob",
    phoneNumber = "phoneNumber",
    uuid = "uuid",
    geoCoordinates = "geoCoordinates",
    number = "number"
}

export interface IcreateClass{
    class: string;
    properties?: Array<{
        name: string;
        description?:string;
        dataType: Array<dataType>; 
        indexFilterable?: boolean;
        indexSearchable?: boolean;
        moduleConfig?:Object;
    }>
    description?: string;
    vectorIndexType?: string;
    vectorIndexConfig?: {
       
    },
    vectorizer?: string;
    moduleConfig?: Object;
    invertedIndexConfig?:{
        stopwords?:{

      };
      indexTimestamps?: boolean;
      indexNullState?: boolean;
      indexPropertyLength?: boolean;
    };
    shardingConfig?:{

    };
    multiTenancyConfig?:{
        enabled: boolean;
    }
}

