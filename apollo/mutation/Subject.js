import Subject from '../../models/Subject';
import {errorNames} from '../../constants/errors'


module.exports = {
    async createSubject(parent, args, context, req){
        const {title} = args;

        console.log(args);

        try {
            
            const subjectExist = await Subject.findOne({title});

            if(subjectExist) throw new Error(errorNames.SUBJECT_ALREADY_EXISTS);
            

            const newSubject = new Subject({title});
            
            newSubject.save();

            
            return newSubject;

        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }        
    },

    async updateSubject(parent, args, context, req){
        const {id:_id, title} = args;
        
        console.log("MUTATION UPDATE^^^^^=====================", args);

        try {
            const updatedSubject = await Subject.findOneAndUpdate({_id},{title},{new:true});

            console.log(updatedSubject);

            return updatedSubject;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async deleteSubject(parent, args, context, req){
        const {id:_id} = args;

        try {
            await Subject.findOneAndDelete({_id});

            return {
                id: _id,
                msg: {
                    message: "Subject deleted successfully",
                    success: true
                }
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}