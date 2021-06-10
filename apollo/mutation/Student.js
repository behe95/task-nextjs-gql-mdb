module.exports = {
    async updateStudent(parent, args, context, req){
        console.log('Update Student Mutation =========== ', args);
        return {
            name: "Student Name"
        }
    }
}