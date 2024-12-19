import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div >
        <Nav/>
        <div className="container">
        <Outlet />
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout