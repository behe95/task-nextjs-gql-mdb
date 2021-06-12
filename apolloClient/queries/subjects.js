import {gql} from '@apollo/client';

export const GET_ALL_SUBJECTS = gql`
    query GetAllSubjects{
        getAllSubjects {
          id
          title
      }
    }
`

export const CREATE_SUBJECT = gql`
  mutation CreateSubject($title: String) {
    createSubject(title: $title) {
      id
      title
    }
  }
`;

export const EDIT_SUBJECT = gql `
  mutation UpdateSubject($id:ID, $title: String){
    updateSubject(id: $id, title: $title){
      id
      title
    }
  }
`

export const DELETE_SUBJECT = gql`
  mutation DeleteSubject($id: ID) {
    deleteSubject(id: $id){
      id
      msg {
        success
        message
      }
    }
  }
`