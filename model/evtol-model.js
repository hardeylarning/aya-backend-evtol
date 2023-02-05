import mongoose from "mongoose";

const evtolSchema = new mongoose.Schema({
    model: {
        type: String,
        enum: ["Lightweight", "Middleweight", "Cruiseweight", "Heavyweight"]
    },
    weight: {
        type: Number,
        required: true,
        max: [500, 'Weight that eVTOL can carry can\'t be more than 500kg']
    },
    batteryCapacity: {
          
    },
    state: {
        type: String,
        enum: ["IDLE", "LOADING", "LOADED","DELIVERING", "DELIVERED", "RETURNING"]
    }

},
{
    timestamps:true, 
    toJSON: {virtuals:true}
}
)

const Evtol = mongoose.model("Evtol", evtolSchema);

export default Evtol;