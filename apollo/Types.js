import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
    input StudentInput{
        firstname: String
        lastname: String
        phone: String
        email: String
        dob: String #Float
        subjects: [ID]
    }

    type Student{
        id: ID
        firstname: String
        lastname: String
        phone: String
        email: String
        dob: String #Float
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

    type deleteMsg {
        id: ID
        msg: msg
    }

    type deleteMultipleMsg {
        id: [ID]
        msg: msg
    }
    
    

    type Query{
        getAllSubjects: [Subject]

        getAllStudents: [Student]
        getAllStudentsBySubject(subjectId: ID): [Student]
    }

    type Mutation{
        createSubject(title: String): Subject
        updateSubject(id: ID, title: String): Subject
        deleteSubject(id: ID): deleteMsg
        deleteMultipleSubject(id: [ID]): deleteMultipleMsg

        createStudent(studentInput: StudentInput): Student
        updateStudent(id:ID,studentInput: StudentInput): Student
        deleteStudent(id: ID): deleteMsg
        deleteSubjectsFromStudent(studentId: ID, subjects:[ID]): Student
        deleteMultipleStudent(id: [ID]): deleteMultipleMsg
    }
`
