import User from "../model/user-model.js";
import Evtol from "../model/evtol-model.js";
import Medicine from "../model/medicine-model.js";

export const registerEvtolController = async (req, res) => {
  const { serialNumber, model, weight, userId, batteryCapacity } = req.body;
  try {
    const userFound = await User.findOne({ _id: req.userAuth });
    if (!userFound) return res.json({
         status: "error", 
        message: "Oop! Invalid credential, kindly login before accessing this page" 
    });

    if (userFound.role !== 'Admin') return res.json({
         status: "error", 
        message: "Oop! Invalid credential, you are not authorized to access this endpoint" 
    });

    if (weight > 500) {
      return res.json({
        status: "error", 
        message: "Evtol weight can't be more than 500" 
      });
    }


    const evtol = await Evtol.create({
        serialNumber,
        model: String(model),
        userId: userId ? userId : req.userAuth,
        weight,
        batteryCapacity
    });

    if (!evtol) return res.json({status: "error", message: "Network Error!"})

    res.json({
      status: "success",
      data: evtol,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const loadEvtolController = async (req, res) => {
  const {id} = req.params
  try {
    const evtol = await Evtol.findById({_id: req.params.id})

    if(!evtol) return res.json({
        status: "error",
        message: "No EVTOL found"
    })

    if(evtol.batteryCapacity < 25) {
      return res.json({
        status: "error",
        message: "Evtol battery is below 25%, kindly check for another available Evtol"
    })
    }
    
    const medicine = await Medicine.findById(req.body.medicineId)
    // console.log("Medicine: ", medicine);
    if(!medicine) {
      return res.json({
          status: "error",
          message: "No Medicine found" 
        });
    }
    if(medicine.weight > evtol.weight) {
       return res.json({
            status: "error",
            message: "Medication weight is more than what this Evtol can carry, kindly use another Evtol"
          });
    }

    evtol.medicines.push(medicine._id)
    
    console.log('Medicine: ', evtol);
    evtol.state = 'LOADED'
    await evtol.save()

    res.json({
      status: "success",
      data: evtol,
    });
  } 
  catch (error) {
    res.json(error.message);
  }
};


export const evtolLoadedMedicinesController = async (req, res) => {
  try {
    const evtol = await Evtol.findById({_id: req.params.evtolId})
    if(!evtol) return res.json({
        status: "error",
        message: "No EVTOL found"
    })

    const medicine = await Medicine.findById({_id: evtol.medicines[0]})
    if(!medicine) return res.json({
        status: "error",
        message: "No Medicine found"
    })


    res.json({
      status: "success",
      data: medicine,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const availableEvtolController = async (req, res) => {
    try {
        const evtol = await Evtol.find({state:'IDLE'})
        res.json({
            status: "success",
            data: evtol,
        });

    } 
    catch (error) {
      res.json(error.message);
    }
  };
  
  export const checkEvtolBatteryLevelController = async (req, res) => {
    const {id} = req.params;
    try {
      const evtol = await Evtol.findById({_id: id})
      if(!evtol) return res.json({status: "error", message: "Evtol not found!"})

      res.json({
        status: "success",
        data: evtol.batteryCapacity,
      });

    } catch (error) {
      res.json(error.message);
    }
  };
  export const evtolController = async (req, res) => {
    const {id} = req.params;
    try {
      const evtol = await Evtol.findById({_id: id})
      if(!evtol) return res.json({status: "error", message: "Evtol not found!"})

      res.json({
        status: "success",
        data: evtol,
      });

    } catch (error) {
      res.json(error.message);
    }
  };

  export const evtolsController = async (req, res) => {
    try {
      const evtols = await Evtol.find({})
      res.json({
        status: "success",
        data: evtols,
      });
  
    } 
    catch (error) {
      res.json(error.message);
    }
  };


