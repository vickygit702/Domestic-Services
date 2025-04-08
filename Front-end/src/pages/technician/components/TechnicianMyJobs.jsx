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
  Button,
  Skeleton,
  Avatar,
  Stack,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Tab,
  Tabs,
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
  overflowX: "auto",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "calc(100vw - 32px)",
  },
}));

const MobileSelectContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const TechnicianMyJobs = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
  }, [dispatch, id]);

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
    [dispatch, id, refreshJobs]
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

  const handleTabChange = (event) => {
    setTabValue(event.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width="30%" height={50} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 2 }}>
      {/* Mobile Select Input */}
      <MobileSelectContainer>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Job Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={tabValue}
            label="Job Status"
            onChange={handleTabChange}
          >
            {statusTabs.map((tab, index) => (
              <MenuItem key={index} value={index}>
                {tab.label} (
                {
                  (jobDetails || []).filter((j) => j.status === tab.value)
                    .length
                }
                )
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MobileSelectContainer>

      {/* Desktop Tabs */}
      <TabsContainer>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            overflowX: "auto",
            width: "100%",
          }}
        >
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
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
                sx={{ minWidth: "unset", px: isMobile ? 1 : 2 }}
              />
            ))}
          </Tabs>
        </Box>
      </TabsContainer>

      <JobTable
        jobs={filteredJobs}
        status={statusTabs[tabValue].value}
        technicianId={id}
        getStatusColor={getStatusColor}
        handleStatusUpdate={handleStatusUpdate}
        refreshJobs={refreshJobs}
        isMobile={isMobile}
      />
    </Box>
  );
};

