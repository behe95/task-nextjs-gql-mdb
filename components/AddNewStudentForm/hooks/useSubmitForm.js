import React from 'react';
import {useMutation} from '@apollo/client';
import {CREATE_STUDENT,GET_ALL_STUDENTS} from '../../../apolloClient/queries/students';

export default function useSubmitForm() {

    const [response, setResponse] = React.useState(null)

    const [_createStudent, {loading}] = useMutation(CREATE_STUDENT, {
        update: (cache, {data}) => {
            console.log(cache);
            const storedStudents = cache.readQuery({
                query: GET_ALL_STUDENTS
            })
            
            console.log(storedStudents);
            cache.writeQuery({
                query: GET_ALL_STUDENTS,
                data: {
                    getAllStudents: [...storedStudents.getAllStudents,data.createStudent]
                }
            })
        }
    });

    const createStudent = async (values) => {
        console.log(values);
        for (let key in values) {
            if (key !== 'subjects' && Object.hasOwnProperty.call(values, key)) {
                if(!values[key]) throw new Error(`${key[0].toUpperCase() + key.slice(1)} cannot be blanked!`)                
            }
        }

        try {
            const {data} = await _createStudent({variables: {studentInput:{...values}}});
    
            setResponse(res => data);
            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return [createStudent, loading, response];
}
