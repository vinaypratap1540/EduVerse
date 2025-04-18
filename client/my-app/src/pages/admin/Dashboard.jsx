import React from "react";
import { useGetPurchasedCoursesQuery } from "../../features/api/purchaseApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardContent } from "@mui/material";
import "./dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1 className="error-message">Failed to get purchased courses</h1>;

  // Ensure data is correctly structured
  const purchasedCourse = Array.isArray(data?.purchasedCourse) ? data.purchasedCourse : [];

  // Format data for chart
  const courseData = purchasedCourse.map((course) => ({
    name: course?.courseId?.title || "Unknown",
    price: course?.courseId?.coursePrice || 0,
  }));

  // Calculate total revenue and sales
  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element?.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  return (
    <div className="dashboard-container">
      <div className="dashContainer">
      <div className="stat-box">
        <button type="button" className="stat-card">
          Total Sales
          <span className="stat-value">{totalSales}</span>
        </button>
      </div>

      <div className="stat-box">
        <button type="button" className="stat-card">
          Total Revenue
          <span className="stat-value">₹{totalRevenue}</span>
        </button>
      </div>
      </div>

      <Card className="chart-card">
        <CardHeader title="Course Prices" className="chart-header" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" angle={-30} textAnchor="end" interval={0} />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value) => [`₹${value}`]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2"
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

