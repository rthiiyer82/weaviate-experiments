export interface IMovies {
  Get: {
    Movies_recommendation: Array<{
      title?: string;
      genres?: string;
      keywords?: string;
      popularity?: number;
      runtime?: number;
      cast?: string;
      langauge?: string;
      tagline?: string;
      revenue?: number;
      director?: string;
    }>;
  };
}
