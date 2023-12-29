# @single-node @smoke-test @BQFlatIndex
Scenario: Define vector index type of flat
Given I have a weaviate client connection
When I define a collection with vector index type of 'flat'
Then the collection is created successfully