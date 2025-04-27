const moment = require("moment-timezone");
const Technician = require("../../models/Technicians");
const Booking = require("../../models/Bookings");
const Payslip = require("../../models/PaySlip");

exports.techDashboard = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id);
    if (!technician) return res.status(404).send("Technician not found");
    const jobs = await Booking.find({ tech_Id: technician._id });
    const completedJobs = jobs.filter((job) => job.status === "Completed");
    const pendingJobs = jobs.filter((job) => job.status === "Confirmed");

    const monthlyEarnings = Array(12).fill(0);
    completedJobs.forEach((job) => {
      if (job.paymentStatus) {
        const month = new Date(job.actualWorked.end).getMonth();
        monthlyEarnings[month] += job.price;
      }
    });

    res.json({
      jobs: completedJobs,
      totalEarnings: technician.earnings,
      completedJobs: technician.jobsCompleted,
      rating: technician.tech_ratingAvg,
      monthlyEarnings,
      pendingJobs,
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

    const jobs = await Booking.find(query)
      .populate("user_Id", "user_name user_email user_contact")
      .lean();
    const formattedJobs = jobs.map(formatBooking);
    return res.json(formattedJobs);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
exports.getPayslips = async (req, res) => {
  try {
    const technicianId = req.params.id;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ error: "Month and year are required" });
    }

    const payslips = await Payslip.find({
      technicianId: technicianId,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      },
    }).populate("technicianId", "tech_name bankAccountNo");

    res.json(payslips);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

exports.updateJobStatus = async (req, res) => {
  try {
    const { selectedJob } = req.body;
    console.log("update job status", selectedJob);
    const { id, status } = selectedJob;
    if (!id || !status) {
      return res
        .status(400)
        .json({ message: "Job ID and status are required" });
    }

    let update = {};

    if (status === "Confirmed") {
      update = {
        $set: {
          status: "InProgress",
          "actualWorked.start": new Date(),
        },
      };
    } else if (status === "InProgress") {
      update = {
        $set: {
          status: "Completed",
          "actualWorked.end": new Date(),
        },
      };
    } else {
      return res.status(400).json({ message: "Invalid status transition" });
    }
    console.log("update", update);
    const updatedJob = await Booking.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    //db stores UTC time we convert into IST time
    const doc = await Booking.findById(id);
    //update price
    if (status === "InProgress") {
      const hourCost = doc.perHour;
      console.log(hourCost);
      const inMin = hourCost / 3600;
      //get atleast 5 decimals
      console.log(inMin);
      if (doc.actualWorked?.start && doc.actualWorked?.end) {
        const start = new Date(doc.actualWorked.start);
        console.log(start);
        const end = new Date(doc.actualWorked.end);
        console.log(end);
        const totduration = Math.round((end - start) / (1000 * 60)); // Duration in minutes
        console.log("mins", totduration);
        const totPrice = Math.round(totduration * inMin * 60);
        console.log("efore updating db tot price", totPrice);
        // Update with calculated duration
        await Booking.findByIdAndUpdate(id, { $set: { price: totPrice } });
      }
    }

    res.json(doc);
  } catch (error) {
    console.error("Error updating job status:", error);
    return res
      .status(500)
      .json({ message: "Error occurred in server, please try again later" });
  }
};
// controllers/Techician/techServices.js
exports.getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find().select('-tech_password'); // Exclude password for security
    res.status(200).json({ techDetails: technicians });
  } catch (error) {
    console.error("Error fetching technicians:", error);
    res.status(500).json({ message: "Error fetching technicians", error: error.message });
  }
};

const formatBooking = (job) => {
  const formatted = {
    id: job._id,
    technicianid: job.tech_Id,
    user: job.user_Id,
    servicename: job.serviceName,
    bookeddate: job.bookedDate,
    jobDetail: job.workDetail,
    status: job.status,
    paymentStatus: job.paymentStatus,
    price: job?.price || 0,
    est_price: job.est_price,
  };

  // Format actualWorked dates if they exist
  if (job.actualWorked) {
    formatted.actualWorked = {
      ...job.actualWorked,
      start: job.actualWorked.start
        ? moment(job.actualWorked.start)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm:ss")
        : null,
      end: job.actualWorked.end
        ? moment(job.actualWorked.end)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm:ss")
        : null,
    };
  }

  return formatted;
};
