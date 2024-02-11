import React, { useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IndexCSS from "../../../assets/styles/dashboards/admin_css/DashBoard.module.css";
import Chart from "./Chart";
import {
  fetchUserCount,
  fetchBlogsCount,
  fetchCounsellorsCount,
  fetchReviewsCount,
} from "../../../features/dashboards/admin/adminDashboard/dashboardSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  // Fetch counts from the Redux store
  useEffect(() => {
    dispatch(fetchUserCount());
    dispatch(fetchBlogsCount());
    dispatch(fetchCounsellorsCount());
    dispatch(fetchReviewsCount());
  }, [dispatch]);

  // Get counts from the Redux store
  const userCount = useSelector((state) => state.dashboard.userCount);
  const blogsCount = useSelector((state) => state.dashboard.blogsCount);
  const counsellorsCount = useSelector((state) => state.dashboard.counsellorsCount);
  const reviewsCount = useSelector((state) => state.dashboard.reviewsCount);
  console.log(userCount, counsellorsCount, reviewsCount, blogsCount)

  const data = [
    { label: "Users", count: userCount, icon: "fas fa-users", style: { backgroundColor: '#ffcc80' } },
    { label: "Counselors", count: counsellorsCount, icon: "fas fa-user-tie", style: { backgroundColor: '#b2dfdb' } },
    { label: "Blogs", count: blogsCount, icon: "fas fa-file-alt", style: { backgroundColor: '#ffcdd2' } },
    { label: "Reviews", count: reviewsCount, icon: "fas fa-star", style: { backgroundColor: '#c5cae9' } },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid key={index} item xs={6} sm={3}>
            <Paper
              elevation={3}
              className={IndexCSS.dashboardItem}
              style={item.style}
            >
              <i className={`${item.icon}`}></i>
              <Typography variant="h6" gutterBottom>
                {item.label}
              </Typography>
              <Typography variant="h4">{item.count}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <div style={{ margin: "20px" }} />
      <Chart data={data} />
    </>
  );
}
