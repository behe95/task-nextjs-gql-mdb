import React from 'react';
import {useMutation} from '@apollo/client';
import {CREATE_SUBJECT,GET_ALL_SUBJECTS} from '../../../apolloClient/queries/subjects';

export default function useSubmitForm() {

    const [response, setResponse] = React.useState(null)

    const [_createSubject, {loading}] = useMutation(CREATE_SUBJECT, {
        update: (cache, {data}) => {
            console.log(cache);
            const storedSubjects = cache.readQuery({
                query: GET_ALL_SUBJECTS
            })
            
            console.log(storedSubjects);
            cache.writeQuery({
                query: GET_ALL_SUBJECTS,
                data: {
                    getAllSubjects: [...storedSubjects.getAllSubjects,data.createSubject]
                }
            })
        }
    });

    const createSubject = async (title) => {

        try {
            if(!title) throw new Error('Title cannot be blanked!');
            const {data} = await _createSubject({variables: {title}});
    
            setResponse(res => data);
            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return [createSubject, loading, response];
}
