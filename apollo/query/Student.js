import Student from '../../models/Student';


module.exports = {
    async getAllStudents(parent, args, context, req){

        try {
            const students = await Student.find().populate('subjects');

            return students;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getAllStudentsBySubject(parent, {subjectId}, context, req){
        try {
            const students = await Student.find({
                subjects: {"$in": [subjectId]}
            });

            return students;

        } catch (error) {
            throw new Error(error.message);
        }

    }
}