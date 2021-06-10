import mongoose,{Schema} from 'mongoose';

const SubjectSchema = new Schema({
    title: String
},{
    timestamps: true
});


export default mongoose.models.Subject || mongoose.model('Subject',SubjectSchema);