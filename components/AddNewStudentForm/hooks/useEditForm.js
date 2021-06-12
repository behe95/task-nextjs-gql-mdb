import React from 'react';
import {useMutation} from '@apollo/client';
import {EDIT_STUDENT} from '../../../apolloClient/queries/students';

export default function useEditForm() {

    const [response, setResponse] = React.useState(null)

    const [_updateStudent, {loading}] = useMutation(EDIT_STUDENT);

    const updateStudent = async (selectedForEdit) => {
        const {id,name, ...rest} = selectedForEdit;

        for (let key in rest) {
            if (key !== 'subjects' && Object.hasOwnProperty.call(rest, key)) {
                if(!rest[key]) throw new Error(`${key[0].toUpperCase() + key.slice(1)} cannot be blanked!`)                
            }
        }

        try {
            const {data} = await _updateStudent({variables: {id,studentInput:{...rest}}});
    
            setResponse(res => data);
            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return [updateStudent, loading, response];
}
