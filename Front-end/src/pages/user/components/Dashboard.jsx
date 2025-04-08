// import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchServices } from "../../../redux/slices/servicesSlice";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const { user } = useSelector((state) => state.auth);
//   const { serviceList, categories, loading, error } = useSelector(
//     (state) => state.services
//   );

//   useEffect(() => {
//     const url = `http://localhost:8000/user/${user.id}/services/fetchAllServices`;
//     dispatch(fetchServices(url));
//   }, [dispatch]);

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
//       {/* Search Bar */}
//       <div className="row mb-4">
//         <div className="col-md-8 mx-auto">
//           <div className="input-group shadow-sm">
//             <span className="input-group-text bg-white border-end-0">
//               <i className="bi bi-search text-muted"></i>
//             </span>
//             <input
//               type="text"
//               className="form-control border-start-0 py-2"
//               placeholder="Search services..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button className="btn btn-primary px-4">Search</button>
//           </div>
//         </div>
//       </div>

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

//       {/* Recent Bookings */}
//       <div className="row">
//         <div className="col-12">
//           <div className="card border-0 shadow-sm">
//             <div className="card-header bg-white border-0">
//               <h5 className="fw-bold mb-0">Recent Bookings</h5>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table table-hover align-middle">
//                   <thead>
//                     <tr>
//                       <th>Service</th>
//                       <th>Technician</th>
//                       <th>Date</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Plumbing</td>
//                       <td>John Smith</td>
//                       <td>May 15, 2023</td>
//                       <td>
//                         <span className="badge bg-success">Completed</span>
//                       </td>
//                       <td>
//                         <button className="btn btn-sm btn-outline-primary">
//                           Details
//                         </button>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Electrical</td>
//                       <td>Sarah Johnson</td>
//                       <td>May 18, 2023</td>
//                       <td>
//                         <span className="badge bg-warning text-dark">
//                           Pending
//                         </span>
//                       </td>
//                       <td>
//                         <button className="btn btn-sm btn-outline-primary">
//                           Details
//                         </button>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

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

// import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchServices } from "../../../redux/slices/servicesSlice";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Chip,
//   Button,
//   Grid,
//   Box,
//   Avatar,
//   Badge,
// } from "@mui/material";
// import StarIcon from "@mui/icons-material/Star";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const { user } = useSelector((state) => state.auth);
//   const { serviceList, categories, loading, error } = useSelector(
//     (state) => state.services
//   );

//   useEffect(() => {
//     const url = `http://localhost:8000/user/${user.id}/services/fetchAllServices`;
//     dispatch(fetchServices(url));
//   }, [dispatch]);

