import Student from '../../models/Student';

module.exports = {
    async createStudent(parent, {studentInput}, context, req){
        try {

            const emailExists = await Student.findOne({email: studentInput.email});

            if(emailExists) throw new Error('Email is already in use!');
            

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
                {"$pull":{"subjects":{$in:[...subjects]}}},
                {new: true}
            ).populate("subjects").exec()

            return updatedStudent;

            
        } catch (error) {
            throw new Error(error.message);
        }

    },

    async deleteMultipleStudent(parent, args, context, req){
        const {id:idList} = args;


        try {
            
            await Student.remove({
                _id: {$in: [...idList]}
            });
    
            return {
                id: idList,
                msg: {
                    message: "Selected subjects deleted successfully",
                    success: true
                }
            }
        } catch (error) {
            throw new Error(error.message)
        }

    }
}