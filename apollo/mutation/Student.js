import Student from '../../models/Student';

module.exports = {
    async createStudent(parent, {studentInput}, context, req){
        console.log('Create student mutation =============== ', studentInput);
        try {
            const newStudent = new Student({
                ...studentInput
            })

            await newStudent.save();

            const studentInfo = await Student.findOne({_id: newStudent._id}).populate('subjects');

            return studentInfo;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async updateStudent(parent, {id:_id, studentInput}, context, req){

        console.log("=============================",_id,studentInput);

        const {subjects, ...rest} = studentInput;
        
        const updatedStudent = await Student.findOneAndUpdate(
            {_id},
            {
                $set:{
                    ...rest
                },
                $addToSet: {
                    subjects: studentInput?.subjects
                }
            },
            {new: true}
        ).populate('subjects').exec();

        return updatedStudent
    },

    async deleteStudent(parent, {id:_id}, context, req){
        try {
            await Student.findOneAndDelete({_id});
            return {
                id: _id,
                msg: {
                    message: "Student deleted successfully",
                    success: true
                }
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async deleteSubjectsFromStudent(parent, {studentId:_id, subjects}, context, req){
        try {
            const updatedStudent = await Student.findOneAndUpdate(
                {_id},
                {"$pull":{"subjects":{$in:[...subjects]}}}
            )

            return updatedStudent;

            
        } catch (error) {
            throw new Error(error.message);
        }

        return {}
    }
}