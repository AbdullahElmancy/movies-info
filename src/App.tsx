import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import style from './App.module.css'
import Home from './pages/Home'
const router =createBrowserRouter([])
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
