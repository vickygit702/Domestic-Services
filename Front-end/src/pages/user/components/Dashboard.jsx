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
//   CardContent,
//   CardMedia,
//   Chip,
//   Button,
//   Grid,
//   Box,
//   Avatar,
//   Badge,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { format, isSameDay } from "date-fns";
// import StarIcon from "@mui/icons-material/Star";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// import BookingDialogBox from "./BookingDialogBox";

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

//   const TechCard = ({ tech, setOpenAvailability }) => {
//     const bookedDates =
//       tech.bookedSlots?.map((slot) => new Date(slot.start)) || [];

//     const proBadgeStyle = {
//       position: "absolute",
//       top: 5,
//       left: 5,
//       color: "gold",
//       background: "white",
//       borderRadius: "50%",
//       p: 0.5,
//       fontSize: "1.5rem",
//       zIndex: 1000,
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
//       <Card
//         sx={{
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",

//           border: tech.isPro ? "2px solid gold" : "1px solid #e0e0e0",
//           transition: "transform 0.3s",
//           "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
//           minHeight: { xs: "auto", sm: "200px" }, // Consistent height
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             p: 2,
//             gap: 2,
//             flexDirection: { xs: "column", sm: "row" },
//             justifyContent: "space-evenly",

//             flexGrow: 1,
//           }}
//         >
//           {/* Image Section */}
//           <Box
//             sx={{
//               position: "relative",
//               width: { xs: "100%", sm: "120px" },
//               height: { xs: "160px", sm: "120px" },
//               flexShrink: 0,
//             }}
//           >
//             <CardMedia
//               component="img"
//               height="100%"
//               src={`http://localhost:8000/uploads/profile/technicians/${tech.profileImg}`}
//               alt={tech.tech_name}
//               sx={{ borderRadius: 2, objectFit: "cover" }}
//             />
//             {tech.isPro && <WorkspacePremiumIcon sx={proBadgeStyle} />}
//           </Box>

//           {/* Details Section */}
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography variant="h8" sx={{ fontWeight: 600 }}>
//               {tech.tech_name}
//             </Typography>
//             {/* <Typography
//             variant="subtitle2"
//             color="text.secondary"
//             sx={{ minWidth: "130px" }}
//             gutterBottom
//           >
//             {tech.worksKnown?.join(", ")}
//           </Typography> */}
//             <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//               <StarIcon sx={{ color: "orange", mr: 0.5, fontSize: "0.6rem" }} />
//               <Typography variant="body2">
//                 {tech.tech_ratingAvg?.toFixed(1)} ({tech.jobsCompleted} jobs)
//               </Typography>
//             </Box>
//             <Box sx={{ mb: 1 }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   flexWrap: "wrap",
//                   gap: 0.5,
//                 }}
//               >
//                 {tech.worksKnown.slice(0, 2).map((skill, index) => (
//                   <Chip
//                     key={index}
//                     label={skill}
//                     size="small"
//                     variant="outlined"
//                   />
//                 ))}
//               </Box>
//             </Box>
//           </Box>
//         </Box>

//         {/* Action Buttons */}
//         <Box
//           sx={{
//             p: 1,
//             display: "flex",
//             gap: 2,
//             borderTop: "1px solid #f0f0f0",
//           }}
//         >
//           <Button
//             variant="outlined"
//             fullWidth
//             size="small"
//             onClick={() => {
//               setOpenAvailability(true);
//               setSelectedTech(tech);
//               setTileContent(() => tileContent);
//             }}
//           >
//             Check Availability
//           </Button>
//           <Button
//             variant="contained"
//             fullWidth
//             size="small"
//             onClick={() => handleBooking(tech)}
//           >
//             Book Now
//           </Button>
//         </Box>
//       </Card>
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
//           console.log(techInfo);
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
//     console.log(bookingData);
//     dispatch(bookServicePremiumUser(bookingData));
//   };

//   // Pro badge style

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

//   return (
//     <div className="container-fluid px-4">
//       {/* Premium Banner */}
//       <div className="row mb-4">
//         <div className="col-12">
//           <div
//             className="card border-0 shadow-sm overflow-hidden bg-gradient"
//             style={{
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
//                   <button className="btn btn-light rounded-pill px-4 fw-bold">
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
//           <h3
//             className="fw-bold mb-4 text-gradient"
//             style={{
//               textAlign: "center",
//               backgroundImage:
//                 "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Our Services
//           </h3>

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
//       {/* subscribed users */}

//       {user.usertype === "premium" && (
//         <div className="row mb-4">
//           <div className="col-12">
//             <h3
//               className="fw-bold mb-4 text-gradient"
//               style={{
//                 textAlign: "center",
//                 backgroundImage:
//                   "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Recommended Technicians
//             </h3>

