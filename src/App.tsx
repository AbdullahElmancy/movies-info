import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import RootLayout from './rootLayout'
import NotFound from './components/notfound/NotFound'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
const router =createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/home",element:<Home/>},
      {path:"/tv",element:<Home/>},
      {path:"/movies",element:<Home/>},
      {path:"/signup",element:<SignUp/>},
      {path:"/login",element:<Login/>},
      {path:"*",element:<NotFound/>},

    ]
  }
 

])
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
