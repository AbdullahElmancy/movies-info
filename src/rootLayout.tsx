import React from 'react'
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';

function RootLayout({children}:{
    children:React.ReactNode
}) {
  return (
    <div>
        <Nav/>
        {children}
        <Footer/>
    </div>
  )
}

export default RootLayout