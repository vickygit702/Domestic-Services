// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   ToggleButton,
//   ToggleButtonGroup,
// } from "@mui/material";

// Chart.register(...registerables);

// const TechnicianDashboard = () => {
//   const { id } = useParams();
//   const [stats, setStats] = useState(null);
//   const [timeRange, setTimeRange] = useState("monthly");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/technician/${id}/dashboard`
//         );
//         const data = await response.json();
//         setStats(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [id]);

//   const earningsData = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Earnings",
//         data: stats?.monthlyEarnings || Array(12).fill(0),
//         backgroundColor: "rgba(54, 162, 235, 0.5)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   if (loading) return <Typography>Loading dashboard...</Typography>;

//   return (
//     <div className="technician-dashboard">
//       <Typography variant="h4" gutterBottom>
//         Technician Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Stats Cards */}
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary">Total Earnings</Typography>
//               <Typography variant="h5">
//                 ${stats?.totalEarnings?.toFixed(2) || 0}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary">Completed Jobs</Typography>
//               <Typography variant="h5">{stats?.completedJobs || 0}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography color="textSecondary">Average Rating</Typography>
//               <Typography variant="h5">
//                 {stats?.rating?.toFixed(1) || "N/A"}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Earnings Chart */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography variant="h6">Earnings Overview</Typography>
//                 <ToggleButtonGroup
//                   value={timeRange}
//                   exclusive
//                   onChange={(e, newRange) => setTimeRange(newRange)}
//                 >
//                   <ToggleButton value="monthly">Monthly</ToggleButton>
//                   <ToggleButton value="yearly">Yearly</ToggleButton>
//                 </ToggleButtonGroup>
//               </div>

//               <div style={{ height: "300px", marginTop: "20px" }}>
//                 <Bar
//                   data={earningsData}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     scales: {
//                       y: {
//                         beginAtZero: true,
//                         ticks: {
//                           callback: function (value) {
//                             return "$" + value;
//                           },
//                         },
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default TechnicianDashboard;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   ToggleButton,
//   ToggleButtonGroup,
//   Skeleton,
//   Box,
//   useTheme,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// Chart.register(...registerables);

// // Premium styled components
// const StatCard = styled(Card)(({ theme }) => ({
//   borderRadius: "12px",
//   boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
//   transition: "transform 0.3s, box-shadow 0.3s",
//   "&:hover": {
//     transform: "translateY(-4px)",
//     boxShadow: "0 8px 24px 0 rgba(0,0,0,0.16)",
//   },
// }));

// const ChartContainer = styled(Box)({
//   height: "400px",
//   padding: "16px",
// });

