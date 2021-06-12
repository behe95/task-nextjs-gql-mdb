import React from 'react';
import {useMutation} from '@apollo/client';
import {DELETE_STUDENT,GET_ALL_STUDENTS} from '../../../apolloClient/queries/students';

export default function useDeleteStudent() {

    const [response, setResponse] = React.useState(null)

    const [_deleteStudent, {loading}] = useMutation(DELETE_STUDENT, {
        update: (cache, {data}) => {
            console.log(cache);
            const storedStudents = cache.readQuery({
                query: GET_ALL_STUDENTS
            })
            
            console.log(storedStudents);
            cache.writeQuery({
                query: GET_ALL_STUDENTS,
                data: {
                    getAllStudents: storedStudents?.getAllStudents.filter(s => s.id != data?.deleteStudent.id)
                }
            })
        }
    });

    const deleteStudent = async (id) => {

        try {
            const {data} = await _deleteStudent({variables: {id}});
    
            setResponse(res => data);
            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return [deleteStudent, loading, response];
}
