import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  {
    categories {
      id
      name
    }
  }
`;