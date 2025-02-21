import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

const orderData = [1200, 1350, 1800, 1600, 2100, 2500, 3000]; // Orders per day
const revenueData = [3000, 3500, 4000, 4500, 5000, 6000, 7000]; // Revenue per day
const deliveryTimeData = [30, 28, 35, 32, 30, 28, 27]; // Average delivery time in minutes
const usersData = [1000, 1500, 2000, 2500, 3000, 3500, 4000]; // New users per day
const pageViewsData = [5000, 4500, 6000, 7000, 7500, 8000, 8500]; // Page views

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Days of the week

export default function Analytics() {
  return (
    <div>
      <h1>Admin Analytics Dashboard</h1>
      
      {/* Line Chart for Orders and Revenue */}
      <h3>Orders vs Revenue</h3>
      <LineChart
        width={600}
        height={300}
        series={[
          { data: orderData, label: 'Orders' },
          { data: revenueData, label: 'Revenue' },
        ]}
        xAxis={[{ scaleType: 'point', data: labels }]}
      />

      {/* Bar Chart for Delivery Time vs Users */}
      <h3>Delivery Time vs Users</h3>
      <BarChart
        xAxis={[{ scaleType: 'band', data: labels }]}
        series={[
          { data: deliveryTimeData, label: 'Avg Delivery Time (min)' },
          { data: usersData, label: 'New Users' },
        ]}
        width={600}
        height={300}
      />

      {/* Line Chart for Page Views vs New Users */}
      <h3>Page Views vs New Users</h3>
      <LineChart
        width={600}
        height={300}
        series={[
          { data: pageViewsData, label: 'Page Views' },
          { data: usersData, label: 'New Users' },
        ]}
        xAxis={[{ scaleType: 'point', data: labels }]}
      />
    </div>
  );
}
