import React from 'react'
import Navbar from '../pages/Navbar.jsx'
import {Outlet} from 'react-router-dom'
const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
