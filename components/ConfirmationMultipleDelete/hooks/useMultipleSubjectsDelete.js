import React from 'react';
import {useMutation} from '@apollo/client';
import {DELETE_MULTIPLE_SUBJECTS,GET_ALL_SUBJECTS} from '../../../apolloClient/queries/subjects';

export default function useDeleteSubject() {

    const [response, setResponse] = React.useState(null)

    const [_deleteMultipleSubject, {loading}] = useMutation(DELETE_MULTIPLE_SUBJECTS, {
        update: (cache, {data}) => {
            const storedSubjects = cache.readQuery({
                query: GET_ALL_SUBJECTS
            })

            console.log(data?.deleteMultipleSubject?.id);
            const updatedSubjects = storedSubjects?.getAllSubjects.filter(subject => !data?.deleteMultipleSubject?.id.includes(subject.id));
            console.log(updatedSubjects);

            
            cache.writeQuery({
                query: GET_ALL_SUBJECTS,
                data: {
                    getAllSubjects: [...updatedSubjects]
                }
            })
        }
    });

    const deleteMultipleSubject = async (id) => {

        try {
            const {data} = await _deleteMultipleSubject({variables: {id}});
    
            setResponse(res => data);
            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return [deleteMultipleSubject, loading, response];
}
