import mongoose,{Schema} from 'mongoose';

const StudentSchema = new Schema({
    firstname: String,
    lastname: String,
    phone: String,
    email: String,
    dob: Date,
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }]
},{timestamps: true});

export default mongoose.model('Student', StudentSchema);