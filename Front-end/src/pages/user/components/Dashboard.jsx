//--------------------------------------------------------------old code------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
//       background: "rgba(242, 90, 90, 0.9)",
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
//                       color: "rgba(248, 136, 72, 0.99)",

//                       borderRadius: "50%",

//                       fontSize: "1.3rem",
//                       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//                     }}
//                   />
//                 )}
//               </div>
//               <div className="luxury-badge">
//                 <StarIcon
//                   sx={{
//                     color: "rgba(2, 102, 104, 0.99)",
//                     fontSize: "0.9rem",
//                     mr: 0.5,
//                   }}
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
//                   SKILLS:
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
//                         backgroundColor: "#fafafa",
//                         borderRadius: "4px",
//                         borderColor: "divider",
//                         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                         color: "#000",
//                       }}
//                     />
//                   ))}
//                 </Box>
//               </div>
//               <div className="luxury-divider"></div>
//               <div className="luxury-footer">
//                 <Button
//                   // variant="outlined"
//                   variant="contained"
//                   size="small"
//                   sx={{
//                     textTransform: "none",
//                     fontWeight: 500,
//                     borderRadius: "6px",
//                     flex: 1,
//                     color: "#000",
//                     background: "rgb(255, 255, 255)",
//                     "&:hover": {
//                       background: "rgba(185, 245, 245, 0.77)",
//                     },
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
//                     color: "#000",
//                     background: "rgb(255, 255, 255)",
//                     "&:hover": {
//                       background: "rgb(218, 240, 193)",
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
//             background: rgb(255, 255, 255);
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
//             background: rgba(255, 255, 255, 0.82);
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
//             background: rgb(234, 237, 233);
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
//             background: #000;
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
//       <div className=" row mb-4">
//         <div className="col-12">
//           <div
//             className="card border-0 shadow-sm overflow-hidden "
//             style={{
//               background:
//                 "linear-gradient(105deg,rgb(248, 248, 175) 0%,rgb(130, 241, 215) 100%)",
//             }}
//           >
//             <div className="card-body p-4 ">
//               <div className="row align-items-center">
//                 <div className="col-md-8 text-black ">
//                   <h2 className="banner-h1 fw-bold mb-3">Upgrade to Premium</h2>
//                   <p className="banner-p mb-4">
//                     Get exclusive benefits, priority support, and special
//                     discounts
//                   </p>
//                   <button
//                     className="banner-btn btn btn-light rounded-pill px-4 fw-bold"
//                     style={{
//                       borderColor: "rgb(249, 5, 5) ",
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
//               mb: { xs: 2, md: 4 },
//               fontSize: { xs: "16px" },
//               fontWeight: { xs: 600, md: 700 },
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
//                       className="tools-circle rounded-circle p-3 mb-3 mx-auto"
//                       style={{
//                         width: "80px",
//                         height: "80px",
//                         backgroundColor: "rgba(243, 244, 246, 0.98)",
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

//         background-color:rgba(252, 253, 253, 0.91);
//           transition: all 0.3s ease;
//         }
//         .service-card:hover {

//          background-color:rgba(241, 248, 247, 0.81);
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//         }
//         @media (max-width: 767.98px) {

//         .banner-h1{
//         font-size:15px;
//         }
//         .banner-p{
//         font-size:12px;
//         }
//         .banner-btn{
//         font-size:10px;
//         }
//         .card-title{
//         font-size:13px;
//         }
//         .tools-circle{
//         width:30px;
//         height:30px;
//         }
//         }
//       `}</style>
//     </div>
//   );
// };

