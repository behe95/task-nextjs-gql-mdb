import {gql} from '@apollo/client';

export const GET_ALL_STUDENTS = gql`
    query GetAllStudents{
        getAllStudents {
          id
          firstname
          lastname
          phone
          email
          subjects{
              id
              title
          }
          dob
      }
    }
`

export const CREATE_STUDENT = gql`
  mutation CreateStudent($studentInput: StudentInput) {
    createStudent(studentInput: $studentInput) {
      id
    }
  }
`;

export const EDIT_STUDENT = gql `
  mutation UpdateStudent($id:ID, $studentInput: StudentInput){
    updateStudent(id: $id, studentInput: $studentInput){
      id
      firstname
      lastname
      email
      phone
      dob
      subjects{
        id
        title
      }
    }
  }
`

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID) {
    deleteStudent(id: $id){
      id
      msg {
        success
        message
      }
    }
  }
`

export const DELETE_SUBJECT_FROM_STUDENT = gql`
  mutation DeleteSubjectFromStudent($studentId: ID, $subjects:[ID]){
      deleteSubjectFromStudent(studentId: $studentId, subjects: $subjects){
          id
          subjects{
              id
          }
      }
  }
`

export const GET_ALL_STUDENTS_BY_SUBJECT = gql`
  query GetAllStudentsBySubject($subjectId: ID){
    getAllStudentsBySubject(subjectId: $subjectId){
        id
    }
  }
`