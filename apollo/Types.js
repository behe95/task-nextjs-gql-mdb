import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
    input StudentInput{
        name: String
    }

    type Student{
        name: String
    }

    type Subject{
        id: ID
        title: String,
    }

    type msg{
        success: Boolean,
        message: String
    }
    

    type Query{
        getAllSubjects: [Subject]

        getStudents: [Student]
    }

    type Mutation{
        createSubject(title: String!): Subject
        updateSubject(id: ID, title: String): Subject
        deleteSubject(id: ID): msg

        updateStudent(studentInput: StudentInput): Student
    }
`
