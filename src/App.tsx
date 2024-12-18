import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import RootLayout from './rootLayout'
import NotFound from './components/notfound/NotFound'
const router =createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/home",element:<Home/>},
      {path:"/tv",element:<Home/>},
      {path:"/movies",element:<Home/>},
      {path:"/register",element:<Home/>},
      {path:"/login",element:<Home/>},
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
