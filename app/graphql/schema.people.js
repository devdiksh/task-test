import { buildSchema } from 'graphql'

export const peopleSchema = buildSchema(`

type Person {
  id: ID!
  name: String!
  surname: String!
  age: Int
  gender: Gender
  birthday: Date
  phone: String
  email: String!
  contacts: [Person]
  created: Date
  modified: Date
}

enum Gender {
  male
  female
}

scalar Date

type Query {
  getPerson(id: ID!): Person
  getAllPeople(limit: Int, page: Int, sortBy: String, sortOrder: String): [Person]!
}

type Mutation {
  createPerson(
    name: String!,
    surname: String!,
    age: Int,
    gender: Gender,
    birthday: Date,
    phone: String,
    email: String!,
  ): Person!

  updatePerson(
    id: ID!,
    name: String,
    surname: String,
    age: Int,
    gender: Gender,
    birthday: Date,
    phone: String,
    email: String,
  ): Person!

  deletePerson(id: ID!): Person!
}`)
