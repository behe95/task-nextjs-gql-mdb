import React from 'react';
import {useMutation} from '@apollo/client';
import {EDIT_SUBJECT} from '../../../apolloClient/queries/subjects';

export default function useEditForm() {

    const [response, setResponse] = React.useState(null)

    const [_updateSubject, {loading}] = useMutation(EDIT_SUBJECT);

    const updateSubject = async (id,title) => {

        try {
            if(!title) throw new Error('Title cannot be blanked!');
            const {data} = await _updateSubject({variables: {id,title}});
    
            setResponse(res => data);
            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return [updateSubject, loading, response];
}
