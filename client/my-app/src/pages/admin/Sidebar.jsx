import React from 'react'
import "./sidebar.css"
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddchartIcon from '@mui/icons-material/Addchart';
import { Link, Outlet } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <Link to="/admin/dashboard" style={{textDecoration:"none",color:"white"}}><SpaceDashboardIcon className="icon" /></Link>
        <Link to="/admin/dashboard" style={{textDecoration:"none",color:"white"}}><span>Dashboard</span></Link>
      </div>
      <div className="sidebar-item">
      <Link to="/admin/course" style={{textDecoration:"none",color:"white"}}><AddchartIcon className="icon" /></Link>
      <Link to="/admin/course" style={{textDecoration:"none",color:"white"}}><span>Courses</span></Link>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Sidebar
