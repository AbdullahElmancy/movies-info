import React from 'react'
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div>
        <Nav/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default RootLayout