//---------------------------------------------------------------------------gap issue--------------------------------

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
//       background: "rgba(242, 90, 90, 0.9)",
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
//                       color: "rgba(248, 136, 72, 0.99)",
//                       borderRadius: "50%",
//                       fontSize: "1.3rem",
//                       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//                     }}
//                   />
//                 )}
//               </div>
//               <div className="luxury-badge">
//                 <StarIcon
//                   sx={{
//                     color: "rgba(2, 102, 104, 0.99)",
//                     fontSize: "0.9rem",
//                     mr: 0.5,
//                   }}
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
//                   sx={{
//                     fontSize: { xs: "0.5rem", md: "0.7rem" },
//                     mb: { xs: 1, md: 2 },
//                   }}
//                 >
//                   SKILLS:
//                 </Typography>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                   {tech.worksKnown.slice(0, 3).map((skill, index) => (
//                     <Chip
//                       key={index}
//                       label={skill}
//                       size="small"
//                       variant="outlined"
//                       sx={{
//                         fontSize: { xs: "0.5rem", md: "0.65rem" },
//                         backgroundColor: "#fafafa",
//                         borderRadius: "4px",
//                         borderColor: "divider",
//                         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                         color: "#000",
//                       }}
//                     />
//                   ))}
//                 </Box>
//               </div>
//               <div className="luxury-divider"></div>
//               <div className="luxury-footer">
//                 <Button
//                   variant="contained"
//                   sx={{
//                     textTransform: "none",
//                     fontWeight: 500,
//                     fontSize: { xs: "0.7rem", md: "0.9rem" },
//                     borderRadius: "6px",
//                     flex: 1,
//                     color: "#000",
//                     background: "rgb(255, 255, 255)",
//                     "&:hover": {
//                       background: "rgba(185, 245, 245, 0.77)",
//                     },
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
//                   sx={{
//                     textTransform: "none",
//                     fontSize: { xs: "0.7rem", md: "0.9rem" },
//                     fontWeight: 500,
//                     borderRadius: "6px",
//                     flex: 1,
//                     ml: 1,
//                     color: "#000",
//                     background: "rgb(255, 255, 255)",
//                     "&:hover": {
//                       background: "rgb(218, 240, 193)",
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
//             background: rgb(255, 255, 255);
//             border-radius: 12px;
//             overflow: hidden;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//             transition: all 0.3s ease;
//             display: flex;
//             flex-direction: column;
//             height: 100%;
//             min-width: 270px;
//             border: 1px solid #e0e0e0;
//             margin: 0 auto;
//           }

//           .luxury-card.pro-card {
//             border: 2px solid gold;
//           }

//           .luxury-card:hover {
//             background: rgba(255, 255, 255, 0.82);
//             transform: translateY(-5px);
//             box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
//           }

//           .luxury-card-header {
//             position: relative;
//             padding: 12px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//           }

//           .luxury-icon {
//             position: relative;
//             width: 50px;
//             height: 50px;
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
//             background: rgb(234, 237, 233);
//             padding: 4px 8px;
//             border-radius: 16px;
//             font-size: 0.8rem;
//             display: flex;
//             align-items: center;
//           }

//           .luxury-card-body {
//             padding: 0 12px 12px;
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
//           }

//           .luxury-divider {
//             margin: 1rem 0;
//             height: 1px;
//             background: #000;
//           }

//           .luxury-footer {
//             display: flex;
//             justify-content: space-between;
//           }

//           @media (max-width: 599.98px) {
//             .luxury-card {
//               min-width: auto;
//             }
//             .luxury-card-header {
//               padding: 8px;
//             }

//             .luxury-icon {
//               width: 40px;
//               height: 40px;
//             }
//             .luxury-title {
//               font-size: 0.7rem;
//               margin: 4px 0 8px;
//             }
//             .luxury-badge {
//               font-size: 0.7rem;
//               padding: 2px 6px;
//             }

//             .luxury-card-body {
//               padding: 0 8px 8px;
//             }
//             .luxury-divider {
//               margin: 5px 0;
//             }

