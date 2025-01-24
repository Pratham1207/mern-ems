import { gql } from "@apollo/client";

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      age
      department
      title
      employeeType
      dateOfJoining
    }
  }
`;

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    employees {
      id
      firstName
      lastName
      age
      department
      title
      employeeType
      dateOfJoining
    }
  }
`;

// CREATE_EMPLOYEE Mutation
export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      id
      firstName
      lastName
      age
      department
      title
      employeeType
      dateOfJoining
    }
  }
`;

// UPDATE_EMPLOYEE Mutation
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $age: Int!
    $department: String!
    $title: String!
    $employeeType: String!
    $dateOfJoining: String!
  ) {
    updateEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      age: $age
      department: $department
      title: $title
      employeeType: $employeeType
      dateOfJoining: $dateOfJoining
    ) {
      id
      firstName
      lastName
      age
      department
      title
      employeeType
      dateOfJoining
    }
  }
`;

// Mutation: Delete Employee
export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      firstName
      lastName
      age
      department
      title
      employeeType
      dateOfJoining
    }
  }
`;