//   const [technicians, setTechnicians] = useState([
//     {
//       id: 1,
//       name: "John Smith",
//       profileImage: "/default-profile.jpg",
//       specialization: "Plumbing Specialist",
//       ratingAverage: 4.5,
//       reviewCount: 42,
//       isPro: true,
//       skills: [
//         "Pipe Repair",
//         "Leak Detection",
//         "Water Heater",
//         "Drain Cleaning",
//       ],
//     },
//     {
//       id: 2,
//       name: "Sarah Johnson",
//       profileImage: "/default-profile.jpg",
//       specialization: "Electrical Engineer",
//       ratingAverage: 4.8,
//       reviewCount: 35,
//       isPro: true,
//       skills: ["Wiring", "Circuit Repair", "Panel Installation"],
//     },
//     {
//       id: 3,
//       name: "Sarah Johnson",
//       profileImage: "/default-profile.jpg",
//       specialization: "Electrical Engineer",
//       ratingAverage: 4.8,
//       reviewCount: 35,
//       isPro: true,
//       skills: ["Wiring", "Circuit Repair", "Panel Installation"],
//     },
//     {
//       id: 4,
//       name: "Sarah Johnson",
//       profileImage: "/default-profile.jpg",
//       specialization: "Electrical Engineer",
//       ratingAverage: 4.8,
//       reviewCount: 35,
//       isPro: true,
//       skills: ["Wiring", "Circuit Repair", "Panel Installation"],
//     },
//     {
//       id: 5,
//       name: "Sarah Johnson",
//       profileImage: "/default-profile.jpg",
//       specialization: "Electrical Engineer",
//       ratingAverage: 4.8,
//       reviewCount: 35,
//       isPro: true,
//       skills: ["Wiring", "Circuit Repair", "Panel Installation"],
//     },
//     {
//       id: 6,
//       name: "Sarah Johnson",
//       profileImage: "/default-profile.jpg",
//       specialization: "Electrical Engineer",
//       ratingAverage: 4.8,
//       reviewCount: 35,
//       isPro: true,
//       skills: ["Wiring", "Circuit Repair", "Panel Installation"],
//     },
//   ]);

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
//       {/* Search Bar */}
//       {/* <div className="row mb-4">
//         <div className="col-md-8 mx-auto">
//           <div className="input-group shadow-sm">
//             <span className="input-group-text bg-white border-end-0">
//               <i className="bi bi-search text-muted"></i>
//             </span>
//             <input
//               type="text"
//               className="form-control border-start-0 py-2"
//               placeholder="Search services..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button className="btn btn-primary px-4">Search</button>
//           </div>
//         </div>
//       </div> */}

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
//               {technicians.slice(0, 5).map((tech) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={4}
//                   sx={[
//                     { mb: 2 }, // xs
//                     { "@media (min-width:600px)": { ml: 5.5, p: 2 } }, // sm and up
//                   ]}
//                   key={tech.id}
//                 >
//                   <TechCard tech={tech} />
//                 </Grid>
//               ))}
//             </Grid>
//           </div>
//         </div>
//       )}
//       {/* Recent Bookings */}
//       {/* <div className="row">
//         <div className="col-12">
//           <div className="card border-0 shadow-sm">
//             <div className="card-header bg-white border-0">
//               <h5 className="fw-bold mb-0">Recent Bookings</h5>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table table-hover align-middle">
//                   <thead>
//                     <tr>
//                       <th>Service</th>
//                       <th>Technician</th>
//                       <th>Date</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Plumbing</td>
//                       <td>John Smith</td>
//                       <td>May 15, 2023</td>
//                       <td>
//                         <span className="badge bg-success">Completed</span>
//                       </td>
//                       <td>
//                         <button className="btn btn-sm btn-outline-primary">
//                           Details
//                         </button>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Electrical</td>
//                       <td>Sarah Johnson</td>
//                       <td>May 18, 2023</td>
//                       <td>
//                         <span className="badge bg-warning text-dark">
//                           Pending
//                         </span>
//                       </td>
//                       <td>
//                         <button className="btn btn-sm btn-outline-primary">
//                           Details
//                         </button>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}

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

// const TechCard = ({ tech }) => (
//   <Card
//     sx={{
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",

//       border: tech.isPro ? "2px solid gold" : "1px solid #e0e0e0",
//       transition: "transform 0.3s",
//       "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
//       minHeight: { xs: "auto", sm: "200px" }, // Consistent height
//     }}
//   >
//     <Box
//       sx={{
//         display: "flex",
//         p: 2,
//         gap: 2,
//         flexDirection: { xs: "column", sm: "row" },
//         justifyContent: "space-evenly",

//         flexGrow: 1,
//       }}
//     >
//       {/* Image Section */}
//       <Box
//         sx={{
//           position: "relative",
//           width: { xs: "100%", sm: "120px" },
//           height: { xs: "160px", sm: "120px" },
//           flexShrink: 0,
//         }}
//       >
//         <CardMedia
//           component="img"
//           height="100%"
//           src={`http://localhost:8000/uploads/profile/technicians/67dd700f658c76b69e6b8c43-1743481078261.jpg`}
//           alt={tech.name}
//           sx={{ borderRadius: 2, objectFit: "cover" }}
//         />
//         {tech.isPro && <WorkspacePremiumIcon sx={proBadgeStyle} />}
//       </Box>

