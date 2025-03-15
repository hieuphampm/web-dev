import { gql } from '@apollo/client';

// Thêm mới vào file này hoặc cập nhật nếu đã có
export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id)
  }
`;

export const CREATE_SERVICE = gql`
  mutation CreateService(
    $name: String!
    $price: Float!
    $description: String!
    $timeRange: String
    $perPerson: Boolean
  ) {
    createService(
      name: $name
      price: $price
      description: $description
      timeRange: $timeRange
      perPerson: $perPerson
    ) {
      id
      name
      price
      description
    }
  }
`;
