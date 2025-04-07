const mongoose = require("mongoose"); // REQUIRED IMPORT
const Services = require("../../models/Services");
const User = require("../../models/User");
const Payslip = require("../../models/PaySlip");
const Technician = require("../../models/Technicians");
const Booking = require("../../models/Bookings");

exports.setPremiumUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.userType = "premium";
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
exports.addServices = async (req, res) => {
  try {
    const newService = new Services(req.body);
    await newService.save();
    res.status(201).json({ message: "Service added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured....! please try again later" });
  }
};
exports.addManyServices = async (req, res) => {
  try {
    const insertedServices = await Services.insertMany(req.body);

    res
      .status(201)
      .json({ message: "Service added successfully", data: insertedServices });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured...! please try again later" });
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

//payments

exports.generatePayslips = async (req, res) => {
  try {
    const { month, year } = req.body;

    if (!month || !year) {
      return res.status(400).json({ error: "Month and year are required" });
    }

    const period = new Date(year, month - 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    // Get all completed bookings for the specified month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const completedBookings = await Booking.aggregate([
      {
        $match: {
          tech_Id: { $exists: true },
          status: "Completed",
          "actualWorked.start": {
            $gte: startDate,
            $lte: endDate,
          },
          paymentStatus: true,
        },
      },
      {
        $group: {
          _id: "$tech_Id",
          earnings: {
            $sum: "$price",
          },
          jobs: {
            $push: {
              jobId: "$_id",
              jobName: "$serviceName",
              workDate: "$actualWorked.start",
              amount: "$price",
            },
          },
        },
      },
      {
        $lookup: {
          from: "technicians",
          localField: "_id",
          foreignField: "_id",
          as: "technician",
        },
      },
      {
        $unwind: "$technician",
      },
    ]);

    if (completedBookings.length === 0) {
      return res.status(404).json({
        message: "No completed bookings found for this period",
      });
    }

    const results = await Promise.all(
      completedBookings.map(async (techEarnings) => {
        try {
          // Check if payslip already exists for this technician and period
          const existingPayslip = await Payslip.findOne({
            technicianId: techEarnings._id,
            period: period,
          });

          if (existingPayslip) {
            return {
              technicianId: techEarnings._id,
              status: "Skipped",
              message: "Payslip already exists for this period",
            };
          }

          // Create new payslip
          const payslipId = `PSL-${Date.now()}-${Math.floor(
            Math.random() * 1000
          )}`;

          const newPayslip = await Payslip.create({
            payslipId,
            technicianId: techEarnings._id,
            date: new Date(),
            period,
            paymentMethod: "Bank Transfer",
            bankAccount: techEarnings.technician.bankAccountNo,
            amount: techEarnings.earnings,
            status: "Pending",
            earningData: techEarnings.jobs,
          });

          return {
            payslipId: newPayslip.payslipId,
            technicianId: newPayslip.technicianId,
            status: "Created",
            amount: newPayslip.amount,
          };
        } catch (error) {
          console.error(
            `Error generating payslip for technician ${techEarnings._id}:`,
            error
          );
          return {
            technicianId: techEarnings._id,
            status: "Error",
            error: error.message,
          };
        }
      })
    );

    res.json({
      message: "Payslip generation completed",
      period,
      totalProcessed: results.length,
      results,
    });
  } catch (error) {
    console.error("Payslip generation failed:", error);
    res.status(500).json({
      error: "Payslip generation failed",
      details: error.message,
    });
  }
};
// Get monthly summary for all technicians through a query status

exports.getMonthlySummary = async (req, res) => {
  try {
    const { month, year, status } = req.query;

    // Validate required query parameters
    if (!month || !year) {
      return res.status(400).json({
        error: "Both month and year query parameters are required",
        example:
          "http://localhost:8000/admin/monthly-summary?month=4&year=2025&status=Paid",
      });
    }

    // Convert to numbers and validate
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (isNaN(monthNum) || isNaN(yearNum)) {
      return res.status(400).json({ error: "Month and year must be numbers" });
    }

    if (monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ error: "Month must be between 1 and 12" });
    }

    // Validate status if provided
    if (status && !["Pending", "Paid"].includes(status)) {
      return res
        .status(400)
        .json({ error: "Status must be either 'Pending' or 'Paid'" });
    }

    // Generate the period string (e.g., "April 2025")
    const period = new Date(yearNum, monthNum - 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    // Build the match query
    const matchQuery = {
      period: period,
    };

    // Add status filter if provided
    if (status) {
      matchQuery.status = status;
    }

    // Your aggregation logic
    const summary = await Payslip.aggregate([
      {
        $match: matchQuery,
      },
      {
        $group: {
          _id: "$technicianId",
          totalAmount: { $sum: "$amount" },
          paymentCount: { $sum: 1 },
          status: { $first: "$status" }, // Include status in the output
        },
      },
      {
        $lookup: {
          from: "technicians",
          localField: "_id",
          foreignField: "_id",
          as: "technician",
        },
      },
      {
        $unwind: "$technician",
      },
      {
        $project: {
          technicianId: "$_id",
          technicianName: "$technician.tech_name",
          bankAccount: "$technician.bankAccountNo",
          totalAmount: 1,
          paymentCount: 1,
          status: 1,
        },
      },
    ]);

    res.json({
      success: true,
      period,
      filterStatus: status || "All", // Show what status was filtered for
      summary,
    });
  } catch (error) {
    console.error("Error fetching monthly summary:", error);
    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};

// Process payments for a specific month

exports.processPayments = async (req, res) => {
  try {
    const { month, year } = req.body;

    if (!month || !year) {
      return res.status(400).json({ error: "Month and year are required" });
    }

    const period = new Date(year, month - 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const pendingPayslips = await Payslip.find({
      period: period,
      status: "Pending",
    }).populate("technicianId");

    if (pendingPayslips.length === 0) {
      return res.status(404).json({
        message: "No pending payments found for this period",
      });
    }

    const results = await Promise.all(
      pendingPayslips.map(async (payslip) => {
        try {
          if (!payslip.technicianId?.bankAccountNo) {
            return {
              payslipId: payslip.payslipId,
              status: "Failed",
              error: "Missing bank account",
            };
          }

          const paymentSuccess = Math.random() > 0.1; // 90% success rate

          if (paymentSuccess) {
            // Non-transactional updates
            await Payslip.updateOne(
              { _id: payslip._id },
              { status: "Paid", processedAt: new Date() }
            );

            await Technician.updateOne(
              { _id: payslip.technicianId._id },
              { $inc: { earnings: payslip.amount } }
            );

            return {
              payslipId: payslip.payslipId,
              status: "Paid",
              technician: payslip.technicianId.tech_name,
            };
          } else {
            await Payslip.updateOne({ _id: payslip._id }, { status: "Failed" });
            return {
              payslipId: payslip.payslipId,
              status: "Failed",
            };
          }
        } catch (error) {
          console.error(`Error processing ${payslip.payslipId}:`, error);
          return {
            payslipId: payslip.payslipId,
            status: "Error",
            error: error.message,
          };
        }
      })
    );

    res.json({
      message: "Payment processing completed",
      period,
      totalProcessed: results.length,
      results,
    });
  } catch (error) {
    console.error("Payment processing failed:", error);
    res.status(500).json({
      error: "Payment processing failed",
      details: error.message,
    });
  }
};
