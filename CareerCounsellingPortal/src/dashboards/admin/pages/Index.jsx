import { Grid, Paper, Typography } from "@mui/material";
import IndexCSS from "../../../assets/styles/dashboards/admin_css/DashBoard.module.css"; // Check the correct path
import Chart from "./Chart"

export default function Dashboard() {
  const data = [
    { label: "Users", count: 150, icon: "fas fa-users", style: { backgroundColor: '#ffcc80' } },
    { label: "Counselors", count: 25, icon: "fas fa-user-tie", style: { backgroundColor: '#b2dfdb' } },
    { label: "Blogs", count: 100, icon: "fas fa-file-alt", style: { backgroundColor: '#ffcdd2' } },
    { label: "Reviews", count: 300, icon: "fas fa-star", style: { backgroundColor: '#c5cae9' } },
  ];

  return (
    <>
    <Grid container spacing={3}>
      {data.map((item, index) => (
        <Grid key={index} item xs={6} sm={3}>
          <Paper
            elevation={3}
            className={IndexCSS.dashboardItem} // Apply other classes here
            style={item.style} // Apply inline style here
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
    <div style={{margin : "20px"}}/>
    <Chart data = {data}/>
    </>
  );
}
