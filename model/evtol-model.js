import mongoose from "mongoose";

const evtolSchema = new mongoose.Schema({
    // serialNumber: {
    //     type: String
    // },
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
          type: Number,
          max: [100, 'battery is measured in percentage and cannot be more than 100%']
    },
    state: {
        type: String,
        enum: ["IDLE", "LOADING", "LOADED","DELIVERING", "DELIVERED", "RETURNING"]
    },
    medicines: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medicine"
        }
    ],

},
{
    timestamps:true, 
    toJSON: {virtuals:true}
}
)

const Evtol = mongoose.model("Evtol", evtolSchema);

export default Evtol;