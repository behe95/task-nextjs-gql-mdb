import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
    input StudentInput{
        name: String
    }

    type Student{
        name: String
    }

    type Query{
        getStudents: [Student]
    }

    type Mutation{
        updateStudent(studentInput: StudentInput): Student
    }
`
