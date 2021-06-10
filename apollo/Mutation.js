import {updateStudent} from './mutation/Student';
import {createSubject,updateSubject,deleteSubject} from './mutation/Subject';

module.exports = {
    Mutation: {
        updateStudent,

        createSubject,
        updateSubject,
        deleteSubject
    }
}