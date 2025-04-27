// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchServices } from "../../../redux/slices/servicesSlice";
// import { bookServicePremiumUser } from "../../../redux/slices/userSlice";
// import {
//   Card,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Typography,
//   CardMedia,
//   Chip,
//   Button,
//   Grid,
//   Box,
//   Skeleton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { format, isSameDay } from "date-fns";
// import StarIcon from "@mui/icons-material/Star";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import BookingDialogBox from "./BookingDialogBox";
// import { motion, AnimatePresence } from "framer-motion";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openAvailability, setOpenAvailability] = useState(false);
//   const [techInfo, setTechInfo] = useState([]);
//   const [tileContent, setTileContent] = useState(null);
//   const [loadingTech, setLoadingTech] = useState(false);
//   const [techError, setTechError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTech, setSelectedTech] = useState(null);
//   const { user } = useSelector((state) => state.auth);
//   const { serviceList, categories, loading, error } = useSelector(
//     (state) => state.services
//   );

//   const TechCard = ({ tech }) => {
//     const bookedDates =
//       tech.bookedSlots?.map((slot) => new Date(slot.start)) || [];

//     const proBadgeStyle = {
//       position: "absolute",
//       top: 8,
//       left: 8,
//       color: "gold",
//       background: "rgba(255,255,255,0.9)",
//       borderRadius: "50%",
//       p: 0.5,
//       fontSize: "1.5rem",
//       zIndex: 1,
//       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//     };

//     const tileContent = ({ date, view }) => {
//       if (view === "month") {
//         const isBooked = bookedDates.some((bookedDate) =>
//           isSameDay(bookedDate, date)
//         );
//         return isBooked ? (
//           <div
//             style={{
//               height: "6px",
//               width: "6px",
//               backgroundColor: "red",
//               borderRadius: "50%",
//               margin: "2px auto",
//             }}
//           />
//         ) : null;
//       }
//     };

//     return (
//       <>
//         <motion.div
//           key={tech.id}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ duration: 0.3 }}
//           className="col-md-6 col-lg-4"
//         >
//           <div className={`luxury-card ${tech.isPro ? "pro-card" : ""}`}>
//             <div className="luxury-card-header">
//               <div className="luxury-icon">
//                 <img
//                   src={`http://localhost:8000/uploads/profile/technicians/${tech.profileImg}`}
//                   alt={tech.tech_name}
//                   className="tech-profile-img"
//                 />
//                 {tech.isPro && (
//                   <VerifiedIcon
//                     sx={{
//                       position: "absolute",
//                       top: -4,
//                       right: -18,
//                       color: "rgb(4, 129, 254)",

//                       borderRadius: "50%",

