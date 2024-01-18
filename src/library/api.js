import axios from "axios";
import { END_POINT } from "./graphql";

export const fetchData = async (query, variables) => {
  const response = await axios.post(END_POINT, {
    query,
    variables,
  });
  return response;
};
