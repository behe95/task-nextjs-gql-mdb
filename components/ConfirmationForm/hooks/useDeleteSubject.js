import React from 'react';
import {useMutation} from '@apollo/client';
import {DELETE_SUBJECT,GET_ALL_SUBJECTS} from '../../../apolloClient/queries/subjects';

export default function useDeleteSubject() {

    const [response, setResponse] = React.useState(null)

    const [_deleteSubject, {loading}] = useMutation(DELETE_SUBJECT, {
        update: (cache, {data}) => {
            console.log(cache);
            const storedSubjects = cache.readQuery({
                query: GET_ALL_SUBJECTS
            })
            
            console.log(storedSubjects);
            cache.writeQuery({
                query: GET_ALL_SUBJECTS,
                data: {
                    getAllSubjects: storedSubjects?.getAllSubjects.filter(s => s.id != data?.deleteSubject.id)
                }
            })
        }
    });

    const deleteSubject = async (id) => {

        try {
            const {data} = await _deleteSubject({variables: {id}});
    
            setResponse(res => data);
            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return [deleteSubject, loading, response];
}
