// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   IconButton,
//   Stack,
//   Chip,
//   Divider,
//   Collapse,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import {
//   Print as PrintIcon,
//   PictureAsPdf as PdfIcon,
//   KeyboardArrowDown,
//   KeyboardArrowUp,
// } from "@mui/icons-material";
// import { useReactToPrint } from "react-to-print";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// const PaymentsPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [payslips, setPayslips] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const { technician } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(true);
//   const [expandedJobs, setExpandedJobs] = useState({});
//   const payslipRef = useRef();

//   useEffect(() => {
//     const fetchPayslips = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `http://localhost:8000/technician/${technician.id}/payments/payslips?month=${selectedMonth}&year=${selectedYear}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch payslips");

//         const data = await response.json();

//         const formattedPayslips = data.map((payslip) => ({
//           id: payslip.payslipId,
//           date: new Date(payslip.date).toISOString().split("T")[0],
//           period: payslip.period,
//           netPay: payslip.amount,
//           paymentMethod: payslip.paymentMethod,
//           bankAccount:
//             payslip.technicianId?.bankAccountNo || payslip.bankAccount,
//           status: payslip.status,
//           technicianName: payslip.technicianId?.tech_name,
//           earningData: payslip.earningData || [],
//         }));

//         setPayslips(formattedPayslips);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching payslips:", error);
//         setLoading(false);
//       }
//     };

//     fetchPayslips();
//   }, [selectedMonth, selectedYear, technician.id]);

//   const currentPayslip = payslips[0] || {};

//   const toggleJobDetails = (payslipId) => {
//     setExpandedJobs((prev) => ({
//       ...prev,
//       [payslipId]: !prev[payslipId],
//     }));
//   };

//   const handleExportPDF = () => {
//     if (!currentPayslip.id) return;

//     const doc = new jsPDF();

//     // Payslip Header
//     doc.setFontSize(16);
//     doc.setTextColor(40, 40, 40);
//     doc.text("TECHNICIAN PAYSLIP", 105, 20, { align: "center" });

//     doc.setFontSize(10);
//     doc.text(`Period: ${currentPayslip.period || ""}`, 15, 30);
//     doc.text(`Payslip ID: ${currentPayslip.id || ""}`, 105, 30, {
//       align: "center",
//     });
//     doc.text(`Payment Date: ${currentPayslip.date || ""}`, 180, 30, {
//       align: "right",
//     });

//     // Divider
//     doc.setDrawColor(200, 200, 200);
//     doc.line(15, 35, 195, 35);

//     // Earnings Summary
//     doc.setFontSize(12);
//     doc.text("EARNINGS SUMMARY", 15, 45);

//     autoTable(doc, {
//       startY: 50,
//       head: [["Description", "Amount"]],
//       body: [["Total Earnings", `$${(currentPayslip.netPay || 0).toFixed(2)}`]],
//       theme: "grid",
//       headStyles: { fillColor: [100, 100, 100] },
//       styles: { fontSize: 10 },
//     });

//     // Job Details
//     if (currentPayslip.earningData?.length > 0) {
//       doc.setFontSize(12);
//       doc.text("JOB DETAILS", 15, doc.lastAutoTable.finalY + 15);

//       const jobData = currentPayslip.earningData.map((job) => [
//         job.jobName || "Unknown Job",
//         new Date(job.workDate).toLocaleDateString(),
//         `$${(job.amount || 0).toFixed(2)}`,
//       ]);

//       autoTable(doc, {
//         startY: doc.lastAutoTable.finalY + 20,
//         head: [["Job Name", "Work Date", "Amount"]],
//         body: jobData,
//         theme: "grid",
//         headStyles: { fillColor: [100, 100, 100] },
//         styles: { fontSize: 10 },
//       });
//     }

//     // Net Pay
//     doc.setFontSize(14);
//     doc.setTextColor(40, 40, 40);
//     doc.text(
//       `NET PAY: $${(currentPayslip.netPay || 0).toFixed(2)}`,
//       15,
//       doc.lastAutoTable.finalY + 25
//     );

