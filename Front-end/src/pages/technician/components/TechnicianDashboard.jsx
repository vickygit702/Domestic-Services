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
  useMediaQuery,
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
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  minHeight: "70px", // Reduced height for mobile
}));

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const TechnicianDashboard = () => {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/technician/${id}/dashboard`
        );
        const data = await response.json();
        setStats(data);
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
        <Grid container spacing={isMobile ? 1 : 3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid xs={12} sm={6} md={3} key={item}>
              <Skeleton variant="rounded" height={isMobile ? 100 : 120} />
            </Grid>
          ))}
          <Grid xs={12}>
            <Skeleton variant="rounded" height={isMobile ? 300 : 400} />
          </Grid>
        </Grid>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      {/* Top Stats Row - Modified for mobile */}
      <Grid container spacing={isMobile ? 1 : 3} sx={{ mb: 4 }}>
        {[
          {
            title: "TOTAL EARNINGS",
            value: `$${stats.totalEarnings}`,
            color: "success.main",
          },
          { title: "COMPLETED JOBS", value: stats.completedJobs },
          {
            title: "AVG. RATING",
            value: `${stats.rating}/5.0`,
            color: "warning.main",
          },
          { title: "PENDING JOBS", value: stats.pendingJobs.length || 0 },
        ].map((stat, index) => (
          <Grid size={{ xs: 12, sm: 3 }} key={index}>
            {" "}
            {/* xs={12} sm={6} md={3} */}
            <StatCard>
              <CardContent sx={{ p: isMobile ? 1.5 : 3 }}>
                <Typography
                  variant={isMobile ? "caption" : "subtitle2"}
                  color="text.secondary"
                  sx={{ lineHeight: 1.2 }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant={isMobile ? "h8" : "h4"}
                  sx={{
                    fontWeight: 700,
                    color: stat.color || "text.primary",
                    // mt: isMobile ? 0.5 : 1,
                    ...(isMobile ? { ml: 2 } : { mt: 1 }),
                  }}
                >
                  {stat.value}
                </Typography>
              </CardContent>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      {/* Full-width Chart - Improved mobile responsiveness */}
      <Card
        sx={{
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          height: "100%",
        }}
      >
        <CardContent sx={{ p: isMobile ? 1 : 2 }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 2 }}>
            Monthly Earnings
          </Typography>
          <Box
            sx={{
              height: isMobile ? "300px" : "400px",
              position: "relative",
              marginLeft: isMobile ? "-8px" : 0,
              marginRight: isMobile ? "-8px" : 0,
              width: isMobile ? "calc(100% + 16px)" : "100%",
            }}
          >
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
                      font: {
                        size: isMobile ? 10 : 12,
                      },
                    },
                  },
                  x: {
                    grid: { display: false },
                    ticks: {
                      font: {
                        size: isMobile ? 10 : 12,
                      },
                      maxRotation: isMobile ? 45 : 0,
                      minRotation: isMobile ? 45 : 0,
                    },
                  },
                },
                layout: {
                  padding: isMobile
                    ? {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10,
                      }
                    : 20,
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
