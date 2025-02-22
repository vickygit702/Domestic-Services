const Services = require("../../models/Services");
exports.addServices = async (req, res) => {
  try {
    const newService = new Services(req.body);
    await newService.save();
    res.status(201).json({ message: "Service added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
exports.updateService = async (req, res) => {
  try {
    await Services.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Services.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