//     // Payment Info
//     doc.setFontSize(10);
//     doc.text(
//       `Payment Method: ${currentPayslip.paymentMethod || ""}`,
//       15,
//       doc.lastAutoTable.finalY + 35
//     );
//     doc.text(
//       `Bank Account: ${currentPayslip.bankAccount || ""}`,
//       15,
//       doc.lastAutoTable.finalY + 40
//     );
//     doc.text(
//       `Status: ${currentPayslip.status || ""}`,
//       15,
//       doc.lastAutoTable.finalY + 45
//     );

//     doc.save(`payslip_${currentPayslip.id || "unknown"}.pdf`);
//   };

//   return (
//     <Box sx={{ p: isMobile ? 1 : 3 }}>
//       <Stack
//         direction={isMobile ? "column" : "row"}
//         justifyContent="space-evenly"
//         //alignItems={isMobile ? "flex-start" : "center"}
//         alignItems="center"
//         spacing={isMobile ? 2 : 0}
//         mb={3}
//       >
//         {!isMobile && (
//           <Typography variant="h4" fontWeight="bold">
//             Payslip History
//           </Typography>
//         )}
//         <Stack
//           direction="row"
//           spacing={1}
//           className="no-print"
//           sx={{
//             width: isMobile ? "100%" : "auto",
//             flexWrap: isMobile ? "wrap" : "nowrap",
//             gap: isMobile ? 2 : 3,
//           }}
//         >
//           <FormControl size="small" sx={{ minWidth: isMobile ? "100%" : 120 }}>
//             <InputLabel>Month</InputLabel>
//             <Select
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               label="Month"
//             >
//               {Array.from({ length: 12 }, (_, i) => (
//                 <MenuItem key={i} value={i + 1}>
//                   {new Date(0, i).toLocaleString("default", { month: "long" })}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl size="small" sx={{ minWidth: isMobile ? "80%" : 120 }}>
//             <InputLabel>Year</InputLabel>
//             <Select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//               label="Year"
//             >
//               {Array.from({ length: 3 }, (_, i) => (
//                 <MenuItem key={i} value={new Date().getFullYear() - 1 + i}>
//                   {new Date().getFullYear() - 1 + i}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           {payslips.length > 0 && (
//             <IconButton
//               onClick={handleExportPDF}
//               color="error"
//               sx={{
//                 ml: isMobile ? "auto" : 0,
//                 order: isMobile ? 2 : 0,
//               }}
//             >
//               <PdfIcon />
//             </IconButton>
//           )}
//         </Stack>
//       </Stack>

//       {loading ? (
//         <Typography>Loading payslip...</Typography>
//       ) : payslips.length === 0 ? (
//         <Typography>No payslip found for selected period</Typography>
//       ) : (
//         <Paper
//           ref={payslipRef}
//           sx={{
//             p: isMobile ? 2 : 4,
//             maxWidth: "800px",
//             mx: "auto",
//             boxShadow: 3,
//             "@media print": {
//               boxShadow: "none",
//             },
//           }}
//           className="payslip-container"
//         >
//           {/* Payslip Header */}
//           <Box textAlign="center" mb={isMobile ? 1 : 3}>
//             <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
//               TECHNICIAN PAYSLIP
//             </Typography>
//             <Stack
//               direction={isMobile ? "row" : "row"}
//               justifyContent="space-evenly"
//               spacing={isMobile ? 1 : 0}
//               mt={isMobile ? 1 : 2}
//               // textAlign={isMobile ? "left" : "inherit"}
//             >
//               <Typography variant="body2">{currentPayslip.period}</Typography>
//               <Typography variant="body2">{currentPayslip.id}</Typography>
//               <Typography variant="body2">{currentPayslip.date}</Typography>
//             </Stack>
//           </Box>

//           <Divider sx={{ my: isMobile ? 1 : 2 }} />

//           {/* Earnings Section */}

