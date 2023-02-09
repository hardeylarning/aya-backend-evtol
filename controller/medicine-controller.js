import User from "../model/user-model.js";
import Medicine from "../model/medicine-model.js";

export const newMedicineController = async (req, res) => {
  const { name, weight, userId, code, imageUrl } = req.body;
  try {
    const userFound = await User.findOne({ _id: req.userAuth });
    if (!userFound) return res.json({ status: "error", message: "Oop! Invalid credential, kindly login before accessing this page" });

    const medicine = await Medicine.create({
      name,
      userId: userId ? userId : req.userAuth,
      weight,
      code,
      imageUrl
    });

    if (!medicine) return res.json({status: "error", message: "Network Error!"})

    res.json({
      status: "success",
      data: medicine,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const medicinesController = async (req, res) => {
  try {
    const medicines = await Medicine.find({})
    res.json({
      status: "success",
      data: medicines,
    });

  } 
  catch (error) {
    res.json(error.message);
  }
};

export const getUserMedicinesController = async (req, res) => {
  const userId = req.userAuth
  try {
    const medicines = await Medicine.find({userId: userId})
    res.json({
      status: "success",
      data: medicines,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const getMedicineController = async (req, res) => {
    const {id} = req.params;
    try {
        const foundMedicine = await Medicine.findById({_id: id})
        if(!foundMedicine) return res.json({status: "error", message: "Medicine not found!"})

      res.json({
        status: "success",
        data: foundMedicine,
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

export const profileImageUploadController = async (req, res) => {
  // console.log("File: ", req.file);
  try {
    const foundUser = await User.findById(req.userAuth)
    if(!foundUser) return res.json({status: "error", message: "No user found for the id passed!"})

    if (req.file) {
      const user = await User.findByIdAndUpdate(req.userAuth, {
        $set: {profilephoto: req.file.path}
      }, {
        new: true
      })
      res.json({
        status: "success",
        data: user,
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