const JobTable = ({
  jobs,
  status,
  technicianId,
  getStatusColor,
  handleStatusUpdate,
  refreshJobs,
  isMobile,
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
        <Table sx={{ minWidth: isMobile ? 600 : "100%" }}>
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Job ID</TableCell>
              {!isMobile && (
                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              )}
              <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>

              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} hover>
                <TableCell>#{job.id.slice(-6)}</TableCell>
                {!isMobile && (
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                      >
                        {job.user?.user_name?.charAt(0) || "U"}
                      </Avatar>
                      <Box>
                        <Typography variant="body2">
                          {job.user?.user_name || "N/A"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {job.user?.user_contact || "No contact"}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                )}
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {job.servicename}
                  </Typography>
                  {!isMobile && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    >
                      {job.jobDetail}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(job.bookeddate.start).toLocaleDateString("en-GB")}
                  </Typography>
                  {!isMobile && (
                    <Typography variant="caption" color="text.secondary">
                      {new Date(job.bookeddate.start).toLocaleTimeString(
                        "en-US",
                        {
                          timeZone: "UTC",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </Typography>
                  )}
                </TableCell>

                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {job.status === "Completed"
                      ? `$ ${job.price}`
                      : `$ ${job.est_price}`}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={job.paymentStatus ? "success.main" : "error.main"}
                  >
                    {job.paymentStatus ? "Paid" : "Pending"}
                  </Typography>
                </TableCell>

                <TableCell>
                  <StatusChip
                    label={isMobile ? job.status.substring(0, 3) : job.status}
                    color={getStatusColor(job.status)}
                    size={isMobile ? "small" : "medium"}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpen(job)}
                    sx={{
                      textTransform: "none",
                      fontSize: isMobile ? "0.7rem" : "0.875rem",
                      p: isMobile ? "4px 8px" : "6px 16px",
                    }}
                  >
                    {isMobile ? "View" : "Details"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </JobTableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={isMobile ? "xs" : "md"}
        fullWidth
        fullScreen={isMobile}
        sx={{
          "& .MuiDialog-paper": {
            width: isMobile ? "95%" : "100%",
            maxWidth: isMobile ? "none" : "md",
            margin: isMobile ? "15px" : "32px",
            borderRadius: isMobile ? "8px" : "12px",
          },
        }}
      >
        {selectedJob && (
          <>
            <DialogTitle
              sx={{
                p: isMobile ? 1.5 : 2,
                "& .MuiStack-root": {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: isMobile ? 1 : 2,
                },
              }}
            >
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: isMobile ? 32 : 40,
                    height: isMobile ? 32 : 40,
                  }}
                >
                  {selectedJob.user?.user_name?.charAt(0) || "U"}
                </Avatar>
                <Box>
                  <Typography
                    variant={isMobile ? "body1" : "h6"}
                    component="div"
                  >
                    {selectedJob.servicename}
                  </Typography>
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    color="text.secondary"
                  >
                    #{selectedJob.id.slice(-6)}
                  </Typography>
                </Box>
                <StatusChip
                  label={selectedJob.status}
                  color={getStatusColor(selectedJob.status)}
                  sx={{
                    ml: isMobile ? 0 : "auto",
                    mt: isMobile ? 1 : 0,
                  }}
                  size={isMobile ? "small" : "medium"}
                />
              </Stack>
            </DialogTitle>

            <DialogContent dividers sx={{ p: isMobile ? 1.5 : 3 }}>
              <Stack spacing={isMobile ? 2 : 3}>
                <div>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    CUSTOMER DETAILS
                  </Typography>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    {selectedJob.user?.user_name || "N/A"}
                  </Typography>
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    color="text.secondary"
                  >
                    {selectedJob.user?.user_email}
                  </Typography>
                  <Typography variant={isMobile ? "caption" : "body2"}>
                    - {selectedJob.user?.user_contact}
                  </Typography>
                </div>

                <Divider sx={{ my: isMobile ? 1 : 2 }} />

                <div>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    SERVICE DETAILS
                  </Typography>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    {selectedJob.jobDetail}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant={isMobile ? "caption" : "body2"}
                      color="text.secondary"
                    >
                      {selectedJob.status === "Confirmed" ||
                      selectedJob.status === "InProgress" ||
                      selectedJob.status === "Cancelled"
                        ? `Est. Price: $${selectedJob.est_price.toFixed(2)}`
                        : `Price: $${selectedJob.price.toFixed(2)}`}
                    </Typography>
                    <Chip
                      label={selectedJob.paymentStatus ? "Paid" : "Pending"}
                      color={selectedJob.paymentStatus ? "success" : "warning"}
                      size="small"
                    />
                  </Box>
                </div>

                <Divider sx={{ my: isMobile ? 1 : 2 }} />

                <div>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {selectedJob.status === "Completed"
                      ? "WORK DETAILS"
                      : "SCHEDULE"}
                  </Typography>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    {selectedJob.status === "Completed" ? (
                      <>
                        {new Date(
                          selectedJob.actualWorked.start
                        ).toLocaleDateString("en-GB")}{" "}
                        {new Date(
                          selectedJob.actualWorked.start
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" to "}
                        {new Date(
                          selectedJob.actualWorked.end
                        ).toLocaleDateString("en-GB")}{" "}
                        {new Date(
                          selectedJob.actualWorked.end
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </>
                    ) : (
                      <>
                        {new Date(
                          selectedJob.bookeddate.start
                        ).toLocaleDateString("en-GB")}{" "}
                        {new Date(
                          selectedJob.bookeddate.start
                        ).toLocaleTimeString("en-US", {
                          timeZone: "UTC",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </>
                    )}
                  </Typography>
                </div>
              </Stack>
            </DialogContent>

            <DialogActions
              sx={{
                flexDirection: isMobile ? "column-reverse" : "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: isMobile ? 1 : 0,
                p: isMobile ? 1.5 : 2,
              }}
            >
              <Button
                onClick={handleClose}
                fullWidth={isMobile}
                size={isMobile ? "small" : "medium"}
              >
                Close
              </Button>
              {(selectedJob.status === "InProgress" ||
                selectedJob.status === "Confirmed") && (
                <Button
                  variant="contained"
                  onClick={() => handleStatusUpdateLocal(selectedJob)}
                  fullWidth={isMobile}
                  size={isMobile ? "small" : "medium"}
                >
                  {selectedJob.status === "InProgress"
                    ? "Mark as Completed"
                    : "Start Job"}
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
