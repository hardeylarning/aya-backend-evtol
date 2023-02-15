import mongoose from "mongoose";


const evtolSchema = new mongoose.Schema({
    model: {
        type: String,
        enum: ["Lightweight", "Middleweight", "Cruiseweight", "Heavyweight"],
        default: "Lightweight"
    },
    weight: {
        type: Number,
        required: true,
        max: [500, 'Weight that eVTOL can carry can\'t be more than 500kg']
    },
    batteryCapacity: {
          type: Number,
          max: [100, 'battery is measured in percentage and cannot be more than 100%']
    },
    state: {
        type: String,
        enum: ["IDLE", "LOADING", "LOADED","DELIVERING", "DELIVERED", "RETURNING"],
        default: "IDLE"
    },
    medicine:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medicine"
        },

},
{
    timestamps:true, 
    toJSON: {virtuals:true}
}
)

const Evtol = mongoose.model("Evtol", evtolSchema);

export default Evtol;