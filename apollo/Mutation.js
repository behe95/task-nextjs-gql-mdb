import {createStudent,updateStudent,deleteStudent,deleteSubjectsFromStudent} from './mutation/Student';
import {createSubject,updateSubject,deleteSubject} from './mutation/Subject';

module.exports = {
    Mutation: {
        createStudent,
        updateStudent,
        deleteStudent,
        deleteSubjectsFromStudent,

        createSubject,
        updateSubject,
        deleteSubject
    }
}