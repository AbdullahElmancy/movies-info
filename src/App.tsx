import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import RootLayout from './rootLayout'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import Tv from './pages/Tv/Tv'
import Movies from './pages/Movies/Movies'
import Notfound from './pages/Notfound/Notfound'
import PrivateAuthsRoute from './components/PrivateRoute/PrivateAuthRoute'
import PrivatePagesRoute from './components/PrivateRoute/PrivatePagesRoute'
import Single from './pages/Single/Single'
const router =createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {element:<PrivatePagesRoute/>,children:[
        {path:"/",element:<Home/>},
        {path:"/home",element:<Home/>},
        {path:"/tv",element:<Tv/>},
        {path:"/movies",element:<Movies/>},
        {path:"/single/:type/:id",element:<Single/>},
      ]},
      {element:<PrivateAuthsRoute/>,children:[
        {path:"/signup",element:<SignUp/>},
        {path:"/login",element:<Login/>},
      ]},
      {path:"*",element:<Notfound/>},
    ]
  }
 

])
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
