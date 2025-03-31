import React, { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import {
  Print as PrintIcon,
  PictureAsPdf as PdfIcon,
} from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// const PaymentsPage = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const tableRef = React.useRef();

//   // Mock data - replace with your API call
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         setLoading(true);
//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 800));

//         const mockData = [
//           {
//             id: "TX-001",
//             date: "2023-06-15",
//             jobId: "JOB-001",
//             customer: "John Doe",
//             service: "Plumbing Repair",
//             amount: 250.0,
//             status: "Paid",
//             paymentMethod: "Credit Card",
//           },
//           // More transactions...
//         ];

//         setTransactions(
//           mockData.filter((tx) => {
//             const txDate = new Date(tx.date);
//             return (
//               txDate.getMonth() + 1 === selectedMonth &&
//               txDate.getFullYear() === selectedYear
//             );
//           })
//         );
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [selectedMonth, selectedYear]);

//   // Calculate totals
//   const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
//   const completedPayments = transactions.filter(
//     (tx) => tx.status === "Paid"
//   ).length;

//   // Print functionality

//   // PDF export functionality
//   const handleExportPDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text(`Payment History - ${selectedMonth}/${selectedYear}`, 14, 20);

//     doc.setFontSize(12);
//     doc.text(`Total Earnings: $${totalAmount.toFixed(2)}`, 14, 30);
//     doc.text(`Completed Payments: ${completedPayments}`, 14, 38);

//     autoTable(doc, {
//       startY: 45,
//       head: [["ID", "Date", "Job", "Customer", "Amount", "Status"]],
//       body: transactions.map((tx) => [
//         tx.id,
//         tx.date,
//         tx.jobId,
//         tx.customer,
//         `$${tx.amount.toFixed(2)}`,
//         tx.status,
//       ]),
//       styles: { fontSize: 10 },
//       headStyles: { fillColor: [63, 81, 181] },
//     });

//     doc.save(`payments_${selectedMonth}_${selectedYear}.pdf`);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//       >
//         <Typography variant="h4" fontWeight="bold">
//           Payment History
//         </Typography>

//         <Stack direction="row" spacing={2} className="no-print">
//           <FormControl size="small" sx={{ minWidth: 120 }}>
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

//           <FormControl size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Year</InputLabel>
//             <Select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//               label="Year"
//             >
//               {Array.from({ length: 5 }, (_, i) => (
//                 <MenuItem key={i} value={new Date().getFullYear() - 2 + i}>
//                   {new Date().getFullYear() - 2 + i}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <IconButton onClick={handleExportPDF} color="error">
//             <PdfIcon />
//           </IconButton>
//         </Stack>
//       </Stack>

//       <Box mb={3} className="no-print">
//         <Stack direction="row" spacing={2}>
//           <Paper sx={{ p: 2, flex: 1 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Total Earnings
//             </Typography>
//             <Typography variant="h5" color="primary.main">
//               ${totalAmount.toFixed(2)}
//             </Typography>
//           </Paper>

//           <Paper sx={{ p: 2, flex: 1 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Completed Payments
//             </Typography>
//             <Typography variant="h5">
//               {completedPayments} / {transactions.length}
//             </Typography>
//           </Paper>
//         </Stack>
//       </Box>

