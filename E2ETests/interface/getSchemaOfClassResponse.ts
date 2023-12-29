export interface IgetSchemaOfClassResp {
    class: string;
    invertedIndexConfig: {
      bm25: {
        b: number;
        k1: number;
      }
      cleanupIntervalSeconds: number;
      stopwords: {
        additions: string;
        preset: string;
        removals: string;
      }
    },
    moduleConfig: {
      "text2-veccontextionary": {
        vectorizeClassName: boolean;
      }
    },
    multiTenancyConfig: {
      enabled: boolean;
    },
    properties: Array<
     {
        dataType: Array<string>;
        indexFilterable: boolean;
        indexSearchable: boolean;
        moduleConfig: {
          "text2vec-contextionary": {
            skip: boolean;
            vectorizePropertyName: boolean;
            tokenization: string;
          }
        };
        name: string;    
      }>;
    replicationConfig: {
      factor: number;
    },
    shardingConfig: {
      virtualPerPhysical: number;
      desiredCount: number;
      actualCount: number;
      desiredVirtualCount: number;
      actualVirtualCount: number;
      key: string;
      strategy: string;
      function: string;
    },
    vectorIndexConfig: {
      skip: boolean;
      cleanupIntervalSeconds: number;
      maxConnections: number;
      efConstruction: number;
      ef: number;
      dynamicEfMin: number;
      dynamicEfMax: number;
      dynamicEfFactor: number;
      vectorCacheMaxObjects: number;
      flatSearchCutoff: number;
      distance: string;
      pq: {
        enabled: boolean;
        bitCompression: boolean;
        segments: number;
        centroids: number;
        trainingLimit: number;
        encoder: {
          type: string;
          distribution: string;
        }
      }
    },
    vectorIndexType: string;
    vectorizer: string;
  }
  