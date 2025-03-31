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
