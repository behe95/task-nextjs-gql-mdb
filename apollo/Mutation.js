import {createStudent,updateStudent,deleteStudent,deleteSubjectsFromStudent,deleteMultipleStudent} from './mutation/Student';
import {createSubject,updateSubject,deleteSubject,deleteMultipleSubject} from './mutation/Subject';

module.exports = {
    Mutation: {
        createStudent,
        updateStudent,
        deleteStudent,
        deleteSubjectsFromStudent,
        deleteMultipleStudent,

        createSubject,
        updateSubject,
        deleteSubject,
        deleteMultipleSubject
    }
}