//             .luxury-footer button {
//               font-size: 0.7rem;
//               padding: 4px 8px;
//             }
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
//     <div className="container-fluid px-3 px-sm-4">
//       {/* Premium Banner */}
//       <div className="row mb-3 mb-sm-4">
//         <div className="col-12">
//           <div
//             className="card border-0 shadow-sm overflow-hidden"
//             style={{
//               background:
//                 "linear-gradient(105deg,rgb(248, 248, 175) 0%,rgb(130, 241, 215) 100%)",
//             }}
//           >
//             <div className="card-body p-3 p-sm-4">
//               <div className="row align-items-center">
//                 <div className="col-md-8 text-black">
//                   <h2 className="banner-h1 fw-bold mb-2 mb-sm-3">
//                     Upgrade to Premium
//                   </h2>
//                   <p className="banner-p mb-3 mb-sm-4">
//                     Get exclusive benefits, priority support, and special
//                     discounts
//                   </p>
//                   <button
//                     className="banner-btn btn btn-light rounded-pill px-3 px-sm-4 fw-bold"
//                     style={{
//                       borderColor: "rgb(249, 5, 5)",
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
//       <div className="row mb-3 mb-sm-4">
//         <div className="col-12">
//           <Typography
//             variant="h5"
//             sx={{
//               textAlign: "center",
//               mb: { xs: 2, md: 3 },
//               fontSize: { xs: "1rem", sm: "1.5rem" },
//               fontWeight: { xs: 600, md: 700 },
//             }}
//           >
//             Our Services
//           </Typography>

//           <div className="row g-2 g-sm-3">
//             {filteredCategory.map((service, index) => (
//               <div key={index} className="col-4 col-sm-6 col-md-4 col-lg-3">
//                 <div
//                   className="card h-100 border-0 shadow-sm hover-shadow transition-all service-card"
//                   onClick={() => handleServiceClick(service)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="card-body text-center p-2 p-sm-4">
//                     <div
//                       className="tools-circle rounded-circle p-sm-3 mb-2 mb-sm-3 mx-auto"
//                       style={{
//                         width: "80px",
//                         height: "80px",
//                         backgroundColor: "rgba(243, 244, 246, 0.98)",
//                       }}
//                     >
//                       <i
//                         className={`bi ${categoryIcons[service]} text-primary`}
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

//       {/* Technicians */}
//       {user.usertype === "premium" && (
//         <div className="row mb-3 mb-sm-4">
//           <div className="col-12">
//             <Typography
//               variant="h5"
//               sx={{
//                 textAlign: "center",
//                 mb: { xs: 2, md: 3 },
//                 fontWeight: 700,
//                 fontSize: { xs: "1rem", sm: "1.5rem" },
//               }}
//             >
//               Technicians Profile
//             </Typography>

//             {loadingTech ? (
//               <Grid container spacing={2}>
//                 {[1, 2, 3, 4].map((item) => (
//                   <Grid item xs={4} sm={6} md={4} lg={3} key={item}>
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
//                 spacing={1}
//                 sx={{
//                   px: { xs: 1, md: 5 },
//                   py: 1,
//                   justifyContent: { xs: "center", md: "flex-start" },
//                 }}
//               >
//                 {techInfo.map((tech) => (
//                   <Grid item xs={4} sm={6} md={4} lg={3} key={tech._id}>
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
//           background-color:rgba(252, 253, 253, 0.91);
//           transition: all 0.3s ease;
//         }
//         .service-card:hover {
//           background-color:rgba(241, 248, 247, 0.81);
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
//         }
//         .tools-circle i{
//             font-size:2rem;

//         }

//         @media (max-width: 767.98px) {
//           .banner-h1 {
//             font-size: 1.1rem;
//           }
//           .banner-p {
//             font-size: 0.8rem;
//           }
//           .banner-btn {
//             font-size: 0.7rem;
//             padding: 0.25rem 0.75rem;
//           }
//           .tools-circle {
//             width: 40px !important;
//             height: 40px !important;
//           }
//           .card-title {
//             font-size: 0.7rem;
//           }
//         }

//         @media (max-width: 575.98px) {
//           .luxury-card {
//             min-height: 220px;
//           }
//           .card-title{
//             font-size: 0.7rem;
//           }
//           .tools-circle{
//             padding:0.3rem;
//             width: 35px !important;
//             height: 35px !important;
//           }
//           .tools-circle i{
//             font-size:0.9rem;
//           }
//           .service-card .card-body {
//             padding: 0.5rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { useState, useEffect } from "react";
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
  CardMedia,
  Chip,
  Button,
  Grid,
  Box,
  Skeleton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookingDialogBox from "./BookingDialogBox";
