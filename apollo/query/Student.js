module.exports = {
    async getStudents(parent, args, context, req){
        return (
            [
                {name: 'First Student'},
                {name: 'Second Student'},
            ]
        )
    }
}