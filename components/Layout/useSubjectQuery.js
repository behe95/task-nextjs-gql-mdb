import React from 'react';
import apolloClient from '../../apolloClient';
import {GET_ALL_SUBJECTS} from '../../apolloClient/queries/subjects';

export default function useSubjectQuery() {

    const data = apolloClient.readQuery({
        query: GET_ALL_SUBJECTS
    });

    return data;
}
