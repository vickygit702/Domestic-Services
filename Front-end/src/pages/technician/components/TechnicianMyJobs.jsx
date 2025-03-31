import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Tabs,
  Tab,
  Box,
  Button,
  Skeleton,
  Avatar,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "capitalize",
  borderRadius: 8,
}));

const JobTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  overflow: "hidden",
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const TechnicianMyJobs = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  const statusTabs = [
    { label: "Confirmed", value: "Confirmed" },
    { label: "In Progress", value: "InProgress" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/technician/${id}/jobs`
        );
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [id]);

  const filteredJobs = jobs.filter(
    (job) => job.status === statusTabs[tabValue].value
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Cancelled":
        return "error";
      case "InProgress":
        return "warning";
      default:
        return "primary";
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="text" width="30%" height={50} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        My Jobs
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {statusTabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {tab.label}
                  <Box
                    sx={{
                      ml: 1,
                      px: 1,
                      py: 0.5,
                      bgcolor: "action.selected",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  >
                    {jobs.filter((j) => j.status === tab.value).length}
                  </Box>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {statusTabs.map((tab, index) => (
        <TabPanel key={index} value={tabValue} index={index}>
          <JobTable
            jobs={filteredJobs}
            status={tab.value}
            technicianId={id}
            getStatusColor={getStatusColor}
          />
        </TabPanel>
      ))}
    </Box>
  );
};

const JobTable = ({ jobs, status, technicianId, getStatusColor }) => {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };
  // if (jobs.length === 0) {
  //   return (
  //     <Box
  //       sx={{
  //         p: 4,
  //         textAlign: "center",
  //         border: "1px dashed",
  //         borderColor: "divider",
  //         borderRadius: 2,
  //       }}
  //     >
  //       <Typography variant="body1" color="text.secondary">
  //         No {status.toLowerCase()} jobs found
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <>
      <JobTableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Job ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id} hover>
                <TableCell>#{job._id.slice(-6)}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {job.user_Id?.user_name?.charAt(0) || "U"}
                    </Avatar>
                    <Box>
                      <Typography>{job.user_Id?.user_name || "N/A"}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {job.user_Id?.user_contact || "No contact"}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500}>{job.serviceName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.workDetail}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {new Date(job.bookedDate.start).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(job.bookedDate.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500}>
                    ${job.est_price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={job.paymentStatus ? "success.main" : "error.main"}
                  >
                    {job.paymentStatus ? "Paid" : "Pending"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusChip
                    label={job.status}
                    color={getStatusColor(job.status)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    onClick={() => handleOpen(job)}
                    // to={`/technician/${technicianId}/jobs/${job._id}/details`}
                    sx={{ textTransform: "none" }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </JobTableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedJob && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {selectedJob.user_Id?.user_name?.charAt(0) || "U"}
                </Avatar>
                <Typography variant="h6">
                  {selectedJob.serviceName} - #{selectedJob._id.slice(-6)}
                </Typography>
                <StatusChip
                  label={selectedJob.status}
                  color={getStatusColor(selectedJob.status)}
                  sx={{ ml: "auto" }}
                />
              </Stack>
            </DialogTitle>

            <DialogContent dividers>
              <Stack spacing={3}>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    CUSTOMER DETAILS
                  </Typography>
                  <Typography>
                    {selectedJob.user_Id?.user_name || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedJob.user_Id?.user_email}
                  </Typography>
                  <Typography variant="body2">
                    {selectedJob.user_Id?.user_contact}
                  </Typography>
                </div>

                <Divider />

                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    SERVICE DETAILS
                  </Typography>
                  <Typography>{selectedJob.workDetail}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estimated Price: ${selectedJob.est_price.toFixed(2)}
                  </Typography>
                  <Chip
                    label={
                      selectedJob.paymentStatus ? "Paid" : "Payment Pending"
                    }
                    color={selectedJob.paymentStatus ? "success" : "warning"}
                    size="small"
                  />
                </div>

                <Divider />

                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    SCHEDULE
                  </Typography>
                  <Typography>
                    {new Date(selectedJob.bookedDate.start).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    to {new Date(selectedJob.bookedDate.end).toLocaleString()}
                  </Typography>
                </div>
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button
                variant="contained"
                onClick={() => {
                  // Add any action here
                  handleClose();
                }}
              >
                Mark as{" "}
                {selectedJob.status === "Completed"
                  ? "InProgress"
                  : "Completed"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default TechnicianMyJobs;