//       {/* Details Section */}
//       <Box sx={{ flexGrow: 1 }}>
//         <Typography variant="h8" sx={{ fontWeight: 600 }}>
//           {tech.name}
//         </Typography>
//         <Typography
//           variant="subtitle2"
//           color="text.secondary"
//           sx={{ minWidth: "130px" }}
//           gutterBottom
//         >
//           {tech.specialization}
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//           <StarIcon sx={{ color: "orange", mr: 0.5, fontSize: "0.6rem" }} />
//           <Typography variant="body2">
//             {tech.ratingAverage.toFixed(1)} ({tech.reviewCount} reviews)
//           </Typography>
//         </Box>
//         <Box sx={{ mb: 1 }}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               flexWrap: "wrap",
//               gap: 0.5,
//             }}
//           >
//             {tech.skills.slice(0, 2).map((skill, index) => (
//               <Chip key={index} label={skill} size="small" variant="outlined" />
//             ))}
//           </Box>
//         </Box>
//       </Box>
//     </Box>

//     {/* Action Buttons */}
//     <Box
//       sx={{
//         p: 1,
//         display: "flex",
//         gap: 2,
//         borderTop: "1px solid #f0f0f0",
//       }}
//     >
//       <Button variant="outlined" fullWidth size="small">
//         Check Availability
//       </Button>
//       <Button variant="contained" fullWidth size="small">
//         Book Now
//       </Button>
//     </Box>
//   </Card>
// );

