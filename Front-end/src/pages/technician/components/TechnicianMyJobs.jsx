import React, { useState, useEffect, useCallback } from "react";
import moment from "moment-timezone";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, updateJobStatus } from "../../../redux/slices/techSlice";
import { toast } from "react-toastify";
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
  const dispatch = useDispatch();
  const {
    jobDetails = [],
    loading,
    error,
  } = useSelector((state) => state.techJobs);

  const [tabValue, setTabValue] = useState(0);

  const statusTabs = [
    { label: "Confirmed", value: "Confirmed" },
    { label: "In Progress", value: "InProgress" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const refreshJobs = useCallback(() => {
    const url = `http://localhost:8000/technician/${id}/jobs/fetch-jobs`;
    dispatch(fetchJobs(url));
    console.log("job details", jobDetails);
  }, []);

  useEffect(() => {
    refreshJobs();
  }, [refreshJobs]);

  const handleStatusUpdate = useCallback(
    async (selectedJob) => {
      try {
        const url = `http://localhost:8000/technician/${id}/jobs/update-job-status`;
        await dispatch(
          updateJobStatus({
            url,
            selectedJob,
          })
        ).unwrap();
        refreshJobs();
      } catch (error) {
        console.error("Error updating job status:", error);
        toast.error("Failed to update job status");
      }
    },
    [dispatch, id]
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const filteredJobs = (jobDetails || []).filter(
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
        >
          {statusTabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {tab.label}
                  <Chip
                    label={
                      (jobDetails || []).filter((j) => j.status === tab.value)
                        .length
                    }
                    size="small"
                    sx={{ ml: 1 }}
                  />
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
            handleStatusUpdate={handleStatusUpdate} // Add this
            refreshJobs={refreshJobs}
          />
        </TabPanel>
      ))}
    </Box>
  );
};

const JobTable = ({
  jobs,
  status,
  technicianId,
  getStatusColor,
  handleStatusUpdate, // Add this prop
  refreshJobs,
  // Add this prop
}) => {
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

  const handleStatusUpdateLocal = async (selectedJob) => {
    try {
      await handleStatusUpdate(selectedJob);
      refreshJobs();
      handleClose();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

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
              <TableRow key={job.id} hover>
                <TableCell>#{job.id.slice(-6)}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {job.user?.user_name?.charAt(0) || "U"}
                    </Avatar>
                    <Box>
                      <Typography>{job.user?.user_name || "N/A"}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {job.user?.user_contact || "No contact"}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500}>{job.servicename}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.jobDetail}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {new Date(job.bookeddate.start).toLocaleDateString("en-GB")}{" "}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(job.bookeddate.start).toLocaleTimeString(
                      "en-US",
                      {
                        timeZone: "UTC",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
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
                  {selectedJob.user?.user_name?.charAt(0) || "U"}
                </Avatar>
                <Typography variant="h6">
                  {selectedJob.servicename} - #{selectedJob.id.slice(-6)}
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
                    {selectedJob.user?.user_name || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedJob.user?.user_email}
                  </Typography>
                  <Typography variant="body2">
                    {selectedJob.user?.user_contact}
                  </Typography>
                </div>

                <Divider />

                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    SERVICE DETAILS
                  </Typography>
                  <Typography>{selectedJob.jobDetail}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedJob.status === "Confirmed" ||
                    selectedJob.status === "InProgress" ||
                    selectedJob.status === "Cancelled"
                      ? `Estimated Price: ${selectedJob.est_price.toFixed(2)}`
                      : `Total Price: ${selectedJob.price.toFixed(2)}`}
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
                    {selectedJob.status === "Completed"
                      ? "WORK DETAILS"
                      : "SCHEDULE"}
                  </Typography>
                  <Typography>
                    {selectedJob.status === "Completed" ? (
                      <>
                        {new Date(
                          selectedJob.actualWorked.start
                        ).toLocaleDateString("en-GB")}
                        -
                        {new Date(
                          selectedJob.actualWorked.start
                        ).toLocaleTimeString("en-US", {
                          // timeZone: "UTC",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" to "}
                        {new Date(
                          selectedJob.actualWorked.end
                        ).toLocaleDateString("en-GB")}
                        -
                        {new Date(
                          selectedJob.actualWorked.end
                        ).toLocaleTimeString("en-US", {
                          // timeZone: "UTC",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                      </>
                    ) : selectedJob.status === "InProgress" ||
                      selectedJob.status === "Cancelled" ||
                      selectedJob.status === "Confirmed" ? (
                      <>
                        {new Date(
                          selectedJob.bookeddate.start
                        ).toLocaleDateString("en-GB")}
                        -
                        {new Date(
                          selectedJob.bookeddate.start
                        ).toLocaleTimeString("en-US", {
                          timeZone: "UTC",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </>
                    ) : null}
                    {/* {moment(selectedJob.bookeddate.start)
                      .tz("Asia/Kolkata")
                      .format("DD MMM YYYY, hh:mm A")} */}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    to{" "}
                    {new Date(selectedJob.bookeddate.end).toLocaleDateString(
                      "en-GB"
                    )}{" "}
                    -
                    {new Date(selectedJob.bookeddate.end).toLocaleTimeString(
                      "en-US",
                      {
                        timeZone: "UTC",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </Typography> */}
                </div>
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              {selectedJob.status === "InProgress" && (
                <Button
                  variant="contained"
                  onClick={() => handleStatusUpdateLocal(selectedJob)}
                  // Add any action here
                >
                  Mark as Completed
                  {/* {selectedJob.status === "Completed"
                  ? "InProgress"
                  : "Completed"} */}
                </Button>
              )}
              {selectedJob.status === "Confirmed" && (
                <Button
                  variant="contained"
                  onClick={() => handleStatusUpdateLocal(selectedJob)}
                >
                  Mark as Start
                  {/* {selectedJob.status === "Completed"
                  ? "InProgress"
                  : "Completed"} */}
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default TechnicianMyJobs;
