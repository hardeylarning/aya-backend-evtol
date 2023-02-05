import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required']
    },
    code: {
        type: String,
        required: [true, 'Weight is required']
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

const Medicine = mongoose.model("Medicine", evtolSchema);

export default Medicine;