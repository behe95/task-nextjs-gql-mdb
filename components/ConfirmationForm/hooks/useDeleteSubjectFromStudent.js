import React from 'react';
import {useMutation} from '@apollo/client';
import {DELETE_SUBJECT_FROM_STUDENT,GET_ALL_STUDENTS} from '../../../apolloClient/queries/students';

export default function useDeleteSubject() {

    const [response, setResponse] = React.useState(null)

    const [_deleteSubject, {loading}] = useMutation(DELETE_SUBJECT_FROM_STUDENT);

    const deleteSubject = async (selectedForDelete) => {

        const {id:studentId, selectedSubject: {id}} = selectedForDelete;


        try {
            const {data} = await _deleteSubject({variables: {studentId, subjects: [id]}});
    
            setResponse(res => data);
            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return [deleteSubject, loading, response];
}
