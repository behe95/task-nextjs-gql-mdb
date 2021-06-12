import React from 'react';
import {useMutation} from '@apollo/client';
import {DELETE_MULTIPLE_STUDENTS,GET_ALL_STUDENTS} from '../../../apolloClient/queries/students';

export default function useDeleteStudent() {

    const [response, setResponse] = React.useState(null)

    const [_deleteMultipleStudent, {loading}] = useMutation(DELETE_MULTIPLE_STUDENTS, {
        update: (cache, {data}) => {
            const storedStudents = cache.readQuery({
                query: GET_ALL_STUDENTS
            })

            console.log(data?.deleteMultipleStudent?.id);
            const updatedStudents = storedStudents?.getAllStudents.filter(subject => !data?.deleteMultipleStudent?.id.includes(subject.id));
            console.log(updatedStudents);

            
            cache.writeQuery({
                query: GET_ALL_STUDENTS,
                data: {
                    getAllStudents: [...updatedStudents]
                }
            })
        }
    });

    const deleteMultipleStudent = async (id) => {

        try {
            const {data} = await _deleteMultipleStudent({variables: {id}});
    
            setResponse(res => data);
            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return [deleteMultipleStudent, loading, response];
}