//           <TableContainer>
//             <Table size="small">
//               <TableBody>
//                 <TableRow sx={{ "& td": { borderBottom: "none" } }}>
//                   <TableCell
//                     sx={{ padding: isMobile ? "8px 8px 8px 0" : "16px" }}
//                   >
//                     <strong>Total Earnings</strong>
//                   </TableCell>
//                   <TableCell
//                     align="right"
//                     sx={{ padding: isMobile ? "8px 0 8px 8px" : "16px" }}
//                   >
//                     <strong>${currentPayslip.netPay?.toFixed(2)}</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Job Details Section */}
//           {currentPayslip.earningData?.length > 0 && (
//             <Box mt={isMobile ? 2 : 4}>
//               <Button
//                 startIcon={
//                   expandedJobs[currentPayslip.id] ? (
//                     <KeyboardArrowUp />
//                   ) : (
//                     <KeyboardArrowDown />
//                   )
//                 }
//                 onClick={() => toggleJobDetails(currentPayslip.id)}
//                 sx={{
//                   mb: 1,
//                   p: isMobile ? "6px 8px" : "8px 16px",
//                   fontSize: isMobile ? "0.875rem" : "1rem",
//                 }}
//                 size={isMobile ? "small" : "medium"}
//               >
//                 {expandedJobs[currentPayslip.id]
//                   ? "Hide Job Details"
//                   : "Show Job Details"}
//               </Button>

