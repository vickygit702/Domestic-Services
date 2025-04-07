import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Stack,
  Chip,
  Divider,
  Collapse,
} from "@mui/material";
import {
  Print as PrintIcon,
  PictureAsPdf as PdfIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const PaymentsPage = () => {
  const [payslips, setPayslips] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { technician } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [expandedJobs, setExpandedJobs] = useState({});
  const payslipRef = useRef();

  useEffect(() => {
    const fetchPayslips = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8000/technician/${technician.id}/payments/payslips?month=${selectedMonth}&year=${selectedYear}`
        );
        if (!response.ok) throw new Error("Failed to fetch payslips");

        const data = await response.json();

        const formattedPayslips = data.map((payslip) => ({
          id: payslip.payslipId,
          date: new Date(payslip.date).toISOString().split("T")[0],
          period: payslip.period,
          netPay: payslip.amount,
          paymentMethod: payslip.paymentMethod,
          bankAccount:
            payslip.technicianId?.bankAccountNo || payslip.bankAccount,
          status: payslip.status,
          technicianName: payslip.technicianId?.tech_name,
          earningData: payslip.earningData || [],
        }));

        setPayslips(formattedPayslips);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payslips:", error);
        setLoading(false);
      }
    };

    fetchPayslips();
  }, [selectedMonth, selectedYear, technician.id]);

  const currentPayslip = payslips[0] || {};

  const toggleJobDetails = (payslipId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [payslipId]: !prev[payslipId],
    }));
  };

  const handleExportPDF = () => {
    if (!currentPayslip.id) return;

    const doc = new jsPDF();

    // Payslip Header
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text("TECHNICIAN PAYSLIP", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Period: ${currentPayslip.period || ""}`, 15, 30);
    doc.text(`Payslip ID: ${currentPayslip.id || ""}`, 105, 30, {
      align: "center",
    });
    doc.text(`Payment Date: ${currentPayslip.date || ""}`, 180, 30, {
      align: "right",
    });

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 35, 195, 35);

    // Earnings Summary
    doc.setFontSize(12);
    doc.text("EARNINGS SUMMARY", 15, 45);

    autoTable(doc, {
      startY: 50,
      head: [["Description", "Amount"]],
      body: [["Total Earnings", `$${(currentPayslip.netPay || 0).toFixed(2)}`]],
      theme: "grid",
      headStyles: { fillColor: [100, 100, 100] },
      styles: { fontSize: 10 },
    });

    // Job Details
    if (currentPayslip.earningData?.length > 0) {
      doc.setFontSize(12);
      doc.text("JOB DETAILS", 15, doc.lastAutoTable.finalY + 15);

      const jobData = currentPayslip.earningData.map((job) => [
        job.jobName || "Unknown Job",
        new Date(job.workDate).toLocaleDateString(),
        `$${(job.amount || 0).toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Job Name", "Work Date", "Amount"]],
        body: jobData,
        theme: "grid",
        headStyles: { fillColor: [100, 100, 100] },
        styles: { fontSize: 10 },
      });
    }

    // Net Pay
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(
      `NET PAY: $${(currentPayslip.netPay || 0).toFixed(2)}`,
      15,
      doc.lastAutoTable.finalY + 25
    );

    // Payment Info
    doc.setFontSize(10);
    doc.text(
      `Payment Method: ${currentPayslip.paymentMethod || ""}`,
      15,
      doc.lastAutoTable.finalY + 35
    );
    doc.text(
      `Bank Account: ${currentPayslip.bankAccount || ""}`,
      15,
      doc.lastAutoTable.finalY + 40
    );
    doc.text(
      `Status: ${currentPayslip.status || ""}`,
      15,
      doc.lastAutoTable.finalY + 45
    );

    doc.save(`payslip_${currentPayslip.id || "unknown"}.pdf`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Payslip History
        </Typography>

        <Stack direction="row" spacing={2} className="no-print">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              label="Month"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="Year"
            >
              {Array.from({ length: 3 }, (_, i) => (
                <MenuItem key={i} value={new Date().getFullYear() - 1 + i}>
                  {new Date().getFullYear() - 1 + i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {payslips.length > 0 && (
            <>
              <IconButton onClick={handleExportPDF} color="error">
                <PdfIcon />
              </IconButton>
            </>
          )}
        </Stack>
      </Stack>

      {loading ? (
        <Typography>Loading payslip...</Typography>
      ) : payslips.length === 0 ? (
        <Typography>No payslip found for selected period</Typography>
      ) : (
        <Paper
          ref={payslipRef}
          sx={{
            p: 4,
            maxWidth: "800px",
            mx: "auto",
            boxShadow: 3,
            "@media print": {
              boxShadow: "none",
            },
          }}
          className="payslip-container"
        >
          {/* Payslip Header */}
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              TECHNICIAN PAYSLIP
            </Typography>
            <Stack direction="row" justifyContent="space-between" mt={2}>
              <Typography variant="body2">
                <strong>Period:</strong> {currentPayslip.period}
              </Typography>
              <Typography variant="body2">
                <strong>Payslip ID:</strong> {currentPayslip.id}
              </Typography>
              <Typography variant="body2">
                <strong>Payment Date:</strong> {currentPayslip.date}
              </Typography>
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Earnings Section */}
          <Typography variant="h6" gutterBottom>
            EARNINGS SUMMARY
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                  <TableCell>
                    <strong>Total Earnings</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>${currentPayslip.netPay?.toFixed(2)}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Job Details Section */}
          {currentPayslip.earningData?.length > 0 && (
            <Box mt={4}>
              <Button
                startIcon={
                  expandedJobs[currentPayslip.id] ? (
                    <KeyboardArrowUp />
                  ) : (
                    <KeyboardArrowDown />
                  )
                }
                onClick={() => toggleJobDetails(currentPayslip.id)}
                sx={{ mb: 1 }}
              >
                {expandedJobs[currentPayslip.id]
                  ? "Hide Job Details"
                  : "Show Job Details"}
              </Button>

              <Collapse in={expandedJobs[currentPayslip.id]}>
                <Typography variant="h6" gutterBottom>
                  JOB DETAILS
                </Typography>
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Job Name</TableCell>
                        <TableCell>Work Date</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentPayslip.earningData.map((job, index) => (
                        <TableRow key={index}>
                          <TableCell>{job.jobName || "Unknown Job"}</TableCell>
                          <TableCell>
                            {new Date(job.workDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="right">
                            ${(job.amount || 0).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Collapse>
            </Box>
          )}

          {/* Net Pay */}
          <Box mt={4} p={2} bgcolor="primary.light" textAlign="center">
            <Typography variant="h5">
              NET PAY: ${currentPayslip.netPay?.toFixed(2)}
            </Typography>
          </Box>

          {/* Payment Info */}
          <Stack direction="row" justifyContent="space-between" mt={4}>
            <Typography variant="body2">
              <strong>Payment Method:</strong> {currentPayslip.paymentMethod}
            </Typography>
            <Typography variant="body2">
              <strong>Bank Account:</strong> {currentPayslip.bankAccount}
            </Typography>
            <Typography variant="body2">
              <strong>Status:</strong>
              <Chip
                label={currentPayslip.status}
                color={currentPayslip.status === "Paid" ? "success" : "warning"}
                size="small"
                sx={{ ml: 1 }}
              />
            </Typography>
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default PaymentsPage;
