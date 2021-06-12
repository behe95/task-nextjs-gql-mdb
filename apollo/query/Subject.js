import Subject from '../../models/Subject';


module.exports = {
    async getAllSubjects(parent, args, context, req){

        console.log("________________________________");

        try {
            const subjects = await Subject.find();
            return subjects;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}