//                       fontSize: "1.3rem",
//                       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//                     }}
//                   />
//                 )}
//               </div>
//               <div className="luxury-badge">
//                 <StarIcon
//                   sx={{ color: "#de1695", fontSize: "0.9rem", mr: 0.5 }}
//                 />
//                 {tech.tech_ratingAvg?.toFixed(1)} ({tech.jobsCompleted} jobs)
//               </div>
//             </div>
//             <div className="luxury-card-body">
//               <h3 className="luxury-title">{tech.tech_name}</h3>
//               <div className="luxury-description">
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Skills:
//                 </Typography>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                   {tech.worksKnown.slice(0, 3).map((skill, index) => (
//                     <Chip
//                       key={index}
//                       label={skill}
//                       size="small"
//                       variant="outlined"
//                       sx={{
//                         fontSize: "0.65rem",
//                         backgroundColor: "#faf0b9",
//                         borderRadius: "4px",
//                         borderColor: "divider",
//                         color: "text.secondary",
//                       }}
//                     />
//                   ))}
//                 </Box>
//               </div>
//               <div className="luxury-divider"></div>
//               <div className="luxury-footer">
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   sx={{
//                     textTransform: "none",
//                     fontWeight: 500,
//                     borderRadius: "6px",
//                     flex: 1,
//                   }}
//                   onClick={() => {
//                     setOpenAvailability(true);
//                     setSelectedTech(tech);
//                     setTileContent(() => tileContent);
//                   }}
//                 >
//                   Availability
//                 </Button>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   sx={{
//                     textTransform: "none",
//                     fontWeight: 500,
//                     borderRadius: "6px",
//                     flex: 1,
//                     ml: 1,
//                     background:
//                       "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
//                     "&:hover": {
//                       background:
//                         "linear-gradient(45deg, #5a0cb3 0%, #1a65e0 100%)",
//                     },
//                   }}
//                   onClick={() => handleBooking(tech)}
//                 >
//                   Book Now
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//         <style jsx>{`
//           .luxury-card {
//             background: white;
//             border-radius: 12px;
//             overflow: hidden;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//             transition: all 0.3s ease;
//             display: flex;
//             flex-direction: column;

//             height: 100%;
//             min-width: 270px;
//             border: 1px solid #e0e0e0;
//           }

//           .luxury-card.pro-card {
//             border: 2px solid gold;
//           }

//           .luxury-card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
//           }

//           .luxury-card-header {
//             position: relative;
//             padding: 16px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//           }

//           .luxury-icon {
//             position: relative;
//             width: 60px;
//             height: 60px;
//           }

//           .tech-profile-img {
//             width: 100%;
//             height: 100%;
//             border-radius: 50%;
//             object-fit: cover;
//             border: 2px solid white;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           }

//           .luxury-badge {
//             background: rgba(0, 0, 0, 0.05);
//             padding: 4px 8px;
//             border-radius: 16px;
//             font-size: 0.8rem;
//             display: flex;
//             align-items: center;
//           }

//           .luxury-card-body {
//             padding: 0 16px 16px;
//             flex-grow: 1;
//             display: flex;
//             flex-direction: column;
//           }

//           .luxury-title {
//             font-size: 1.2rem;
//             font-weight: 600;
//             margin: 8px 0 12px;
//             color: #333;
//           }

//           .luxury-description {
//             flex-grow: 1;
//             margin-bottom: 12px;
//           }

//           .luxury-divider {
//             height: 1px;
//             background: #eee;
//             margin: 12px 0;
//           }

//           .luxury-footer {
//             display: flex;
//             justify-content: space-between;
//           }
//         `}</style>
//       </>
//     );
//   };

//   useEffect(() => {
//     const fetchTechnicians = async () => {
//       if (user.usertype === "premium") {
//         setLoadingTech(true);
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/user/${user.id}/services/fetchAllTechnicians`
//           );
//           setTechInfo(response.data.techDetails);
//           setLoadingTech(false);
//         } catch (err) {
//           setTechError(err.message);
//           setLoadingTech(false);
//         }
//       }
//     };
//     fetchTechnicians();
//   }, [user.id, user.usertype]);

//   useEffect(() => {
//     const url = `http://localhost:8000/user/${user.id}/services/fetchAllServices`;
//     dispatch(fetchServices(url));
//   }, [dispatch]);

//   const handleCloseAvailability = () => {
//     setOpenAvailability(false);
//   };

//   const handleBooking = (tech) => {
//     setSelectedTech(tech);
//     setIsModalOpen(true);
//   };

//   const handleBookSubmit = (bookingData) => {
//     dispatch(bookServicePremiumUser(bookingData));
//   };

//   const handleServiceClick = (category) => {
//     const formattedTitle = category
//       .toLowerCase()
//       .replace(/ & /g, "_")
//       .replace(/\s+/g, "-");
//     navigate(`/my-project/user/${user.id}/dashboard/${formattedTitle}`);
//   };

//   const filteredCategory = categories.filter((service) =>
//     service.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const categoryIcons = {
//     "Home Repair & Maintenance": "bi-tools",
//     "Outdoor & Home Improvement": "bi-house-door",
//     "Appliance & Gadget Services": "bi-plug",
//     "Health & Wellness": "bi-heart-pulse",
//     "Education & Tutoring": "bi-book",
//     "Event Planning": "bi-calendar-event",
//     "Pet Care": "bi-hospital",
//     "Professional Services": "bi-briefcase",
//   };

//   if (loading)
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "50vh" }}
//       >
//         <div
//           className="spinner-border text-primary"
//           style={{ width: "3rem", height: "3rem" }}
//           role="status"
//         >
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );

//   if (error)
//     return <div className="alert alert-danger mx-4">Error: {error}</div>;