//             <Grid
//               container
//               // spacing={3}
//               justifyContent={{ xs: "center", sm: "flex-start" }}
//               alignItems="center"
//             >
//               {techInfo.map((tech) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={4}
//                   sx={[
//                     { mb: 2 }, // xs
//                     { "@media (min-width:600px)": { ml: 5.5, p: 2 } }, // sm and up
//                   ]}
//                   key={tech._id}
//                 >
//                   <TechCard
//                     tech={tech}
//                     setOpenAvailability={setOpenAvailability}
//                     handleBooking={handleBooking}
//                     setSelectedTech={setSelectedTech}
//                     setTileContent={setTileContent}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </div>
//         </div>
//       )}

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
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               mb: 3,
//             }}
//           >
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
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 mr: 2,
//               }}
//             >
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
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
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

//  for styling improvement:

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
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// import BookingDialogBox from "./BookingDialogBox";

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
//       <Card
//         sx={{
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           border: tech.isPro ? "2px solid gold" : "1px solid #e0e0e0",
//           transition: "transform 0.3s, box-shadow 0.3s",
//           "&:hover": {
//             transform: "translateY(-5px)",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           },
//           maxHeight: { xs: "auto", sm: "250px" },
//           borderRadius: "12px",
//           overflow: "hidden",
//         }}
//       >
//         <Box
//           sx={{
//             position: "relative",
//             width: { xs: "100%", sm: "100%" },
//             height: { xs: "120px", sm: "140px" },
//             flexShrink: 0,
//             overflow: "hidden",
//             "& img": {
//               transition: "transform 0.3s ease",
//             },
//             "&:hover img": {
//               transform: "scale(1.05)",
//             },
//           }}
//         >
//           <CardMedia
//             component="img"
//             height="100%"
//             src={`http://localhost:8000/uploads/profile/technicians/${tech.profileImg}`}
//             alt={tech.tech_name}
//             sx={{
//               borderRadius: 0,
//               objectFit: "cover",
//               width: "100%",
//               height: "100%",
//             }}
//           />
//           {tech.isPro && <WorkspacePremiumIcon sx={proBadgeStyle} />}
//         </Box>

//         <Box
//           sx={{
//             flexGrow: 2,
//             p: 2,
//             display: "flex",
//             // flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Box>
//             <Typography
//               variant="h8"
//               sx={{
//                 fontWeight: 600,
//                 mb: 1,
//                 color: "text.primary",
//               }}
//             >
//               {tech.tech_name}
//             </Typography>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
//               <StarIcon
//                 sx={{
//                   color: "warning.main",
//                   mr: 0.5,
//                   fontSize: "1rem",
//                 }}
//               />
//               <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                 {tech.tech_ratingAvg?.toFixed(1)} ({tech.jobsCompleted} jobs)
//               </Typography>
//             </Box>

