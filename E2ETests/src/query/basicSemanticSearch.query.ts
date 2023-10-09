export function basicSemanticSeach(searchString: string): string{
return `
{
    Get {
      Movies_recommendation (
        hybrid: {
          query: ${searchString}
          vector: [1]
          alpha: 0.5
        }
      ) {
        title
        genres
        popularity
      }
    }
  }
`
}