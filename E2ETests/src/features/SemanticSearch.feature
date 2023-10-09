Feature: Semantic search for movies recommendation

    @basic-semantic-search
    Scenario Outline: Basic Semantic Search
        Given I have movies class available in weaviate instance
        When I perform a basic Semantic search <query>
        Then I should see a valid <movieName> , <genres> , <popularity> for <query>

        Examples:
            | query                                      | movieName           | genres            | popularity         |
            | "Find movies directed by Steven Spielberg" | Saving Private Ryan | Drama History War | 76.04186700000002 |