// const TechnicianDashboard = () => {
//   const { id } = useParams();
//   const [stats, setStats] = useState(null);
//   const [timeRange, setTimeRange] = useState("monthly");
//   const [loading, setLoading] = useState(true);
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         const mockData = {
//           totalEarnings: 12500,
//           completedJobs: 42,
//           rating: 4.7,
//           monthlyEarnings: [
//             1200, 1900, 1500, 2000, 1700, 2100, 2400, 1800, 2200, 1900, 2300,
//             2500,
//           ],
//         };
//         setStats(mockData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [id]);

//   const earningsData = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Earnings",
//         data: stats?.monthlyEarnings || Array(12).fill(0),
//         backgroundColor: theme.palette.primary.main,
//         borderColor: theme.palette.primary.dark,
//         borderWidth: 2,
//         borderRadius: 4,
//         hoverBackgroundColor: theme.palette.primary.light,
//       },
//     ],
//   };

//   if (loading) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Skeleton variant="text" width="40%" height={60} />
//         <Grid container spacing={3} sx={{ mt: 2 }}>
//           {[1, 2, 3].map((item) => (
//             <Grid item xs={12} md={4} key={item}>
//               <Skeleton
//                 variant="rectangular"
//                 height={120}
//                 sx={{ borderRadius: 2 }}
//               />
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <Skeleton
//               variant="rectangular"
//               height={400}
//               sx={{ borderRadius: 2 }}
//             />
//           </Grid>
//         </Grid>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{
//           fontWeight: 600,
//           mb: 4,
//           color: theme.palette.text.primary,
//         }}
//       >
//         Technician Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Stats Cards */}
//         <Grid item xs={12} md={4}>
//           <StatCard>
//             <CardContent>
//               <Typography
//                 variant="subtitle2"
//                 color="text.secondary"
//                 sx={{ mb: 1 }}
//               >
//                 TOTAL EARNINGS
//               </Typography>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontWeight: 700,
//                   color: theme.palette.success.main,
//                 }}
//               >
//                 $
//                 {stats?.totalEarnings?.toLocaleString("en-US", {
//                   minimumFractionDigits: 2,
//                 }) || "0.00"}
//               </Typography>
//             </CardContent>
//           </StatCard>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <StatCard>
//             <CardContent>
//               <Typography
//                 variant="subtitle2"
//                 color="text.secondary"
//                 sx={{ mb: 1 }}
//               >
//                 COMPLETED JOBS
//               </Typography>
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>
//                 {stats?.completedJobs?.toLocaleString() || "0"}
//               </Typography>
//             </CardContent>
//           </StatCard>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <StatCard>
//             <CardContent>
//               <Typography
//                 variant="subtitle2"
//                 color="text.secondary"
//                 sx={{ mb: 1 }}
//               >
//                 AVERAGE RATING
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Typography
//                   variant="h4"
//                   sx={{
//                     fontWeight: 700,
//                     mr: 1,
//                     color: theme.palette.warning.main,
//                   }}
//                 >
//                   {stats?.rating?.toFixed(1) || "N/A"}
//                 </Typography>
//                 <Box sx={{ color: theme.palette.warning.main }}>★★★★★</Box>
//               </Box>
//             </CardContent>
//           </StatCard>
//         </Grid>

//         {/* Earnings Chart */}
//         <Grid item xs={12}>
//           <StatCard>
//             <CardContent>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 3,
//                 }}
//               >
//                 <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                   Earnings Overview
//                 </Typography>
//                 <ToggleButtonGroup
//                   value={timeRange}
//                   exclusive
//                   onChange={(e, newRange) => setTimeRange(newRange)}
//                   size="small"
//                   color="primary"
//                 >
//                   <ToggleButton value="monthly">Monthly</ToggleButton>
//                   <ToggleButton value="yearly">Yearly</ToggleButton>
//                 </ToggleButtonGroup>
//               </Box>

//               <ChartContainer>
//                 <Bar
//                   data={earningsData}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     plugins: {
//                       legend: {
//                         display: false,
//                       },
//                       tooltip: {
//                         backgroundColor: theme.palette.background.paper,
//                         titleColor: theme.palette.text.primary,
//                         bodyColor: theme.palette.text.secondary,
//                         borderColor: theme.palette.divider,
//                         borderWidth: 1,
//                         padding: 12,
//                         callbacks: {
//                           label: (context) => {
//                             return ` $${context.raw.toLocaleString()}`;
//                           },
//                         },
//                       },
//                     },
//                     scales: {
//                       y: {
//                         beginAtZero: true,
//                         grid: {
//                           color: theme.palette.divider,
//                         },
//                         ticks: {
//                           color: theme.palette.text.secondary,
//                           callback: function (value) {
//                             return "$" + value.toLocaleString();
//                           },
//                         },
//                       },
//                       x: {
//                         grid: {
//                           display: false,
//                         },
//                         ticks: {
//                           color: theme.palette.text.secondary,
//                         },
//                       },
//                     },
//                   }}
//                 />
//               </ChartContainer>
//             </CardContent>
//           </StatCard>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default TechnicianDashboard;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  useTheme,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

Chart.register(...registerables);

// Styled Components
const StatCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  // Subtract navbar width
}));

const TechnicianDashboard = () => {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStats({
          totalEarnings: 18500,
          completedJobs: 64,
          avgRating: 4.8,
          pendingJobs: 5,
          monthlyEarnings: [
            1500, 2200, 1800, 2500, 2100, 2800, 3200, 2400, 2900, 2600, 3100,
            3500,
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [id]);

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Earnings",
        data: stats?.monthlyEarnings || Array(12).fill(0),
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.primary.light
            : theme.palette.primary.main,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  if (loading) {
    return (
      <DashboardContainer>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Skeleton variant="rounded" height={120} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Skeleton variant="rounded" height={400} />
          </Grid>
        </Grid>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      {/* Top Stats Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                TOTAL EARNINGS
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "success.main" }}
              >
                ${stats.totalEarnings.toLocaleString()}
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                COMPLETED JOBS
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {stats.completedJobs}
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                AVG. RATING
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mr: 1, color: "warning.main" }}
                >
                  {stats.avgRating}
                </Typography>
                <Typography color="text.secondary">/ 5.0</Typography>
              </Box>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                PENDING JOBS
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {stats.pendingJobs}
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
      </Grid>

      {/* Full-width Chart */}
      <Card
        sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Monthly Earnings
          </Typography>
          <Box sx={{ height: "400px" }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => ` $${ctx.raw.toLocaleString()}`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: theme.palette.divider },
                    ticks: {
                      callback: (value) => `$${value.toLocaleString()}`,
                    },
                  },
                  x: {
                    grid: { display: false },
                  },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </DashboardContainer>
  );
};

export default TechnicianDashboard;