//             <Box sx={{ mb: 2 }}>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{ mb: 1 }}
//               >
//                 Skills:
//               </Typography>
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                 {tech.worksKnown.slice(0, 3).map((skill, index) => (
//                   <Chip
//                     key={index}
//                     label={skill}
//                     size="small"
//                     variant="outlined"
//                     sx={{
//                       fontSize: "0.65rem",
//                       borderRadius: "4px",
//                       borderColor: "divider",
//                       color: "text.secondary",
//                     }}
//                   />
//                 ))}
//               </Box>
//             </Box>
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             p: 2,
//             display: "flex",
//             gap: 2,
//             borderTop: "1px solid",
//             borderColor: "divider",
//             backgroundColor: "background.paper",
//           }}
//         >
//           <Button
//             variant="outlined"
//             fullWidth
//             size="small"
//             sx={{
//               textTransform: "none",
//               fontWeight: 500,
//               borderRadius: "6px",
//               py: 1,
//             }}
//             onClick={() => {
//               setOpenAvailability(true);
//               setSelectedTech(tech);
//               setTileContent(() => tileContent);
//             }}
//           >
//             Check Availability
//           </Button>
//           <Button
//             variant="contained"
//             fullWidth
//             size="small"
//             sx={{
//               textTransform: "none",
//               fontWeight: 500,
//               borderRadius: "6px",
//               py: 1,
//               boxShadow: "none",
//               "&:hover": {
//                 boxShadow: "none",
//                 backgroundColor: "primary.dark",
//               },
//             }}
//             onClick={() => handleBooking(tech)}
//           >
//             Book Now
//           </Button>
//         </Box>
//       </Card>
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
//             className="card border-0 shadow-sm overflow-hidden bg-gradient"
//             style={{
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
//                       borderColor: "#6a11cb",
//                       textAlign: "center",
//                       backgroundImage:
//                         "linear-gradient(45deg,rgb(203, 17, 138) 0%,rgb(9, 187, 119) 100%)",
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
//           {/* <h3
//             className="fw-bold mb-4 text-gradient"
//             style={{
//               textAlign: "center",
//               backgroundImage:
//                 "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Our Services
//           </h3> */}
//           <Typography
//             variant="h5"
//             sx={{
//               textAlign: "center",
//               mb: 4,
//               fontWeight: 700,
//               background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//               position: "relative",
//               "&:after": {
//                 content: '""',
//                 position: "absolute",
//                 bottom: -8,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 width: "80px",
//                 height: "4px",
//                 background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
//                 borderRadius: "2px",
//               },
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

//       {/* Recommended Technicians */}
//       {user.usertype === "premium" && (
//         <div className="row mb-4">
//           <div className="col-12">
//             <Typography
//               variant="h5"
//               sx={{
//                 textAlign: "center",
//                 mb: 4,
//                 fontWeight: 700,
//                 background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//                 position: "relative",
//                 "&:after": {
//                   content: '""',
//                   position: "absolute",
//                   bottom: -8,
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   width: "80px",
//                   height: "4px",
//                   background:
//                     "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
//                   borderRadius: "2px",
//                 },
//               }}
//             >
//               Recommended Technicians
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
//                 spacing={3}
//                 sx={{
//                   px: { xs: 2, sm: 3 },
//                   py: 1,
//                   justifyContent: { xs: "center", md: "flex-start" },
//                 }}
//               >
//                 {techInfo.map((tech) => (
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     md={4}
//                     lg={3}
//                     key={tech._id}
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
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
      background: "rgba(255,255,255,0.9)",
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
                      color: "rgb(4, 129, 254)",

                      borderRadius: "50%",

                      fontSize: "1.3rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                )}
              </div>
              <div className="luxury-badge">
                <StarIcon
                  sx={{ color: "#ffc107", fontSize: "0.9rem", mr: 0.5 }}
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
                  Skills:
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
                        backgroundColor: "#c4c1c0",
                        borderRadius: "4px",
                        borderColor: "divider",
                        color: "text.secondary",
                      }}
                    />
                  ))}
                </Box>
              </div>
              <div className="luxury-divider"></div>
              <div className="luxury-footer">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: "6px",
                    flex: 1,
                  }}
                  onClick={() => {
                    setOpenAvailability(true);
                    setSelectedTech(tech);
                    setTileContent(() => tileContent);
                  }}
                >
                  Check Availability
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
                    background:
                      "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #5a0cb3 0%, #1a65e0 100%)",
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
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;

            height: 100%;
            min-width: 300px;
            border: 1px solid #e0e0e0;
          }

          .luxury-card.pro-card {
            border: 2px solid gold;
          }

          .luxury-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
          }

          .luxury-card-header {
            position: relative;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .luxury-icon {
            position: relative;
            width: 60px;
            height: 60px;
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
            background: rgba(0, 0, 0, 0.05);
            padding: 4px 8px;
            border-radius: 16px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
          }

          .luxury-card-body {
            padding: 0 16px 16px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }

          .luxury-title {
            font-size: 1.2rem;
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
            background: #eee;
            margin: 12px 0;
          }

          .luxury-footer {
            display: flex;
            justify-content: space-between;
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
    <div className="container-fluid px-4">
      {/* Premium Banner */}
      <div className="row mb-4">
        <div className="col-12">
          <div
            className="card border-0 shadow-sm overflow-hidden "
            style={{
              background:
                "linear-gradient(135deg,rgb(123, 145, 241) 0%,rgb(149, 97, 200) 100%)",
            }}
          >
            <div className="card-body p-4 ">
              <div className="row align-items-center">
                <div className="col-md-8 text-black ">
                  <h2 className="fw-bold mb-3">Upgrade to Premium</h2>
                  <p className="mb-4">
                    Get exclusive benefits, priority support, and special
                    discounts
                  </p>
                  <button
                    className="btn btn-light rounded-pill px-4 fw-bold"
                    style={{
                      borderColor: "rgb(251, 255, 1) ",
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
      <div className="row mb-4">
        <div className="col-12">
          {/* <h3
            className="fw-bold mb-4 text-gradient"
            style={{
              textAlign: "center",
              backgroundImage:
                "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Services
          </h3> */}
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 4,
              fontWeight: 700,
              background:
                "linear-gradient(60deg,rgb(247, 187, 35) 0%,rgb(22, 99, 230) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Services
          </Typography>

          <div className="row g-4">
            {filteredCategory.map((service, index) => (
              <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 border-0 shadow-sm hover-shadow transition-all service-card"
                  onClick={() => handleServiceClick(service)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className="bg-light bg-opacity-10 rounded-circle p-3 mb-3 mx-auto"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "rgba(13, 110, 253, 0.1)",
                      }}
                    >
                      <i
                        className={`bi ${categoryIcons[service]} fs-3 text-primary`}
                      ></i>
                    </div>
                    <h5 className="card-title fw-bold mb-0">{service}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Technicians */}
      {user.usertype === "premium" && (
        <div className="row mb-4">
          <div className="col-12">
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                mb: 4,
                fontWeight: 700,
                background:
                  "linear-gradient(60deg,rgb(247, 187, 35) 0%,rgb(22, 99, 230) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Recommended Technicians
            </Typography>

            {loadingTech ? (
              <Grid container spacing={3}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
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
                spacing={3}
                sx={{
                  px: { xs: 2, sm: 1 },
                  py: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                {techInfo.map((tech) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={tech._id}
                    sx={{
                      display: "grid",
                      gridTemplate: "repeat(3, 1fr)",
                      px: { sm: 4.3 },
                      py: { sm: 1 },
                      justifyContent: "flex-start",
                    }}
                  >
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
          transition: all 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