//       <TableContainer component={Paper} ref={tableRef}>
//         <Table>
//           <TableHead sx={{ bgcolor: "primary.main" }}>
//             <TableRow>
//               <TableCell sx={{ color: "white" }}>Transaction ID</TableCell>
//               <TableCell sx={{ color: "white" }}>Date</TableCell>
//               <TableCell sx={{ color: "white" }}>Job ID</TableCell>
//               <TableCell sx={{ color: "white" }}>Customer</TableCell>
//               <TableCell sx={{ color: "white" }}>Service</TableCell>
//               <TableCell sx={{ color: "white" }}>Amount</TableCell>
//               <TableCell sx={{ color: "white" }}>Status</TableCell>
//               <TableCell sx={{ color: "white" }}>Payment Method</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={8} align="center">
//                   Loading transactions...
//                 </TableCell>
//               </TableRow>
//             ) : transactions.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} align="center">
//                   No transactions found for selected period
//                 </TableCell>
//               </TableRow>
//             ) : (
//               transactions.map((tx) => (
//                 <TableRow key={tx.id}>
//                   <TableCell>{tx.id}</TableCell>
//                   <TableCell>{tx.date}</TableCell>
//                   <TableCell>{tx.jobId}</TableCell>
//                   <TableCell>{tx.customer}</TableCell>
//                   <TableCell>{tx.service}</TableCell>
//                   <TableCell>${tx.amount.toFixed(2)}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={tx.status}
//                       color={tx.status === "Paid" ? "success" : "warning"}
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>{tx.paymentMethod}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {!loading && transactions.length > 0 && (
//         <Box mt={2} className="no-print">
//           <Divider />
//           <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
//             <Typography variant="body1">
//               <strong>
//                 Total for {selectedMonth}/{selectedYear}:
//               </strong>
//             </Typography>
//             <Typography variant="h6">${totalAmount.toFixed(2)}</Typography>
//           </Stack>
//         </Box>
//       )}
//     </Box>
//   );
// };

const PaymentsPage = () => {
  const [payslips, setPayslips] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const payslipRef = useRef();

  // Mock data - replace with API call
  useEffect(() => {
    const fetchPayslips = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockData = [
          {
            id: "PS-2023-06-001",
            date: "2023-06-30",
            period: "June 2023",
            baseIncentive: 1200.0,
            bonuses: 350.0,
            deductions: 0.0,
            tax: 120.5,
            netPay: 1429.5,
            paymentMethod: "Bank Transfer",
            bankAccount: "XXXX-XXXX-7890",
            status: "Paid",
          },
          // More payslips...
        ];

        setPayslips(
          mockData.filter((ps) => {
            const psDate = new Date(ps.date);
            return (
              psDate.getMonth() + 1 === selectedMonth &&
              psDate.getFullYear() === selectedYear
            );
          })
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payslips:", error);
        setLoading(false);
      }
    };

    fetchPayslips();
  }, [selectedMonth, selectedYear]);

  const currentPayslip = payslips[0] || {};
  const grossPay =
    (currentPayslip.baseIncentive || 0) + (currentPayslip.bonuses || 0);

  const handlePrint = useReactToPrint({
    content: () => payslipRef.current,
    pageStyle: `
      @page { size: A4; margin: 15mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
        .payslip-container { box-shadow: none !important; }
      }
    `,
  });

  const handleExportPDF = () => {
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

    // Earnings
    doc.setFontSize(12);
    doc.text("EARNINGS", 15, 45);

    autoTable(doc, {
      startY: 50,
      head: [["Description", "Amount"]],
      body: [
        [
          "Base Incentive",
          `$${(currentPayslip.baseIncentive || 0).toFixed(2)}`,
        ],
        ["Bonuses", `$${(currentPayslip.bonuses || 0).toFixed(2)}`],
        ["Total Earnings", `$${grossPay.toFixed(2)}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [100, 100, 100] },
      styles: { fontSize: 10 },
    });

    // Deductions
    doc.setFontSize(12);
    doc.text("DEDUCTIONS", 15, doc.lastAutoTable.finalY + 15);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Description", "Amount"]],
      body: [
        ["Tax", `$${(currentPayslip.tax || 0).toFixed(2)}`],
        ["Other Deductions", `$${(currentPayslip.deductions || 0).toFixed(2)}`],
        [
          "Total Deductions",
          `$${(currentPayslip.tax + currentPayslip.deductions || 0).toFixed(
            2
          )}`,
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [100, 100, 100] },
      styles: { fontSize: 10 },
    });

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
              {Array.from({ length: 5 }, (_, i) => (
                <MenuItem key={i} value={new Date().getFullYear() - 2 + i}>
                  {new Date().getFullYear() - 2 + i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {payslips.length > 0 && (
            <>
              <IconButton onClick={handlePrint} color="primary">
                <PrintIcon />
              </IconButton>
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
            EARNINGS
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Base Incentive</TableCell>
                  <TableCell align="right">
                    ${currentPayslip.baseIncentive?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bonuses</TableCell>
                  <TableCell align="right">
                    ${currentPayslip.bonuses?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                  <TableCell>
                    <strong>Total Earnings</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>${grossPay.toFixed(2)}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Deductions Section */}
          <Typography variant="h6" gutterBottom mt={4}>
            DEDUCTIONS
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">
                    ${currentPayslip.tax?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Other Deductions</TableCell>
                  <TableCell align="right">
                    ${currentPayslip.deductions?.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                  <TableCell>
                    <strong>Total Deductions</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      $
                      {(
                        currentPayslip.tax + currentPayslip.deductions
                      )?.toFixed(2)}
                    </strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

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