//   return (
//     <div className="container-fluid px-4">
//       {/* Premium Banner */}
//       <div className="row mb-4">
//         <div className="col-12">
//           <div
//             className="card border-0 shadow-sm overflow-hidden "
//             style={{
//               background:
//                 "linear-gradient(135deg,rgb(123, 145, 241) 0%,rgb(149, 97, 200) 100%)",
//             }}
//           >
//             <div className="card-body p-4 ">
//               <div className="row align-items-center">
//                 <div className="col-md-8 text-black ">
//                   <h2 className="fw-bold mb-3">Upgrade to Premium</h2>
//                   <p className="mb-4">
//                     Get exclusive benefits, priority support, and special
//                     discounts
//                   </p>
//                   <button
//                     className="btn btn-light rounded-pill px-4 fw-bold"
//                     style={{
//                       borderColor: "rgb(251, 255, 1) ",
//                       textAlign: "center",
//                       backgroundImage:
//                         "linear-gradient(45deg,rgb(229, 12, 153) 0%,rgb(0, 59, 37) 100%)",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                     }}
//                   >
//                     Subscribe Now <i className="bi bi-arrow-right ms-2"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Services Section */}
//       <div className="row mb-4">
//         <div className="col-12">
//           <Typography
//             variant="h5"
//             sx={{
//               textAlign: "center",
//               mb: 4,
//               fontWeight: 700,
//               background:
//                 "linear-gradient(60deg,rgb(247, 187, 35) 0%,rgb(22, 99, 230) 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//             }}
//           >
//             Our Services
//           </Typography>

//           <div className="row g-4">
//             {filteredCategory.map((service, index) => (
//               <div key={index} className="col-sm-6 col-md-4 col-lg-3">
//                 <div
//                   className="card h-100 border-0 shadow-sm hover-shadow transition-all service-card"
//                   onClick={() => handleServiceClick(service)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="card-body text-center p-4">
//                     <div
//                       className="bg-light bg-opacity-10 rounded-circle p-3 mb-3 mx-auto"
//                       style={{
//                         width: "80px",
//                         height: "80px",
//                         backgroundColor: "rgba(13, 110, 253, 0.1)",
//                       }}
//                     >
//                       <i
//                         className={`bi ${categoryIcons[service]} fs-3 text-primary`}
//                       ></i>
//                     </div>
//                     <h5 className="card-title fw-bold mb-0">{service}</h5>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/*  Technicians */}
//       {user.usertype === "premium" && (
//         <div className="row mb-4">
//           <div className="col-12">
//             <Typography
//               variant="h5"
//               sx={{
//                 textAlign: "center",
//                 mb: 3,
//                 fontWeight: 700,
//                 background:
//                   "linear-gradient(60deg,rgb(247, 187, 35) 0%,rgb(22, 99, 230) 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               Technicians Profile
//             </Typography>

//             {loadingTech ? (
//               <Grid container spacing={3}>
//                 {[1, 2, 3, 4].map((item) => (
//                   <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
//                     <Skeleton
//                       variant="rectangular"
//                       width="100%"
//                       height={200}
//                       sx={{ borderRadius: 2 }}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Grid
//                 container
//                 spacing={2}
//                 sx={{
//                   px: { xs: 2 },
//                   py: 1,
//                   justifyContent: { xs: "center", md: "flex-start" },
//                 }}
//               >
//                 {techInfo.map((tech) => (
//                   <Grid
//                     xs={12}
//                     sm={6}
//                     md={4}
//                     lg={3}
//                     key={tech._id}
//                     sx={{
//                       display: "grid",
//                       gridTemplate: "repeat(4, 1fr)",

//                       justifyContent: "flex-start",
//                     }}
//                   >
//                     <TechCard tech={tech} />
//                   </Grid>
//                 ))}
//               </Grid>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Availability Dialog */}
//       <Dialog
//         open={openAvailability}
//         onClose={handleCloseAvailability}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           {selectedTech?.tech_name}'s Availability
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseAvailability}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent sx={{ p: 3 }}>
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//             <Calendar tileContent={tileContent} minDate={new Date()} />
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 2,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
//               <Box
//                 sx={{
//                   width: "10px",
//                   height: "10px",
//                   backgroundColor: "red",
//                   borderRadius: "50%",
//                   mr: 1,
//                 }}
//               />
//               <Typography variant="body2">Booked</Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Box
//                 sx={{
//                   width: "10px",
//                   height: "10px",
//                   backgroundColor: "green",
//                   borderRadius: "50%",
//                   mr: 1,
//                 }}
//               />
//               <Typography variant="body2">Available</Typography>
//             </Box>
//           </Box>
//         </DialogContent>
//       </Dialog>

