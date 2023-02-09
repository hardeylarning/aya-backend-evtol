import User from "../model/user-model.js";
import Evtol from "../model/evtol-model.js";

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

    } catch (error) {
      res.json(error.message);
    }
  };
  
  export const deleteMedicineController = async (req, res) => {
    const {id} = req.params;
    try {
      const medicine = await Medicine.findOneAndDelete({_id: id})
      if(!medicine) return res.json({status: "error", message: "Medicine not found!"})

      res.json({
        status: "success",
        data: medicine,
      });

    } catch (error) {
      res.json(error.message);
    }
  };

export const updateMedicineController = async (req, res) => {
  const {id} = req.params;
  const { name, weight, code } = req.body
  try {

    const foundMedicine = await Medicine.findOneAndUpdate({_id: id}, {name, weight, code}, {
      new: true,
      runValidators: true
    })
    if(!foundMedicine) return res.json({status: "error", message: "No medicine found!"})

    res.json({
      status: "success",
      data: `${foundMedicine.name}, has been updated sucessfully`,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const medicineImageUploadController = async (req, res) => {
  const {id} = req.params
  try {
    const foundMedicine = await Medicine.findById(id)
    if(!foundMedicine) return res.json({status: "error", message: "No Medicine found for the id passed!"})

    if (req.file) {
      console.log("Path: ", req.file);
      const medicine = await Medicine.findByIdAndUpdate(id, {
        $set: {imageUrl: req.file.path}
      }, {
        new: true
      })
      res.json({
        status: "success",
        data: medicine,
      });

    }
    else {
      res.json({
        status: "error",
        data: "no image was attached",
      });
    }

    
  } 
  catch (error) {
    res.json(error.message);
  }
};
