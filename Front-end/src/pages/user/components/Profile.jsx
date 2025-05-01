import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/slices/authSlice";
import { updateProfileImage } from "../../../redux/slices/authSlice";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  Stack,
  InputAdornment,
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
    user_password: user?.password || "",
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const userId = user.id;
      const formData = new FormData();
      formData.append("profileImage", file); // Must match the field name expected by multer

      // Show preview while uploading
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Dispatch the upload action
      await dispatch(updateProfileImage({ userId, file: formData })).unwrap();

      // Optionally show success message
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image: " + (error.message || "Unknown error"));
      // Revert to previous image if upload fails
      setProfileImage(user.profileImg);
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userId: user.id, updatedData: changes }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setUserData({
      user_name: user?.name || "",
      user_email: user?.email || "",
      user_password: user?.password || "",
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
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={`http://localhost:8000/uploads/profile/user/${profileImage}`}
              sx={{
                width: 100,
                height: 100,
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

          <Box sx={{ flex: 1, minWidth: "280px" }}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              gap="20px"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h7"
                  component="h5"
                  fontWeight="600"
                  gutterBottom
                >
                  {userData.user_name}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{ alignSelf: "center" }}
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
        <Grid xs={12} md={6} sx={{ width: "100%" }}>
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
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="user_name"
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
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="user_email"
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
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      name="user_contact"
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
                </Grid>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Address Information */}
        <Grid xs={12} md={6} sx={{ width: "100%" }}>
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
                <Grid xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Flat/House No"
                    name="flatNo"
                    value={userData.user_address.flatNo}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "user_address")}
                  />
                </Grid>
                <Grid xs={12} sm={9}>
                  <TextField
                    fullWidth
                    label="Street"
                    name="street"
                    value={userData.user_address.street}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "user_address")}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={userData.user_address.city}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "user_address")}
                  />
                </Grid>
                <Grid xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={userData.user_address.state}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "user_address")}
                  />
                </Grid>
                <Grid xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={userData.user_address.pincode}
                    disabled={!isEditing}
                    onChange={(e) => handleNestedChange(e, "user_address")}
                  />
                </Grid>
                <Grid xs={12}>
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
        {/* security*/}
        <Grid xs={12} md={6} sx={{ width: "100%" }}>
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
                <Grid xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="user_password"
                    value={userData.user_password}
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
            justifyContent: "center",
            gap: 2,
            mt: 2,
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
              px: 1,
              py: 1,
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
              px: 1,
              py: 1,
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
