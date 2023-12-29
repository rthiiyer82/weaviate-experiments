Feature: Create collection, specify vectorizer , property level settings , specify distance metric , generative module, replication settings, 
shard settings, multi-tenancy, read single collection, read all collections , update collection definition, update a parameter, delete a collection

@smoke-test @manage-collection
Scenario: create a collection , define properties and vectorizer properties
Given I have a weaviate client connection
When I provide collection name , properties , text2vec-contextionary vectorizer properties
Then the collection is created successfully

@smoke-test @manage-collection
Scenario: Configure each property to choose whether to vectorize property name, include property in vectorization, and choose tokenization type.
Given I have a weaviate client connection
When I configure each property to choose vectorizer and configure it
Then the collection is created successfully

@smoke-test @manage-collection
Scenario: specify distance metric settings
Given I have a weaviate client connection
When I specify vectorizer index settings for the collection
Then the collection is created successfully

# @single-node @smoke-test
# Scenario: specify genrative module
# Given I have a weaviate client connection
# When I specify generative module for the collection
# Then the collection is created successfully

# @multi-node @smoke-test
# Scenario: specify replication settings
# Given I have a weaviate client connection for multi-node setup
# When I specify replication settings for the collection
# Then the collection is created successfully

# @multi-node @smoke-test
# Scenario: specify sharding settings
# Given I have a weaviate client connection
# When I specify sharding settings for the collection
# Then the collection is created successfully

@single-node @smoke-test @perf @multi-tenancy
Scenario: enable multi-tenancy in a class
Given I have a weaviate client connection
When I enable multi-tenancy settings for the collection
Then the collection is created successfully