//       <BookingDialogBox
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         selectedData={selectedTech}
//         user={user}
//         onBookSubmit={handleBookSubmit}
//         type="technician"
//       />

//       <style>{`
//         .service-card {
//           transition: all 0.3s ease;
//         }
//         .service-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//         }
//         .text-gradient {
//           background-clip: text;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "../../../redux/slices/servicesSlice";
import { bookServicePremiumUser } from "../../../redux/slices/userSlice";
import {
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Chip,
  Button,
  Grid,
  Box,
  Skeleton,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookingDialogBox from "./BookingDialogBox";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import UpgradeIcon from "@mui/icons-material/Upgrade";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [openAvailability, setOpenAvailability] = useState(false);
  const [techInfo, setTechInfo] = useState([]);
  const [tileContent, setTileContent] = useState(null);
  const [loadingTech, setLoadingTech] = useState(false);
  const [techError, setTechError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { serviceList, categories, loading, error } = useSelector(
    (state) => state.services
  );

  const TechCard = ({ tech }) => {
    const bookedDates =
      tech.bookedSlots?.map((slot) => new Date(slot.start)) || [];

    const tileContent = ({ date, view }) => {
      if (view === "month") {
        const isBooked = bookedDates.some((bookedDate) =>
          isSameDay(bookedDate, date)
        );
        return isBooked ? <div className="booked-dot" /> : null;
      }
    };

    return (
      <motion.div
        key={tech.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="tech-card"
      >
        <div className={`tech-card-inner ${tech.isPro ? "pro-tech" : ""}`}>
          <div className="tech-card-header">
            <div className="tech-avatar">
              <img
                src={`http://localhost:8000/uploads/profile/technicians/${tech.profileImg}`}
                alt={tech.tech_name}
              />
              {tech.isPro && (
                <div className="pro-badge">
                  <VerifiedIcon />
                </div>
              )}
            </div>
            <div className="tech-rating">
              <StarIcon className="star-icon" />
              <span>{tech.tech_ratingAvg?.toFixed(1)}</span>
              <span className="jobs-count">({tech.jobsCompleted} jobs)</span>
            </div>
          </div>

          <div className="tech-card-body">
            <h3 className="tech-name">{tech.tech_name}</h3>
            <div className="tech-skills">
              <Typography variant="caption" className="skills-label">
                Skills:
              </Typography>
              <div className="skills-container">
                {tech.worksKnown.slice(0, 3).map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    className="skill-chip"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="tech-card-footer">
            <Button
              variant="outlined"
              className="availability-btn"
              onClick={() => {
                setOpenAvailability(true);
                setSelectedTech(tech);
                setTileContent(() => tileContent);
              }}
            >
              Availability
            </Button>
            <Button
              variant="contained"
              className="book-btn"
              onClick={() => handleBooking(tech)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  useEffect(() => {
    const fetchTechnicians = async () => {
      if (user.usertype === "premium") {
        setLoadingTech(true);
        try {
          const response = await axios.get(
            `http://localhost:8000/user/${user.id}/services/fetchAllTechnicians`
          );
          setTechInfo(response.data.techDetails);
          setLoadingTech(false);
        } catch (err) {
          setTechError(err.message);
          setLoadingTech(false);
        }
      }
    };
    fetchTechnicians();
  }, [user.id, user.usertype]);

  useEffect(() => {
    const url = `http://localhost:8000/user/${user.id}/services/fetchAllServices`;
    dispatch(fetchServices(url));
  }, [dispatch]);

  const handleCloseAvailability = () => {
    setOpenAvailability(false);
  };

  const handleBooking = (tech) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const handleBookSubmit = (bookingData) => {
    dispatch(bookServicePremiumUser(bookingData));
  };

  const handleServiceClick = (category) => {
    const formattedTitle = category
      .toLowerCase()
      .replace(/ & /g, "_")
      .replace(/\s+/g, "-");
    navigate(`/my-project/user/${user.id}/dashboard/${formattedTitle}`);
  };

  const filteredCategory = categories.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryIcons = {
    "Home Repair & Maintenance": "bi-tools",
    "Outdoor & Home Improvement": "bi-house-door",
    "Appliance & Gadget Services": "bi-plug",
    "Health & Wellness": "bi-heart-pulse",
    "Education & Tutoring": "bi-book",
    "Event Planning": "bi-calendar-event",
    "Pet Care": "bi-hospital",
    "Professional Services": "bi-briefcase",
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-alert">Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      {/*  Services Section */}
      <Typography variant="h5" className="section-title">
        Our Services
      </Typography>
      <div className="services-section ">
        <div className="services-grid">
          {filteredCategory.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="service-card"
              onClick={() => handleServiceClick(service)}
            >
              <div className="service-icon">
                <i className={`bi ${categoryIcons[service]}`}></i>
              </div>
              <h3>{service}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technicians Section */}

      <div className="technicians-section">
        <Typography variant="h5" className="section-title">
          Technicians Profile
        </Typography>

        {loadingTech ? (
          <div className="technicians-grid">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                className="tech-skeleton"
              />
            ))}
          </div>
        ) : (
          <div className="technicians-grid">
            <AnimatePresence>
              {techInfo.map((tech) => (
                <TechCard key={tech._id} tech={tech} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Availability Dialog */}
      <Dialog
        open={openAvailability}
        onClose={handleCloseAvailability}
        maxWidth="sm"
        fullWidth
        className="availability-dialog"
      >
        <DialogTitle className="dialog-title">
          {selectedTech?.tech_name}'s Availability
          <IconButton
            aria-label="close"
            onClick={handleCloseAvailability}
            className="close-btn"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Box className="calendar-container">
            <Calendar
              tileContent={tileContent}
              minDate={new Date()}
              className="availability-calendar"
            />
          </Box>
          <Box className="legend-container">
            <Box className="legend-item">
              <Box className="booked-legend" />
              <Typography variant="body2">Booked</Typography>
            </Box>
            <Box className="legend-item">
              <Box className="available-legend" />
              <Typography variant="body2">Available</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <BookingDialogBox
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedData={selectedTech}
        user={user}
        onBookSubmit={handleBookSubmit}
        type="technician"
      />

      {/* CSS Styles */}
      <style jsx global>{`
        :root {
          --primary: #6a11cb;
          --secondary: #2575fc;
          --accent: #ff6b6b;
          --light: #f8f9fa;
          --dark: #212529;
          --success: #38ef7d;
          --warning: #ffc107;
          --info: #17a2b8;
          --gradient: linear-gradient(
            45deg,
            var(--primary) 0%,
            var(--secondary) 100%
          );
        }

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Premium Banner */
        .premium-banner {
          background: var(--gradient);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(106, 17, 203, 0.2);
          color: white;
        }

        .premium-content {
          display: flex;
          align-items: center;
          padding: 2rem;
          position: relative;
        }

        .premium-text {
          flex: 1;
          z-index: 2;
        }

        .premium-text h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .premium-text p {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .upgrade-icon {
          font-size: 2.5rem !important;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .upgrade-btn {
          background: white !important;
          color: var(--primary) !important;
          font-weight: 600 !important;
          padding: 0.75rem 2rem !important;
          border-radius: 50px !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.3s ease !important;
        }

        .upgrade-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
        }

        .premium-graphic {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 40%;
          background: url("/premium-bg.svg") no-repeat right center;
          background-size: contain;
          opacity: 0.3;
        }

        /* Services Section */
        .services-section {
          margin-bottom: 2rem;
        }

        .section-title {
          color: black;
          font-weight: 700 !important;
          margin-bottom: 1.3rem !important;
          text-align: center;
        }

        .search-field {
          margin-bottom: 2rem;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .search-field .MuiOutlinedInput-root {
          border-radius: 12px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2.5rem;
        }

        .service-card {
          background: white;
          border-radius: 12px;
          padding: 2rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .service-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(106, 17, 203, 0.1);
          border-radius: 50%;
        }

        .service-icon i {
          font-size: 2rem;
          color: var(--primary);
        }

        .service-card h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
          color: var(--dark);
        }

        /* Technicians Section */
        .technicians-section {
          margin-bottom: 3rem;
        }

        .technicians-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .tech-card {
          perspective: 1000px;
        }

        .tech-card-inner {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .pro-tech {
          border: 2px solid gold;
          position: relative;
        }

        .pro-tech::before {
          content: "PRO";
          position: absolute;
          top: 10px;
          right: 10px;
          background: gold;
          color: #333;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          z-index: 2;
        }

        .tech-card-inner:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        .tech-card-header {
          position: relative;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tech-avatar {
          position: relative;
          width: 70px;
          height: 70px;
        }

        .tech-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .pro-badge {
          position: absolute;
          bottom: -5px;
          right: -5px;
          background: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .pro-badge svg {
          color: var(--primary);
          font-size: 1rem;
        }

        .tech-rating {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.03);
          padding: 0.5rem 0.8rem;
          border-radius: 50px;
          font-size: 0.9rem;
        }

        .star-icon {
          color: #ffc107;
          margin-right: 0.3rem;
          font-size: 1rem !important;
        }

        .jobs-count {
          opacity: 0.7;
          margin-left: 0.3rem;
        }

        .tech-card-body {
          padding: 0 1.5rem 1.5rem;
          flex-grow: 1;
        }

        .tech-name {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 1rem;
          color: var(--dark);
        }

        .tech-skills {
          margin-bottom: 1rem;
        }

        .skills-label {
          display: block;
          margin-bottom: 0.5rem;
          color: #6c757d;
          font-weight: 500;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-chip {
          background: rgba(106, 17, 203, 0.1) !important;
          border-color: rgba(106, 17, 203, 0.2) !important;
          color: var(--primary) !important;
          font-size: 0.7rem !important;
          font-weight: 500 !important;
        }

        .tech-card-footer {
          display: flex;
          padding: 0 1.5rem 1.5rem;
          gap: 0.8rem;
        }

        .availability-btn {
          flex: 1;
          border-radius: 8px !important;
          text-transform: none !important;
          font-weight: 500 !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
        }

        .book-btn {
          flex: 1;
          background: var(--gradient) !important;
          color: white !important;
          border-radius: 8px !important;
          text-transform: none !important;
          font-weight: 500 !important;
          box-shadow: none !important;
          transition: all 0.3s ease !important;
        }

        .book-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(106, 17, 203, 0.3) !important;
        }

        /* Availability Dialog */
        .availability-dialog .MuiPaper-root {
          border-radius: 16px !important;
          overflow: hidden;
        }

        .dialog-title {
          background: var(--gradient);
          color: white !important;
          padding: 1.5rem !important;
          font-weight: 600 !important;
        }

        .close-btn {
          position: absolute !important;
          right: 12px;
          top: 12px;
          color: white !important;
        }

        .dialog-content {
          padding: 2rem !important;
        }

        .calendar-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .availability-calendar {
          border: none;
          width: 100%;
          max-width: 400px;
        }

        .availability-calendar .react-calendar__tile--active {
          background: var(--primary) !important;
          color: white !important;
        }

        .availability-calendar .react-calendar__tile--now {
          background: rgba(106, 17, 203, 0.1);
        }

        .booked-dot {
          height: 6px;
          width: 6px;
          background-color: #ff4757;
          border-radius: 50%;
          margin: 2px auto;
        }

        .legend-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .booked-legend {
          width: 12px;
          height: 12px;
          background: #ff4757;
          border-radius: 50%;
        }

        .available-legend {
          width: 12px;
          height: 12px;
          background: #2ed573;
          border-radius: 50%;
        }

        /* Loading States */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(106, 17, 203, 0.1);
          border-radius: 50%;
          border-top-color: var(--primary);
          animation: spin 1s ease-in-out infinite;
        }

        .tech-skeleton {
          height: 300px;
          border-radius: 16px;
        }

        /* Error State */
        .error-alert {
          background: #ffebee;
          color: #c62828;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem;
          text-align: center;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }

          .premium-content {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem 1rem;
          }

          .premium-graphic {
            position: relative;
            width: 100%;
            height: 120px;
            margin-top: 1rem;
          }

          .premium-text h2 {
            font-size: 1.5rem;
          }

          .services-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }

          .technicians-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
