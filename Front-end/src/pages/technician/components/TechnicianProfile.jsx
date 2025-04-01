import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTechProfile,
  updateTechImage,
} from "../../../redux/slices/authSlice";
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
  Security,
  Key,
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

const TechnicianProfile = () => {
  const { technician } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(technician.profileImg);
  const [changes, setChanges] = useState({});

  const [techData, setTechData] = useState({
    tech_name: technician?.name || "",
    tech_email: technician?.email || "",
    tech_password: technician?.password || "",
    tech_contact: technician?.contact || "",
    tech_address: {
      flatNo: technician?.address?.flatNo || "",
      street: technician?.address?.street || "",
      city: technician?.address?.city || "",
      state: technician?.address?.state || "",
      pincode: technician?.address?.pincode || "",
    },
    tech_location: {
      lat: technician?.location?.lat || 0,
      lng: technician?.location?.lng || 0,
    },
    tech_experience: technician?.experience || 0,
    tech_ratingAvg: technician?.ratingAvg || 0,
    tech_completions: technician?.completions || 0,

    worksKnown: technician?.workKnown?.join(", ") || "",
    earnings: technician?.earned || 0,
    isPro: technician?.techtype || false,
  });

  useEffect(() => {
    console.log(technician.profileImg);
  }, [technician]);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const techId = technician.id;
      const formData = new FormData();
      formData.append("profileImage", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      await dispatch(updateTechImage({ techId, file: formData })).unwrap();
    } catch (error) {
      console.error("Upload failed:", error);
      setProfileImage(technician.profileImg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanges((prev) => ({ ...prev, [name]: value }));
    setTechData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, nestedKey) => {
    const { name, value } = e.target;
    setChanges((prev) => ({
      ...prev,
      [nestedKey]: { ...prev[nestedKey], [name]: value },
    }));
    setTechData((prev) => ({
      ...prev,
      [nestedKey]: { ...prev[nestedKey], [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTechProfile({ techId: technician.id, updatedData: changes })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setTechData({
      tech_name: technician?.name || "",
      tech_email: technician?.email || "",
      tech_contact: technician?.contact || "",
      tech_address: {
        flatNo: technician?.address?.flatNo || "",
        street: technician?.address?.street || "",
        city: technician?.address?.city || "",
        state: technician?.address?.state || "",
        pincode: technician?.address?.pincode || "",
      },
      tech_location: {
        lat: technician?.location?.lat || 0,
        lng: technician?.location?.lng || 0,
      },
      tech_experience: technician?.experience || 0,
      tech_ratingAvg: technician?.ratingAvg || 0,
      tech_completions: technician?.completions || 0,

      worksKnown: technician?.workKnown?.join(", ") || "",
      earnings: technician?.earned || 0,
      isPro: technician?.techtype || false,
    });
    setChanges({});
  };

  useEffect(() => {
    console.log(technician);
  }, [handleSubmit]);

  return (
    // <Box sx={{ p: 1, maxWidth: "1400px", margin: "0 auto" }}>
    //   {/* Profile Header */}
    //   <Paper
    //     sx={{
    //       p: 1,
    //       mb: 2,
    //       borderRadius: "12px",
    //       background:
    //         "linear-gradient(135deg,rgb(252, 252, 252) 0%,rgb(190, 221, 245) 100%)",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 4,
    //         flexWrap: "wrap",
    //       }}
    //     >
    //       <Box sx={{ position: "relative" }}>
    //         <Avatar
    //           src={`http://localhost:8000/uploads/profile/${profileImage}`}
    //           sx={{
    //             width: 130,
    //             height: 130,
    //             border: "4px solid white",
    //             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    //           }}
    //         />

    //         {isEditing && (
    //           <IconButton
    //             component="label"
    //             sx={{
    //               position: "absolute",
    //               bottom: 8,
    //               right: 8,
    //               bgcolor: "primary.main",
    //               color: "white",
    //               "&:hover": { bgcolor: "primary.dark" },
    //               boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    //             }}
    //           >
    //             <CameraAlt />
    //             <input
    //               type="file"
    //               hidden
    //               accept="image/*"
    //               onChange={handleImageUpload}
    //             />
    //           </IconButton>
    //         )}
    //       </Box>

    //       <Box sx={{ flex: 1, minWidth: "300px" }}>
    //         <Stack
    //           direction="row"
    //           justifyContent="space-between"
    //           alignItems="flex-start"
    //         >
    //           <Box>
    //             <Typography
    //               variant="h7"
    //               component="h1"
    //               fontWeight="600"
    //               gutterBottom
    //             >
    //               {techData.tech_name}
    //             </Typography>
    //             <Chip
    //               icon={techData.isPro ? <Star color="success" /> : <Person />}
    //               label={techData.isPro ? "PRO Tech" : "Standard"}
    //               color={techData.isPro ? "success" : "default"}
    //               variant="outlined"
    //               size="medium"
    //               sx={{ fontWeight: 500 }}
    //             />
    //           </Box>

    //           <Button
    //             variant="outlined"
    //             startIcon={<Edit />}
    //             onClick={() => setIsEditing(!isEditing)}
    //             sx={{ alignSelf: "center" }}
    //           >
    //             {isEditing ? "Cancel Editing" : "Edit Profile"}
    //           </Button>
    //         </Stack>
    //       </Box>
    //     </Box>
    //   </Paper>

    //   {/* Profile Sections */}
    //   <Grid container spacing={3}>
    //     {/* Personal Information */}
    //     <Grid item xs={12} md={6}>
    //       <StyledCard>
    //         <CardContent>
    //           <Box
    //             sx={{
    //               display: "flex",
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //               mb: 3,
    //             }}
    //           >
    //             <Typography variant="h6" component="h2" fontWeight="600">
    //               <Person sx={{ verticalAlign: "middle", mr: 1 }} />
    //               Personal Information
    //             </Typography>
    //           </Box>

    //           <Box component="form" onSubmit={handleSubmit}>
    //             <Grid container spacing={2}>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   fullWidth
    //                   label="Full Name"
    //                   name="tech_name"
    //                   value={techData.tech_name}
    //                   onChange={handleChange}
    //                   disabled={!isEditing}
    //                   InputProps={{
    //                     startAdornment: (
    //                       <InputAdornment position="start">
    //                         <Person />
    //                       </InputAdornment>
    //                     ),
    //                   }}
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   fullWidth
    //                   label="Email"
    //                   name="tech_email"
    //                   value={techData.tech_email}
    //                   disabled
    //                   InputProps={{
    //                     startAdornment: (
    //                       <InputAdornment position="start">
    //                         <Email />
    //                       </InputAdornment>
    //                     ),
    //                   }}
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   fullWidth
    //                   label="Contact Number"
    //                   name="tech_contact"
    //                   value={techData.tech_contact}
    //                   disabled={!isEditing}
    //                   onChange={handleChange}
    //                   InputProps={{
    //                     startAdornment: (
    //                       <InputAdornment position="start">
    //                         <Phone />
    //                       </InputAdornment>
    //                     ),
    //                   }}
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   fullWidth
    //                   label="Experience (years)"
    //                   name="tech_experience"
    //                   type="number"
    //                   value={techData.tech_experience}
    //                   disabled={!isEditing}
    //                   onChange={handleChange}
    //                   InputProps={{
    //                     startAdornment: (
    //                       <InputAdornment position="start">
    //                         <AccessTime />
    //                       </InputAdornment>
    //                     ),
    //                   }}
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   fullWidth
    //                   label="Skills (comma separated)"
    //                   name="worksKnown"
    //                   value={techData.worksKnown}
    //                   disabled={!isEditing}
    //                   onChange={handleChange}
    //                   multiline
    //                   rows={2}
    //                 />
    //               </Grid>
    //             </Grid>
    //           </Box>
    //         </CardContent>
    //       </StyledCard>
    //     </Grid>

    //     {/* Address Information */}
    //     <Grid item xs={12} md={6}>
    //       <StyledCard>
    //         <CardContent>
    //           <Typography
    //             variant="h6"
    //             component="h2"
    //             fontWeight="600"
    //             gutterBottom
    //           >
    //             <Home sx={{ verticalAlign: "middle", mr: 1 }} />
    //             Address Information
    //           </Typography>

    //           <Grid container spacing={2}>
    //             <Grid item xs={12} sm={3}>
    //               <TextField
    //                 fullWidth
    //                 label="Flat/House No"
    //                 name="flatNo"
    //                 value={techData.tech_address.flatNo}
    //                 disabled={!isEditing}
    //                 onChange={(e) => handleNestedChange(e, "tech_address")}
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={9}>
    //               <TextField
    //                 fullWidth
    //                 label="Street"
    //                 name="street"
    //                 value={techData.tech_address.street}
    //                 disabled={!isEditing}
    //                 onChange={(e) => handleNestedChange(e, "tech_address")}
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //               <TextField
    //                 fullWidth
    //                 label="City"
    //                 name="city"
    //                 value={techData.tech_address.city}
    //                 disabled={!isEditing}
    //                 onChange={(e) => handleNestedChange(e, "tech_address")}
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={4}>
    //               <TextField
    //                 fullWidth
    //                 label="State"
    //                 name="state"
    //                 value={techData.tech_address.state}
    //                 disabled={!isEditing}
    //                 onChange={(e) => handleNestedChange(e, "tech_address")}
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={2}>
    //               <TextField
    //                 fullWidth
    //                 label="Pincode"
    //                 name="pincode"
    //                 value={techData.tech_address.pincode}
    //                 disabled={!isEditing}
    //                 onChange={(e) => handleNestedChange(e, "tech_address")}
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <TextField
    //                 fullWidth
    //                 label="Location Coordinates"
    //                 value={`${techData.tech_location.lat}, ${techData.tech_location.lng}`}
    //                 disabled
    //                 InputProps={{
    //                   startAdornment: (
    //                     <InputAdornment position="start">
    //                       <LocationOn />
    //                     </InputAdornment>
    //                   ),
    //                 }}
    //               />
    //             </Grid>
    //           </Grid>
    //         </CardContent>
    //       </StyledCard>
    //     </Grid>

    //     {/* Professional Stats */}
    //     <Grid item xs={12}>
    //       <StyledCard>
    //         <CardContent>
    //           <Typography
    //             variant="h6"
    //             component="h2"
    //             fontWeight="600"
    //             gutterBottom
    //           >
    //             <Work sx={{ verticalAlign: "middle", mr: 1 }} />
    //             Professional Statistics
    //           </Typography>
    //           <Grid container spacing={3}>
    //             <Grid item xs={6} sm={3}>
    //               <StatCard>
    //                 <AttachMoney color="primary" sx={{ fontSize: 40, mb: 1 }} />
    //                 <Typography
    //                   variant="h5"
    //                   color="primary.main"
    //                   fontWeight="600"
    //                 >
    //                   ${technician.earnings?.toFixed(2) || "0.00"}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                   Total Earnings
    //                 </Typography>
    //               </StatCard>
    //             </Grid>
    //             <Grid item xs={6} sm={3}>
    //               <StatCard>
    //                 <Work color="secondary" sx={{ fontSize: 40, mb: 1 }} />
    //                 <Typography variant="h5" fontWeight="600">
    //                   {technician.jobsCompleted || 0}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                   Jobs Completed
    //                 </Typography>
    //               </StatCard>
    //             </Grid>
    //             <Grid item xs={6} sm={3}>
    //               <StatCard>
    //                 <Star color="warning" sx={{ fontSize: 40, mb: 1 }} />
    //                 <Typography variant="h5" fontWeight="600">
    //                   {technician.tech_ratingAvg?.toFixed(1) || "N/A"}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                   Average Rating
    //                 </Typography>
    //               </StatCard>
    //             </Grid>
    //             <Grid item xs={6} sm={3}>
    //               <StatCard>
    //                 <AccessTime color="info" sx={{ fontSize: 40, mb: 1 }} />
    //                 <Typography variant="h5" fontWeight="600">
    //                   {techData.tech_experience || 0}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                   Years Experience
    //                 </Typography>
    //               </StatCard>
    //             </Grid>
    //           </Grid>
    //         </CardContent>
    //       </StyledCard>
    //     </Grid>
    //   </Grid>

    //   {/* Edit/Save Buttons - Only shown in edit mode */}
    //   {isEditing && (
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "flex-end",
    //         gap: 2,
    //         mt: 4,
    //         position: "sticky",
    //         bottom: 20,
    //         zIndex: 1000,
    //       }}
    //     >
    //       <Button
    //         variant="outlined"
    //         startIcon={<Cancel />}
    //         onClick={handleCancel}
    //         sx={{
    //           px: 4,
    //           py: 1.5,
    //           borderRadius: "8px",
    //         }}
    //       >
    //         Cancel
    //       </Button>
    //       <Button
    //         variant="contained"
    //         startIcon={<Save />}
    //         onClick={handleSubmit}
    //         sx={{
    //           px: 4,
    //           py: 1.5,
    //           borderRadius: "8px",
    //         }}
    //       >
    //         Save Changes
    //       </Button>
    //     </Box>
    //   )}
    // </Box>
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
              src={`http://localhost:8000/uploads/profile/technicians/${profileImage}`}
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
                  onChange={handleImageUpload}
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
                  {techData.tech_name}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{ alignSelf: "center", mr: 3 }}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* Profile Sections */}
      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
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

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="tech_name"
                      value={techData.tech_name}
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
                      value={techData.tech_email}
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
                      value={techData.tech_contact}
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
                </Grid>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
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
                <Typography
                  variant="h6"
                  component="h2"
                  fontWeight="600"
                  gutterBottom
                >
                  <Home sx={{ verticalAlign: "middle", mr: 1 }} />
                  Address Information
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Flat/House No"
                    name="flatNo"
                    value={techData.tech_address.flatNo}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    fullWidth
                    label="Street"
                    name="street"
                    value={techData.tech_address.street}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={techData.tech_address.city}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={techData.tech_address.state}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={techData.tech_address.pincode}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "tech_address")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location Coordinates"
                    value={`${techData.tech_location.lat}, ${techData.tech_location.lng}`}
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
        {/* security*/}
        <Grid item xs={12} md={6} sx={{ width: "100%" }}>
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
                <Typography
                  variant="h6"
                  component="h2"
                  fontWeight="600"
                  gutterBottom
                >
                  <Security sx={{ verticalAlign: "middle", mr: 1 }} />
                  Security Details
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="tech_password"
                    value={techData.tech_password}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Key />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
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
            onClick={handleSubmit}
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

export default TechnicianProfile;