// // Pro badge style
// const proBadgeStyle = {
//   position: "absolute",
//   top: 5,
//   left: 5,
//   color: "gold",
//   background: "white",
//   borderRadius: "50%",
//   p: 0.5,
//   fontSize: "1.5rem",
// };

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "../../../redux/slices/servicesSlice";
import {
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Grid,
  Box,
  Avatar,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [openAvailability, setOpenAvailability] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { serviceList, categories, loading, error } = useSelector(
    (state) => state.services
  );

  const [bookedDates, setBookedDates] = useState([
    new Date(2025, 4, 15),
    new Date(2025, 4, 18),
    new Date(2025, 4, 22),
  ]);

  const handleOpenAvailability = (tech) => {
    setSelectedTech(tech);
    setOpenAvailability(true);

    // In a real app, you would fetch the technician's booked dates here
    // Example:
    // fetch(`/api/technicians/${tech.id}/bookings`)
    //   .then(res => res.json())
    //   .then(dates => setBookedDates(dates))
  };

  const handleCloseAvailability = () => {
    setOpenAvailability(false);
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
  const TechCard = ({ tech }) => (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",

        border: tech.isPro ? "2px solid gold" : "1px solid #e0e0e0",
        transition: "transform 0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
        minHeight: { xs: "auto", sm: "200px" }, // Consistent height
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 2,
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-evenly",

          flexGrow: 1,
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: "120px" },
            height: { xs: "160px", sm: "120px" },
            flexShrink: 0,
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            src={`http://localhost:8000/uploads/profile/technicians/67dd700f658c76b69e6b8c43-1743481078261.jpg`}
            alt={tech.name}
            sx={{ borderRadius: 2, objectFit: "cover" }}
          />
          {tech.isPro && <WorkspacePremiumIcon sx={proBadgeStyle} />}
        </Box>

        {/* Details Section */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h8" sx={{ fontWeight: 600 }}>
            {tech.name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ minWidth: "130px" }}
            gutterBottom
          >
            {tech.specialization}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <StarIcon sx={{ color: "orange", mr: 0.5, fontSize: "0.6rem" }} />
            <Typography variant="body2">
              {tech.ratingAverage.toFixed(1)} ({tech.reviewCount} reviews)
            </Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {tech.skills.slice(0, 2).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          gap: 2,
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          size="small"
          onClick={() => handleOpenAvailability(tech)}
        >
          Check Availability
        </Button>
        <Button variant="contained" fullWidth size="small">
          Book Now
        </Button>
      </Box>
    </Card>
  );

  // Pro badge style
  const proBadgeStyle = {
    position: "absolute",
    top: 5,
    left: 5,
    color: "gold",
    background: "white",
    borderRadius: "50%",
    p: 0.5,
    fontSize: "1.5rem",
  };

  useEffect(() => {
    const url = `http://localhost:8000/user/${user.id}/services/fetchAllServices`;
    dispatch(fetchServices(url));
  }, [dispatch]);

  const [technicians, setTechnicians] = useState([
    {
      id: 1,
      name: "John Smith",
      profileImage: "/default-profile.jpg",
      specialization: "Plumbing Specialist",
      ratingAverage: 4.5,
      reviewCount: 42,
      isPro: true,
      skills: [
        "Pipe Repair",
        "Leak Detection",
        "Water Heater",
        "Drain Cleaning",
      ],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      profileImage: "/default-profile.jpg",
      specialization: "Electrical Engineer",
      ratingAverage: 4.8,
      reviewCount: 35,
      isPro: true,
      skills: ["Wiring", "Circuit Repair", "Panel Installation"],
    },
    {
      id: 3,
      name: "Sarah Johnson",
      profileImage: "/default-profile.jpg",
      specialization: "Electrical Engineer",
      ratingAverage: 4.8,
      reviewCount: 35,
      isPro: true,
      skills: ["Wiring", "Circuit Repair", "Panel Installation"],
    },
    {
      id: 4,
      name: "Sarah Johnson",
      profileImage: "/default-profile.jpg",
      specialization: "Electrical Engineer",
      ratingAverage: 4.8,
      reviewCount: 35,
      isPro: true,
      skills: ["Wiring", "Circuit Repair", "Panel Installation"],
    },
    {
      id: 5,
      name: "Sarah Johnson",
      profileImage: "/default-profile.jpg",
      specialization: "Electrical Engineer",
      ratingAverage: 4.8,
      reviewCount: 35,
      isPro: true,
      skills: ["Wiring", "Circuit Repair", "Panel Installation"],
    },
    {
      id: 6,
      name: "Sarah Johnson",
      profileImage: "/default-profile.jpg",
      specialization: "Electrical Engineer",
      ratingAverage: 4.8,
      reviewCount: 35,
      isPro: true,
      skills: ["Wiring", "Circuit Repair", "Panel Installation"],
    },
  ]);

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

  return (
    <div className="container-fluid px-4">
      {/* Search Bar */}
      {/* <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 py-2"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary px-4">Search</button>
          </div>
        </div>
      </div> */}

      {/* Premium Banner */}
      <div className="row mb-4">
        <div className="col-12">
          <div
            className="card border-0 shadow-sm overflow-hidden bg-gradient"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                  <button className="btn btn-light rounded-pill px-4 fw-bold">
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
          <h3
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
          </h3>

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
      {/* subscribed users */}

      {user.usertype === "premium" && (
        <div className="row mb-4">
          <div className="col-12">
            <h3
              className="fw-bold mb-4 text-gradient"
              style={{
                textAlign: "center",
                backgroundImage:
                  "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Recommended Technicians
            </h3>

            <Grid
              container
              // spacing={3}
              justifyContent={{ xs: "center", sm: "flex-start" }}
              alignItems="center"
            >
              {technicians.slice(0, 5).map((tech) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={[
                    { mb: 2 }, // xs
                    { "@media (min-width:600px)": { ml: 5.5, p: 2 } }, // sm and up
                  ]}
                  key={tech.id}
                >
                  <TechCard tech={tech} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}

      <Dialog
        open={openAvailability}
        onClose={handleCloseAvailability}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedTech?.name}'s Availability
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Calendar
              tileContent={tileContent}
              minDate={new Date()}
              onClickDay={(date) => {
                const isAvailable = !bookedDates.some((bookedDate) =>
                  isSameDay(bookedDate, date)
                );

                if (isAvailable) {
                  alert(
                    `You selected ${format(
                      date,
                      "MMM dd, yyyy"
                    )} - Proceed to booking?`
                  );
                } else {
                  alert("This date is already booked");
                }
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
              }}
            >
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
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
      {/* Recent Bookings */}
      {/* <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="fw-bold mb-0">Recent Bookings</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Technician</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Plumbing</td>
                      <td>John Smith</td>
                      <td>May 15, 2023</td>
                      <td>
                        <span className="badge bg-success">Completed</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Electrical</td>
                      <td>Sarah Johnson</td>
                      <td>May 18, 2023</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}

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
