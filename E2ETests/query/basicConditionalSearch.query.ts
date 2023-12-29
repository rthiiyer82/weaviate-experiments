export function basicSemanticSeach(searchString: string): string{
return `
{
  Get {
    Movies_recommendation(
      where: {operator: Equal, path: ["title"], valueString: ${searchString}}
      # hybrid: {query: "List all superman movies"}
    ) {
      title
      genres
      popularity
    }
  }
}
`
}