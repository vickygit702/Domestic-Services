// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUserProfile } from "../../../redux/slices/authSlice";
// import { updateProfileImage } from "../../../redux/slices/authSlice";

// const Profile = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileImage, setProfileImage] = useState(user.profileImg);
//   const [changes, setChanges] = useState({});

//   const [userData, setUserData] = useState({
//     user_name: user?.name || "",
//     user_email: user?.email || "",
//     user_password: user?.password || "",
//     user_contact: user?.contact || "",
//     user_address: {
//       flatNo: user?.address?.flatNo || "",
//       street: user?.address?.street || "",
//       city: user?.address?.city || "",
//       state: user?.address?.state || "",
//       pincode: user?.address?.pincode || "",
//     },
//     user_location: {
//       lat: user?.location?.lat || 0,
//       lng: user?.location?.lng || 0,
//     },
//   });
//   useEffect(() => {
//     console.log("useEffect:", user);
//   }, [user, profileImage]);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const userId = user.id;
//       const formData = new FormData();
//       formData.append("profileImage", file); // Must match the field name expected by multer

//       // Show preview while uploading
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);

//       // Dispatch the upload action
//       await dispatch(updateProfileImage({ userId, file: formData })).unwrap();

//       // Optionally show success message
//       alert("Profile image updated successfully!");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Failed to upload image: " + (error.message || "Unknown error"));
//       // Revert to previous image if upload fails
//       setProfileImage(user.profileImg);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setChanges((prev) => ({ ...prev, [name]: value }));
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNestedChange = (e, nestedKey) => {
//     const { name, value } = e.target;
//     setChanges((prev) => ({
//       ...prev,
//       [nestedKey]: { ...prev[nestedKey], [name]: value },
//     }));
//     setUserData((prev) => ({
//       ...prev,
//       [nestedKey]: { ...prev[nestedKey], [name]: value },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUserProfile({ userId: user.id, updatedData: changes }));
//     setIsEditing(false);
//   };

//   return (
//     <div className="container-fluid px-4 py-5">
//       {/* Top Section with Profile Image */}
//       <div className="row mb-4">
//         <div className="col-12">
//           <div className="d-flex align-items-center gap-4">
//             <div className="position-relative">
//               <img
//                 src={`http://localhost:8000/uploads/profile/${user.profileImg}`}
//                 className="rounded-circle shadow"
//                 width="120"
//                 height="120"
//                 alt="Profile"
//               />
//               <label className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle shadow-sm">
//                 <i className="bi bi-camera"></i>
//                 <input
//                   type="file"
//                   className="d-none"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                 />
//               </label>
//             </div>
//             <div>
//               <h2 className="mb-1">{userData.user_name}</h2>
//               <p className="text-muted mb-2">{userData.user_email}</p>
//               <div className="d-flex gap-3">
//                 <span className="badge bg-primary">
//                   <i className="bi bi-star-fill me-1"></i> 4.8
//                 </span>
//                 <span className="badge bg-success">
//                   <i className="bi bi-check-circle me-1"></i> Verified
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Profile Information Sections */}
//       <div className="row g-4">
//         {/* Personal Information */}
//         <div className="col-md-6">
//           <div className="card border-0 shadow-sm h-100">
//             <div className="card-header bg-white border-0">
//               <h4 className="fw-bold mb-0">
//                 <i className="bi bi-person-lines-fill text-primary me-2"></i>
//                 Personal Information
//               </h4>
//             </div>
//             <div className="card-body">
//               {isEditing ? (
//                 <div className="row g-3">
//                   <div className="col-12">
//                     <label className="form-label">Full Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="user_name"
//                       value={userData.user_name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       value={userData.user_email}
//                       disabled
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Contact</label>
//                     <input
//                       type="tel"
//                       className="form-control"
//                       name="user_contact"
//                       value={userData.user_contact}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="list-group list-group-flush">
//                   <div className="list-group-item border-0 px-0 py-2">
//                     <h6 className="text-muted mb-1">Full Name</h6>
//                     <p className="mb-0">{userData.user_name}</p>
//                   </div>
//                   <div className="list-group-item border-0 px-0 py-2">
//                     <h6 className="text-muted mb-1">Email</h6>
//                     <p className="mb-0">{userData.user_email}</p>
//                   </div>
//                   <div className="list-group-item border-0 px-0 py-2">
//                     <h6 className="text-muted mb-1">Contact Number</h6>
//                     <p className="mb-0">
//                       {userData.user_contact || "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Address Information */}
//         <div className="col-md-6">
//           <div className="card border-0 shadow-sm h-100">
//             <div className="card-header bg-white border-0">
//               <h4 className="fw-bold mb-0">
//                 <i className="bi bi-house-door text-primary me-2"></i>
//                 Address
//               </h4>
//             </div>
//             <div className="card-body">
//               {isEditing ? (
//                 <div className="row g-3">
//                   <div className="col-md-4">
//                     <label className="form-label">Flat/House No</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="flatNo"
//                       value={userData.user_address.flatNo}
//                       onChange={(e) => handleNestedChange(e, "user_address")}
//                     />
//                   </div>
//                   <div className="col-md-8">
//                     <label className="form-label">Street</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="street"
//                       value={userData.user_address.street}
//                       onChange={(e) => handleNestedChange(e, "user_address")}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">City</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="city"
//                       value={userData.user_address.city}
//                       onChange={(e) => handleNestedChange(e, "user_address")}
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <label className="form-label">State</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="state"
//                       value={userData.user_address.state}
//                       onChange={(e) => handleNestedChange(e, "user_address")}
//                     />
//                   </div>
//                   <div className="col-md-2">
//                     <label className="form-label">Pincode</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="pincode"
//                       value={userData.user_address.pincode}
//                       onChange={(e) => handleNestedChange(e, "user_address")}
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="list-group list-group-flush">
//                   <div className="list-group-item border-0 px-0 py-2">
//                     <h6 className="text-muted mb-1">Address</h6>
//                     <p className="mb-0">
//                       {userData.user_address.flatNo &&
//                         `${userData.user_address.flatNo}, `}
//                       {userData.user_address.street &&
//                         `${userData.user_address.street}, `}
//                       {userData.user_address.city &&
//                         `${userData.user_address.city}, `}
//                       {userData.user_address.state &&
//                         `${userData.user_address.state} - `}
//                       {userData.user_address.pincode || "Not specified"}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Security Section */}
//         <div className="col-md-6">
//           <div className="card border-0 shadow-sm h-100">
//             <div className="card-header bg-white border-0">
//               <h4 className="fw-bold mb-0">
//                 <i className="bi bi-shield-lock text-primary me-2"></i>
//                 Security
//               </h4>
//             </div>
//             <div className="card-body">
//               {isEditing ? (
//                 <div className="row g-3">
//                   <div className="col-12">
//                     <label className="form-label">Current Password</label>
//                     <div className="input-group">
//                       <input
//                         type="password"
//                         className="form-control"
//                         name="current_password"
//                         placeholder="Enter current password"
//                       />
//                       <button
//                         className="btn btn-outline-secondary"
//                         type="button"
//                       >
//                         <i className="bi bi-eye"></i>
//                       </button>
//                     </div>
//                   </div>
//                   <div className="col-12">
//                     <label className="form-label">New Password</label>
//                     <div className="input-group">
//                       <input
//                         type="password"
//                         className="form-control"
//                         name="user_password"
//                         value={userData.user_password}
//                         onChange={handleChange}
//                         placeholder="Enter new password"
//                       />
//                       <button
//                         className="btn btn-outline-secondary"
//                         type="button"
//                       >
//                         <i className="bi bi-eye"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="list-group list-group-flush">
//                   <div className="list-group-item border-0 px-0 py-2">
//                     <h6 className="text-muted mb-1">Password</h6>
//                     <p className="mb-0">••••••••</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Location Section */}
//         <div className="col-md-6">
//           <div className="card border-0 shadow-sm h-100">
//             <div className="card-header bg-white border-0">
//               <h4 className="fw-bold mb-0">
//                 <i className="bi bi-geo-alt text-primary me-2"></i>
//                 Location
//               </h4>
//             </div>
//             <div className="card-body">
//               <div className="row g-3">
//                 <div className="col-12">
//                   <div className="ratio ratio-16x9 bg-light rounded mb-3">
//                     <div className="d-flex justify-content-center align-items-center text-muted">
//                       <i className="bi bi-map fs-1"></i>
//                     </div>
//                   </div>
//                 </div>
//                 {isEditing ? (
//                   <>
//                     <div className="col-md-6">
//                       <label className="form-label">Latitude</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="lat"
//                         value={userData.user_location.lat}
//                         onChange={(e) => handleNestedChange(e, "user_location")}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label">Longitude</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="lng"
//                         value={userData.user_location.lng}
//                         onChange={(e) => handleNestedChange(e, "user_location")}
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <div className="col-12">
//                     <div className="list-group-item border-0 px-0 py-2">
//                       <h6 className="text-muted mb-1">Coordinates</h6>
//                       <p className="mb-0">
//                         {userData.user_location.lat &&
//                         userData.user_location.lng
//                           ? `${userData.user_location.lat}, ${userData.user_location.lng}`
//                           : "Not specified"}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit/Save Buttons */}
//       <div className="d-flex justify-content-end mt-4">
//         {isEditing ? (
//           <div className="d-flex gap-2">
//             <button
//               type="button"
//               className="btn btn-outline-secondary"
//               onClick={() => setIsEditing(false)}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={handleSubmit}
//             >
//               Save Changes
//             </button>
//           </div>
//         ) : (
//           <button
//             className="btn btn-primary"
//             onClick={() => setIsEditing(true)}
//           >
//             <i className="bi bi-pencil-square me-2"></i>Edit Profile
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { updateTechnicianProfile, updateTechnicianProfileImage } from "../../../redux/slices/authSlice";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Edit,
  CameraAlt,
  Save,
  Cancel,
  Person,
  Email,
  Phone,
  Home,
  LocationOn,
  Work,
  Star,
  AttachMoney,
  AccessTime,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.08)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)",
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user.profileImg);
  const [changes, setChanges] = useState({});

  const [userData, setUserData] = useState({
    user_name: user?.name || "",
    user_email: user?.email || "",
    user_contact: user?.contact || "",
    user_address: {
      flatNo: user?.address?.flatNo || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
    },
    user_location: {
      lat: user?.location?.lat || 0,
      lng: user?.location?.lng || 0,
    },
  });

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   try {
  //     const techId = technician._id;
  //     const formData = new FormData();
  //     formData.append("profileImage", file);

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);

  //     await dispatch(
  //       updateTechnicianProfileImage({ techId, file: formData })
  //     ).unwrap();
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     setProfileImage(technician.profileImg);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanges((prev) => ({ ...prev, [name]: value }));
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, nestedKey) => {
    const { name, value } = e.target;
    setChanges((prev) => ({
      ...prev,
      [nestedKey]: { ...prev[nestedKey], [name]: value },
    }));
    setUserData((prev) => ({
      ...prev,
      [nestedKey]: { ...prev[nestedKey], [name]: value },
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     updateTechnicianProfile({ techId: technician._id, updatedData: changes })
  //   );
  //   setIsEditing(false);
  // };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setUserData({
      user_name: user?.name || "",
      user_email: user?.email || "",
      user_contact: user?.contact || "",
      user_address: {
        flatNo: user?.address?.flatNo || "",
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        pincode: user?.address?.pincode || "",
      },
      user_location: {
        lat: user?.location?.lat || 0,
        lng: user?.location?.lng || 0,
      },
    });
    setChanges({});
  };

  return (
    <Box sx={{ p: 1, maxWidth: "1400px", margin: "0 auto" }}>
      {/* Profile Header */}
      <Paper
        sx={{
          p: 1,
          mb: 2,
          borderRadius: "12px",
          background:
            "linear-gradient(135deg,rgb(252, 252, 252) 0%,rgb(190, 221, 245) 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={`http://localhost:8000/uploads/profile/${profileImage}`}
              sx={{
                width: 130,
                height: 130,
                border: "4px solid white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            {isEditing && (
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <CameraAlt />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  // onChange={handleImageUpload}
                />
              </IconButton>
            )}
          </Box>

          <Box sx={{ flex: 1, minWidth: "300px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  variant="h7"
                  component="h1"
                  fontWeight="600"
                  gutterBottom
                >
                  {userData.user_name}
                </Typography>
                {/* <Chip
                  icon={techData.isPro ? <Star color="success" /> : <Person />}
                  label={techData.isPro ? "PRO Tech" : "Standard"}
                  color={techData.isPro ? "success" : "default"}
                  variant="outlined"
                  size="medium"
                  sx={{ fontWeight: 500 }}
                /> */}
              </Box>

              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{ alignSelf: "center" }}
              >
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* Profile Sections */}
      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" component="h2" fontWeight="600">
                  <Person sx={{ verticalAlign: "middle", mr: 1 }} />
                  Personal Information
                </Typography>
              </Box>

              <Box component="form">
                {" "}
                {/* onSubmit={handleSubmit} */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="tech_name"
                      value={userData.user_name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="tech_email"
                      value={userData.user_email}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      name="tech_contact"
                      value={userData.user_contact}
                      disabled={!isEditing}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Experience (years)"
                      name="tech_experience"
                      type="number"
                      value={techData.tech_experience}
                      disabled={!isEditing}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTime />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid> */}
                  {/* <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Skills (comma separated)"
                      name="worksKnown"
                      value={techData.worksKnown}
                      disabled={!isEditing}
                      onChange={handleChange}
                      multiline
                      rows={2}
                    />
                  </Grid> */}
                </Grid>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                fontWeight="600"
                gutterBottom
              >
                <Home sx={{ verticalAlign: "middle", mr: 1 }} />
                Address Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Flat/House No"
                    name="flatNo"
                    value={userData.user_address.flatNo}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    fullWidth
                    label="Street"
                    name="street"
                    value={userData.user_address.street}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={userData.user_address.city}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={userData.user_address.state}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={userData.user_address.pincode}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location Coordinates"
                    value={`${userData.user_location.lat}, ${userData.user_location.lng}`}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Professional Stats */}
        {/* <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                fontWeight="600"
                gutterBottom
              >
                <Work sx={{ verticalAlign: "middle", mr: 1 }} />
                Professional Statistics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <StatCard>
                    <AttachMoney color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography
                      variant="h5"
                      color="primary.main"
                      fontWeight="600"
                    >
                      ${technician.earnings?.toFixed(2) || "0.00"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Earnings
                    </Typography>
                  </StatCard>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatCard>
                    <Work color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h5" fontWeight="600">
                      {technician.jobsCompleted || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jobs Completed
                    </Typography>
                  </StatCard>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatCard>
                    <Star color="warning" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h5" fontWeight="600">
                      {technician.tech_ratingAvg?.toFixed(1) || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Rating
                    </Typography>
                  </StatCard>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatCard>
                    <AccessTime color="info" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h5" fontWeight="600">
                      {techData.tech_experience || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Years Experience
                    </Typography>
                  </StatCard>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid> */}
      </Grid>

      {/* Edit/Save Buttons - Only shown in edit mode */}
      {isEditing && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
            position: "sticky",
            bottom: 20,
            zIndex: 1000,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={handleCancel}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "8px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            // onClick={handleSubmit}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "8px",
            }}
          >
            Save Changes
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