//               <Collapse in={expandedJobs[currentPayslip.id]}>
//                 <Typography
//                   variant={isMobile ? "subtitle1" : "h6"}
//                   gutterBottom
//                 >
//                   JOB DETAILS
//                 </Typography>
//                 <TableContainer
//                   component={Paper}
//                   sx={{
//                     mb: isMobile ? 1 : 3,
//                     maxWidth: isMobile ? "calc(100vw - 32px)" : "100%",
//                   }}
//                 >
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell sx={{ p: isMobile ? "8px" : "16px" }}>
//                           <b>Job Name</b>
//                         </TableCell>
//                         <TableCell sx={{ p: isMobile ? "8px" : "16px" }}>
//                           <b>Work Date</b>
//                         </TableCell>
//                         <TableCell
//                           align="right"
//                           sx={{ p: isMobile ? "8px" : "16px" }}
//                         >
//                           <b>Amount</b>
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {currentPayslip.earningData.map((job, index) => (
//                         <TableRow key={index}>
//                           <TableCell sx={{ p: isMobile ? "8px" : "16px" }}>
//                             {job.jobName || "Unknown Job"}
//                           </TableCell>
//                           <TableCell sx={{ p: isMobile ? "8px" : "16px" }}>
//                             {new Date(job.workDate).toLocaleDateString()}
//                           </TableCell>
//                           <TableCell
//                             align="right"
//                             sx={{ p: isMobile ? "8px" : "16px" }}
//                           >
//                             ${(job.amount || 0).toFixed(2)}
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Collapse>
//             </Box>
//           )}

//           {/* Net Pay */}
//           <Box
//             mt={isMobile ? 2 : 4}
//             p={isMobile ? 1 : 2}
//             bgcolor="primary.light"
//             textAlign="center"
//           >
//             <Typography variant={isMobile ? "h7" : "h5"}>
//               NET PAY: ${currentPayslip.netPay?.toFixed(2)}
//             </Typography>
//           </Box>

//           {/* Payment Info */}
//           <Stack
//             direction={isMobile ? "row" : "row"}
//             justifyContent="space-evenly"
//             // spacing={isMobile ? 1 : 0}
//             mt={isMobile ? 2 : 4}
//             sx={{ alignItems: "center" }}
//           >
//             <Typography variant="body2">
//               {currentPayslip.paymentMethod}
//             </Typography>
//             <Typography variant="body2">
//               {currentPayslip.bankAccount}
//             </Typography>
//             <Typography variant="body2" component="span">
//               <Chip
//                 label={currentPayslip.status}
//                 color={currentPayslip.status === "Paid" ? "success" : "warning"}
//                 size="small"
//                 sx={{ p: "15px" }}
//               />
//             </Typography>
//           </Stack>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default PaymentsPage;

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
  useMediaQuery,
  useTheme,
  LinearProgress,
  Avatar,
  Grid,
} from "@mui/material";
import {
  PictureAsPdf as PdfIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  AccountBalanceWallet,
  CalendarToday,
  Receipt,
  Payment,
  AccountBalance,
  CheckCircle,
  Pending,
} from "@mui/icons-material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

const PaymentsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add logo or company name
    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147);
    doc.text("TECHNICIAN PAYSLIP", 105, 20, { align: "center" });

    // Technician info
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Technician: ${technician.name || "N/A"}`, 15, 30);
    doc.text(`Employee ID: ${technician.id || "N/A"}`, 15, 36);

    // Payslip info
    doc.text(`Payslip ID: ${currentPayslip.id || "N/A"}`, 105, 30, {
      align: "center",
    });
    doc.text(`Period: ${currentPayslip.period || "N/A"}`, 105, 36, {
      align: "center",
    });
    doc.text(`Payment Date: ${currentPayslip.date || "N/A"}`, 180, 30, {
      align: "right",
    });
    doc.text(`Status: ${currentPayslip.status || "N/A"}`, 180, 36, {
      align: "right",
    });

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 42, 195, 42);

    // Earnings Summary
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text("EARNINGS SUMMARY", 15, 50);

    autoTable(doc, {
      startY: 55,
      head: [["Description", "Amount"]],
      body: [["Total Earnings", `$${(currentPayslip.netPay || 0).toFixed(2)}`]],
      theme: "grid",
      headStyles: {
        fillColor: [25, 118, 210],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
    });

    // Job Details
    if (currentPayslip.earningData?.length > 0) {
      doc.setFontSize(12);
      doc.text("JOB DETAILS", 15, doc.lastAutoTable.finalY + 15);

      const jobData = currentPayslip.earningData.map((job) => [
        job.jobName || "Unknown Job",
        format(new Date(job.workDate), "MMM dd, yyyy"),
        `$${(job.amount || 0).toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [["Job Name", "Work Date", "Amount"]],
        body: jobData,
        theme: "grid",
        headStyles: {
          fillColor: [25, 118, 210],
          textColor: 255,
          fontStyle: "bold",
        },
        styles: {
          fontSize: 9,
          cellPadding: 2,
        },
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
        },
      });
    }

    // Net Pay section
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(
      `NET PAY: $${(currentPayslip.netPay || 0).toFixed(2)}`,
      15,
      doc.lastAutoTable.finalY + 20
    );

    // Payment Info
    doc.setFontSize(10);
    doc.text(
      `Payment Method: ${currentPayslip.paymentMethod || "N/A"}`,
      15,
      doc.lastAutoTable.finalY + 30
    );
    doc.text(
      `Bank Account: ${currentPayslip.bankAccount || "N/A"}`,
      15,
      doc.lastAutoTable.finalY + 35
    );

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "This is a computer generated document and does not require a signature.",
      105,
      285,
      { align: "center" }
    );
    doc.text(
      `Generated on: ${format(new Date(), "MMM dd, yyyy HH:mm")}`,
      105,
      290,
      { align: "center" }
    );

    doc.save(
      `payslip_${currentPayslip.id || "unknown"}_${format(
        new Date(),
        "yyyyMMdd"
      )}.pdf`
    );
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "Paid":
        return <CheckCircle color="success" fontSize="small" />;
      case "Pending":
        return <Pending color="warning" fontSize="small" />;
      default:
        return <Pending color="action" fontSize="small" />;
    }
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      {/* Filter Controls - Centered */}
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        spacing={2}
        sx={{
          width: "100%",
          justifyContent: "center",
          mb: 3,
        }}
      >
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
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem key={i} value={new Date().getFullYear() - 2 + i}>
                {new Date().getFullYear() - 2 + i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton
          onClick={handleExportPDF}
          color="primary"
          size="large"
          sx={{
            backgroundColor: theme.palette.error.main,
            color: "white",
            "&:hover": {
              backgroundColor: theme.palette.error.dark,
            },
          }}
        >
          <PdfIcon />
        </IconButton>
      </Stack>

      {loading ? (
        <Box sx={{ width: "80%" }}>
          <LinearProgress color="primary" />
        </Box>
      ) : payslips.length === 0 ? (
        <Box
          sx={{
            width: "80%",
            backgroundColor: theme.palette.grey[100],
            borderRadius: 2,
            p: 4,
            textAlign: "center",
          }}
        >
          <AccountBalanceWallet color="disabled" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No Payslip Found
          </Typography>
          <Typography color="textSecondary">
            No payslip available for the selected period
          </Typography>
        </Box>
      ) : (
        <Paper
          ref={payslipRef}
          sx={{
            width: "80%",
            p: isMobile ? 3 : 4,
            boxShadow: 3,
            position: "relative",
          }}
        >
          {/* Payslip Header */}
          <Box textAlign="center" mb={2}>
            <Grid container spacing={2} justifyContent="space-evenly">
              <Grid item xs={12} md={4}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent="center"
                >
                  <Receipt color="primary" />
                  <Typography variant="body1">
                    <strong>ID:</strong> {currentPayslip.id}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent="center"
                >
                  <CalendarToday color="primary" />
                  <Typography variant="body1">
                    <strong>Period:</strong> {currentPayslip.period}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent="center"
                >
                  <Payment color="primary" />
                  <Typography variant="body1">
                    <strong>Date:</strong> {currentPayslip.date}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3, borderColor: "primary.light" }} />

          {/* Technician Info */}
          <Box mb={4} textAlign="center">
            <Typography variant="h7" gutterBottom color="textPrimary">
              TECHNICIAN INFORMATION
            </Typography>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Name:</strong> {technician.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Employee ID:</strong> {technician.id}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Earnings Section */}
          <Box mb={4} textAlign="center">
            <Typography variant="h7" gutterBottom color="textPrimary">
              EARNINGS SUMMARY
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "primary.main" }}>
                    <TableCell
                      sx={{ color: "common.white", fontWeight: "bold" }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "common.white", fontWeight: "bold" }}
                    >
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Total Earnings
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      ${currentPayslip.netPay?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Job Details Section */}
          {currentPayslip.earningData?.length > 0 && (
            <Box mb={4} textAlign="center">
              <Collapse in={expandedJobs[currentPayslip.id]}>
                <Typography variant="h7" gutterBottom color="textPrimary">
                  JOB DETAILS
                </Typography>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{
                    mb: 2,
                    maxHeight: 300,
                    overflow: "auto",
                  }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "primary.main" }}>
                        <TableCell
                          sx={{ color: "common.white", fontWeight: "bold" }}
                        >
                          Job Name
                        </TableCell>
                        <TableCell
                          sx={{ color: "common.white", fontWeight: "bold" }}
                        >
                          Work Date
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: "common.white", fontWeight: "bold" }}
                        >
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentPayslip.earningData.map((job, index) => (
                        <TableRow key={index} hover>
                          <TableCell>{job.jobName || "Unknown Job"}</TableCell>
                          <TableCell>
                            {format(new Date(job.workDate), "MMM dd, yyyy")}
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

          {/* Payment Info */}
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Grid item xs={12} sm={4}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Payment color="action" fontSize="large" />
                <div>
                  <Typography variant="subtitle2" color="textSecondary">
                    Payment Method
                  </Typography>
                  <Typography variant="body1">
                    {currentPayslip.paymentMethod}
                  </Typography>
                </div>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AccountBalance color="action" fontSize="large" />
                <div>
                  <Typography variant="subtitle2" color="textSecondary">
                    Bank Account
                  </Typography>
                  <Typography variant="body1">
                    {currentPayslip.bankAccount}
                  </Typography>
                </div>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <StatusIcon
                  status={currentPayslip.status}
                  style={{ fontSize: "2rem" }}
                />
                <div>
                  <Typography variant="subtitle2" color="textSecondary">
                    Status
                  </Typography>
                  <Chip
                    label={currentPayslip.status}
                    color={
                      currentPayslip.status === "Paid" ? "success" : "warning"
                    }
                    size="medium"
                    sx={{ height: 28, fontSize: "0.875rem" }}
                  />
                </div>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default PaymentsPage;
