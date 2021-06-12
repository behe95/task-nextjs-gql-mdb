import Subject from '../../models/Subject';
import {errorNames} from '../../constants/errors'
import Student from '../../models/Student';


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

            await Student.updateMany(
                {"subjects":{$in:[_id]}},
                {"$pull":{"subjects":{$in:[_id]}}
            })

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
    },

    async deleteMultipleSubject(parent, args, context, req) {
        const {id:idList} = args;


        try {
            await Student.updateMany(
                {"subjects":{$in:[...idList]}},
                {"$pull":{
                    "subjects": {$in: [...idList]}
                }}
            )
            
            await Subject.remove({
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