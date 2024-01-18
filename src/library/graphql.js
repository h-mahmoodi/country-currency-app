import { gql } from "graphql-request";

export const END_POINT = "https://datastory-cloud-v2.stellate.sh/";

export const GET_CURRENCY = gql`
  query GetCurrency($countryName: String!) {
    item(
      where: { class_id: { _eq: "Country" }, nameEn: { _eq: $countryName } }
    ) {
      nameEn
      currency: statements(where: { property_id: { _eq: "currency" } }) {
        object {
          nameEn
        }
      }
    }
  }
`;
