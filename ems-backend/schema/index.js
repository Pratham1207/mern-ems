const { buildSchema, GraphQLScalarType, Kind } = require("graphql");
const Employee = require("../models/Employee");

// Define the GraphQL schema using SDL syntax
const typeDefs = ` 
  scalar Date 

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    department: String!
    title: String!
    employeeType: String!
    dateOfJoining: Date!
  }

  input EmployeeInput {
    firstName: String!
    lastName: String!
    age: Int!
    department: String!
    title: String!
    employeeType: String!
    dateOfJoining: Date!
  }

  type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeInput!): Employee!
    deleteEmployee(id: ID!): Employee
  }
`;

// Define the custom Date scalar type
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "A date string in the format of YYYY-MM-DD",
  parseValue(value) {
    return new Date(value); // From client
  },
  serialize(value) {
    return value.getTime(); // To client
  },
  parseLiteral(ast) {
    return ast.kind === Kind.INT ? new Date(ast.value) : null; // From AST
  },
});

// Define the resolvers to handle GraphQL queries and mutations
const resolvers = {
  Date: dateScalar,
  employees: async () => {
    try {
      return await Employee.find(); // Fetch all employees from MongoDB
    } catch (err) {
      throw new Error("Failed to fetch employees");
    }
  },
  employee: async ({ id }) => {
    try {
      return await Employee.findById(id); // Fetch employee by ID from MongoDB
    } catch (err) {
      throw new Error("Employee not found");
    }
  },
  createEmployee: async ({ input }) => {
    try {
      const employee = new Employee(input); // Create a new employee
      await employee.save(); // Save to MongoDB
      return employee;
    } catch (err) {
      throw new Error("Failed to create employee");
    }
  },
  updateEmployee: async (_, { id, input }) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(id, input, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is done on update
      });

      if (!updatedEmployee) {
        throw new Error("Employee not found");
      }

      return updatedEmployee;
    } catch (err) {
      throw new Error("Failed to update employee");
    }
  },

  deleteEmployee: async ({ id }) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(id); // Delete employee by ID
      if (!deletedEmployee) {
        throw new Error("Employee not found");
      }
      return deletedEmployee; // Return deleted employee
    } catch (err) {
      throw new Error("Failed to delete employee");
    }
  },
};

// Build the schema using buildSchema from GraphQL
const schema = buildSchema(typeDefs);

module.exports = { schema, resolvers };