import { motion, AnimatePresence } from "framer-motion";

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

    const proBadgeStyle = {
      position: "absolute",
      top: 8,
      left: 8,
      color: "gold",
      background: "rgba(242, 90, 90, 0.9)",
      borderRadius: "50%",
      p: 0.5,
      fontSize: "1.5rem",
      zIndex: 1,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    };

    const tileContent = ({ date, view }) => {
      if (view === "month") {
        const isBooked = bookedDates.some((bookedDate) =>
          isSameDay(bookedDate, date)
        );
        return isBooked ? (
          <div
            style={{
              height: "6px",
              width: "6px",
              backgroundColor: "red",
              borderRadius: "50%",
              margin: "2px auto",
            }}
          />
        ) : null;
      }
    };

    return (
      <>
        <motion.div
          key={tech.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="col-md-6 col-lg-4"
        >
          <div className={`luxury-card ${tech.isPro ? "pro-card" : ""}`}>
            <div className="luxury-card-header">
              <div className="luxury-icon">
                <img
                  src={`http://localhost:8000/uploads/profile/technicians/${tech.profileImg}`}
                  alt={tech.tech_name}
                  className="tech-profile-img"
                />
                {tech.isPro && (
                  <VerifiedIcon
                    sx={{
                      position: "absolute",
                      top: -4,
                      right: -18,
                      color: "rgba(248, 136, 72, 0.99)",
                      borderRadius: "50%",
                      fontSize: "1.3rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                )}
              </div>
              <div className="luxury-badge">
                <StarIcon
                  sx={{
                    color: "rgba(2, 102, 104, 0.99)",
                    fontSize: "0.9rem",
                    mr: 0.5,
                  }}
                />
                {tech.tech_ratingAvg?.toFixed(1)} ({tech.jobsCompleted} jobs)
              </div>
            </div>
            <div className="luxury-card-body">
              <h3 className="luxury-title">{tech.tech_name}</h3>
              <div className="luxury-description">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  SKILLS:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {tech.worksKnown.slice(0, 3).map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: "0.65rem",
                        backgroundColor: "#fafafa",
                        borderRadius: "4px",
                        borderColor: "divider",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        color: "#000",
                      }}
                    />
                  ))}
                </Box>
              </div>
              <div className="luxury-divider"></div>
              <div className="luxury-footer">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: "6px",
                    flex: 1,
                    color: "#000",
                    background: "rgb(255, 255, 255)",
                    "&:hover": {
                      background: "rgba(185, 245, 245, 0.77)",
                    },
                  }}
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
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: "6px",
                    flex: 1,
                    ml: 1,
                    color: "#000",
                    background: "rgb(255, 255, 255)",
                    "&:hover": {
                      background: "rgb(218, 240, 193)",
                    },
                  }}
                  onClick={() => handleBooking(tech)}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        <style jsx>{`
          .luxury-card {
            background: rgb(255, 255, 255);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            height: 100%;
            min-width: 270px;
            border: 1px solid #e0e0e0;
            margin: 0 auto;
          }

          .luxury-card.pro-card {
            border: 2px solid gold;
          }

          .luxury-card:hover {
            background: rgba(255, 255, 255, 0.82);
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          }

          .luxury-card-header {
            position: relative;
            padding: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .luxury-icon {
            position: relative;
            width: 50px;
            height: 50px;
          }

          .tech-profile-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .luxury-badge {
            background: rgb(234, 237, 233);
            padding: 4px 8px;
            border-radius: 16px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
          }

          .luxury-card-body {
            padding: 0 12px 12px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }

          .luxury-title {
            font-size: 1rem;
            font-weight: 600;
            margin: 8px 0 12px;
            color: #333;
          }

          .luxury-description {
            flex-grow: 1;
            margin-bottom: 12px;
          }

          .luxury-divider {
            height: 1px;
            background: #000;
            margin: 12px 0;
          }

          .luxury-footer {
            display: flex;
            justify-content: space-between;
          }

          @media (max-width: 599.98px) {
            .luxury-card {
              min-width: auto;
            }
            .luxury-card-header {
              padding: 8px;
            }

            .luxury-icon {
              width: 40px;
              height: 40px;
            }

            .luxury-badge {
              font-size: 0.7rem;
              padding: 2px 6px;
            }

            .luxury-card-body {
              padding: 0 8px 8px;
            }

            .luxury-footer button {
              font-size: 0.7rem;
              padding: 4px 8px;
            }
          }
        `}</style>
      </>
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

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <div className="alert alert-danger mx-4">Error: {error}</div>;

  return (
    <div className="container-fluid px-3 px-sm-4">
      {/* Premium Banner */}
      <div className="row mb-3 mb-sm-4">
        <div className="col-12">
          <div
            className="card border-0 shadow-sm overflow-hidden"
            style={{
              background:
                "linear-gradient(105deg,rgb(248, 248, 175) 0%,rgb(130, 241, 215) 100%)",
            }}
          >
            <div className="card-body p-3 p-sm-4">
              <div className="row align-items-center">
                <div className="col-md-8 text-black">
                  <h2 className="banner-h1 fw-bold mb-2 mb-sm-3">
                    Upgrade to Premium
                  </h2>
                  <p className="banner-p mb-3 mb-sm-4">
                    Get exclusive benefits, priority support, and special
                    discounts
                  </p>
                  <button
                    className="banner-btn btn btn-light rounded-pill px-3 px-sm-4 fw-bold"
                    style={{
                      borderColor: "rgb(249, 5, 5)",
                      textAlign: "center",
                      backgroundImage:
                        "linear-gradient(45deg,rgb(229, 12, 153) 0%,rgb(0, 59, 37) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Subscribe Now <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="row mb-3 mb-sm-4">
        <div className="col-12">
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: { xs: 2, md: 4 },
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              fontWeight: { xs: 600, md: 700 },
            }}
          >
            Our Services
          </Typography>

          <div className="row g-2 g-sm-3">
            {filteredCategory.map((service, index) => (
              <div key={index} className="col-4 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 border-0 shadow-sm hover-shadow transition-all service-card"
                  onClick={() => handleServiceClick(service)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center p-2 p-sm-3">
                    <div
                      className="tools-circle rounded-circle p-2 p-sm-3 mb-2 mb-sm-3 mx-auto"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "rgba(243, 244, 246, 0.98)",
                      }}
                    >
                      <i
                        className={`bi ${categoryIcons[service]} fs-4 text-primary`}
                      ></i>
                    </div>
                    <h5
                      className="card-title fw-bold mb-0"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {service}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technicians */}
      {user.usertype === "premium" && (
        <div className="row mb-3 mb-sm-4">
          <div className="col-12">
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                mb: 3,
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              Technicians Profile
            </Typography>

            {loadingTech ? (
              <Grid container spacing={2}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={4} sm={6} md={4} lg={3} key={item}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={200}
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid
                container
                spacing={1}
                sx={{
                  px: { xs: 1 },
                  py: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                {techInfo.map((tech) => (
                  <Grid item xs={4} sm={6} md={4} lg={3} key={tech._id}>
                    <TechCard tech={tech} />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </div>
      )}

      {/* Availability Dialog */}
      <Dialog
        open={openAvailability}
        onClose={handleCloseAvailability}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedTech?.tech_name}'s Availability
          <IconButton
            aria-label="close"
            onClick={handleCloseAvailability}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Calendar tileContent={tileContent} minDate={new Date()} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography variant="body2">Booked</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
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

      <style>{`
        .service-card {
          background-color:rgba(252, 253, 253, 0.91);
          transition: all 0.3s ease;
        }
        .service-card:hover {
          background-color:rgba(241, 248, 247, 0.81);
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        @media (max-width: 767.98px) {
          .banner-h1 {
            font-size: 1.1rem;
          }
          .banner-p {
            font-size: 0.8rem;
          }
          .banner-btn {
            font-size: 0.7rem;
            padding: 0.25rem 0.75rem;
          }
          .tools-circle {
            width: 40px !important;
            height: 40px !important;
          }
          .card-title {
            font-size: 0.7rem;
          }
        }
        
        @media (max-width: 575.98px) {
          .luxury-card {
            min-height: 180px;
          }
          .service-card .card-body {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
