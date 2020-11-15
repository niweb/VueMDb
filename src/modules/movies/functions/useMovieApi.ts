import { useApi } from "@/shared/functions/useApi";
import { Movie } from "@/modules/movies/types";
import { computed } from "vue";

const BASE_URL = "api.themoviedb.org";
const API_VERSION = 3;
const API_KEY = process.env.VUE_APP_API_KEY;

type ResultSet<Data> = {
  page: number;
  results: Data[];
  total_pages: number;
  total_results: number;
};

export const useMovieApi = () => {
  const url = `https://${BASE_URL}/${API_VERSION}/movie/popular?api_key=${API_KEY}`;
  const { result } = useApi<ResultSet<Movie>>(url);
  const movies = computed(() => result.value?.results);

  return {
    movies
  };
};
