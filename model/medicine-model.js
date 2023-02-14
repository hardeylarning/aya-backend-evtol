import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required']
    },
    code: {
        type: String,
        required: [true, 'Code is required']
    },
    imageUrl: {
        type: String
    }

},
{
    timestamps:true, 
    toJSON: {virtuals:true}
}
)

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;