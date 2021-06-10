import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
    input StudentInput{
        firstname: String
        lastname: String
        phone: String
        email: String
        dob: Float
        subjects: [ID]
    }

    type Student{
        id: ID
        firstname: String
        lastname: String
        phone: String
        email: String
        dob: Float
        subjects: [Subject]
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

        getAllStudents: [Student]
        getAllStudentsBySubject(subjectId: ID): [Student]
    }

    type Mutation{
        createSubject(title: String!): Subject
        updateSubject(id: ID, title: String): Subject
        deleteSubject(id: ID): msg

        createStudent(studentInput: StudentInput): Student
        updateStudent(id:ID,studentInput: StudentInput): Student
        deleteStudent(id: ID): msg
        deleteSubjectsFromStudent(studentId: ID, subjects:[ID]): Student
    }
`
