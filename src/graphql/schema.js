const { gql } = require('apollo-server-express');
const Student = require('../models/Student');

const typeDefs = gql`
  type Attendance {
    subject: String
    date: String
    present: Boolean
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    faceId: String
    attendance: [Attendance]
  }

  type Query {
    students: [Student]
  }

  type Mutation {
    addStudent(name: String!, email: String!): Student
  }
`;

const resolvers = {
  Query: {
    students: async () => Student.find().limit(200),
  },
  Mutation: {
    addStudent: async (_, { name, email }) => {
      const s = new Student({ name, email });
      await s.save();
      return s;
    },
  },
};

module.exports = { typeDefs, resolvers };


