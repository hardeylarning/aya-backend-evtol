import User from "../model/user-model.js";
import Evtol from "../model/evtol-model.js";
import Medicine from "../model/medicine-model.js";

export const registerEvtolController = async (req, res) => {
  const { model, weight, userId, batteryCapacity, state } = req.body;
  try {
    const userFound = await User.findOne({ _id: req.userAuth });
    if (!userFound) return res.json({ status: "error", message: "Oop! Invalid credential, kindly login before accessing this page" });

    const evtol = await Evtol.create({
      model,
      userId: userId ? userId : req.userAuth,
      weight,
      batteryCapacity,
      state
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
  try {
    const evtol = await Evtol.findById(req.params.evtolId)

    if(!evtol) return res.json({
        status: "error",
        message: "No EVTOL found"
    })

    if(evtol.batteryCapacity < 25) return res.json({
        status: "error",
        message: "Evtol battery is bellow 25%, kindly check for another available Evtol"
    })

    const medicine = await Medicine.findById(req.params.medicineId)

    if(!medicine) {
        return res.json({
            status: "error",
            message: "No Medicine found"
          });
    }

    evtol.medicines.push(medicine._id)
    res.json({
      status: "success",
      data: evtols,
    });

  } 
  catch (error) {
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

export const evtolLoadedMedicinesController = async (req, res) => {
  const evtolId = req.params.evtolId
  try {
    const evtol = await Evtol.findById({_id: evtolId})
    res.json({
      status: "success",
      data: evtol.medicines,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const availableEvtolController = async (req, res) => {
    try {

        const evtol = await Medicine.find({state: 'IDLE'})
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


