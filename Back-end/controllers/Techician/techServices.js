const Technician = require("../../models/Technicians");
const Booking = require("../../models/Bookings");
exports.techDashboard = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id);
    if (!technician) return res.status(404).send("Technician not found");
    const jobs = await Booking.find({ tech_Id: technician._id });
    const completedJobs = jobs.filter((job) => job.status === "Completed");

    const monthlyEarnings = Array(12).fill(0);
    completedJobs.forEach((job) => {
      const month = new Date(job.actualWorked.end).getMonth();
      monthlyEarnings[month] += job.price;
    });

    res.json({
      totalEarnings: technician.earnings,
      completedJobs: technician.jobsCompleted,
      rating: technician.tech_ratingAvg,
      monthlyEarnings,
      recentJobs: jobs.slice(0, 3),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};

exports.fetchJobs = async (req, res) => {
  try {
    const { status } = req.query;
    let query = { tech_Id: req.params.id };

    if (status) query.status = status;

    const jobs = await Booking.find(query).populate(
      "user_Id",
      "user_name user_email user_contact"
    );
    res.json(jobs);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};

exports.singleJobDetail = async (req, res) => {
  try {
    const job = await Booking.findById(req.params.jobId)
      .populate("user_Id", "user_name user_email user_contact user_address")
      .populate("tech_Id", "tech_name worksKnown tech_ratingAvg");

    if (!job) return res.status(404).send("Job not found");

    res.json(job);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};

exports.updateTech = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateObject = {};
    for (const key in data) {
      if (typeof data[key] === "object" && !Array.isArray(data[key])) {
        // Handle nested objects (e.g., user_address)
        for (const nestedKey in data[key]) {
          updateObject[`${key}.${nestedKey}`] = data[key][nestedKey];
        }
      } else {
        // Handle top-level fields (e.g., user_name, user_email)
        updateObject[key] = data[key];
      }
    }

    upd_tech = await Technician.findByIdAndUpdate(
      id,
      { $set: updateObject },
      { new: true }
    );
    const techUptodate = {
      name: upd_tech.tech_name,

      password: upd_tech.tech_password,
      contact: upd_tech.tech_contact,
      address: upd_tech.tech_address,

      workKnown: upd_tech.worksKnown,
      experience: upd_tech.tech_experience,

      profileImg: upd_tech.profileImg,
    };
    res
      .status(200)
      .json({ techUptodate, message: "Tech updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
