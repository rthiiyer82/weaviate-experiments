Feature: Create an Object in a class, in a multi-tenant class , with vector, with ID, generate determinstic IDs

@create-object
Scenario: Create an Object in a class
Given I have a weaviate client connection
And I have a collection
When I add objects to the collection
Then the object is added successfully

@create-object-multitenant
Scenario: Create an Object in a multi-tenant class
Given I have a weaviate client connection
And I have a multitenant collection
When I add objects to a multi-tenant collection
Then the object is added successfully

@create-object
Scenario: Create an Object with vector
Given I have a weaviate client connection
And I have a collection
When I add objects with vector to a class
Then the object is added successfully

@create-object
Scenario: Create an Object with Id
Given I have a weaviate client connection
And I have a collection
When I add objects with ID to a class
Then the object is added successfully

# @create-object
# Scenario: Weaviate throws error when duplicate object IDs are added
# Given I have a collection
# When I add objects with duplicate ID to a class
# Then an error message is thrown

@create-object
Scenario: Create an object with determinstic ids
Given I have a weaviate client connection
And I have a collection
When I add objects with determistic ID to a class
Then the object is added successfully