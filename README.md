<!-- 
<details>
<summary></summary>
</details>
<br>
 -->
# Movie Info
This project have all movie and tv show can make profile to it and see the new movie info
to decide what you want watch 

<br>

# Project structure
* *[main](#-1-main)
* *[pages](#-2-pages)
* *[components](#-3-components)
* *[assets](#-4-assets)
* *[store](#-5-store)
* *[styles](#-6-styles)
* *[public](#-7-public)
<br>

# # 1. main

<details open>
<summary>index.html</summary>
Here we wite meta data like description of project and key words... <br> and also div id root that core in this react 
and script connect with main.tsx

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/elmancylogo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="movie review app">
    <meta name="keywords" content="movie, review, tv, show, series, film, cinema, rating">
    <meta http-equiv="X-UA-Compatible" content="IE=7">
    <meta name="author" content="Elmancy"> 
    <title>Movie Review</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

</details>
<br>
<details>
<summary>main.tsx</summary>
here we create root of the project you render app wrapped by
the redux provider to so that can we can access all state and method from redux into all pages

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/index.css'
import App from './App.tsx'
import { store } from './store/store.ts';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
```
</details>
<br>

<details>
<summary>RootLayout.tsx</summary>
we make public shared components like nav and footer
so we create layout so nav and footer exist in all pages

```tsx
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
```
</details>
<br>
<details>
<summary>app.tsx</summary>
This place we make all routing <br> you will find all route 
inside element called root layout and every path call specific page

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import RootLayout from './rootLayout'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import Tv from './pages/Tv/Tv'
import Movies from './pages/Movies/Movies'
import Notfound from './pages/Notfound/Notfound'
const router =createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/home",element:<Home/>},
      {path:"/tv",element:<Tv/>},
      {path:"/movies",element:<Movies/>},
      {path:"/signup",element:<SignUp/>},
      {path:"/login",element:<Login/>},
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

```

</details>
<br>

<div align="right">
    <b><a href="#Project-structure">↥ back to top</a></b>
</div>
<br>

# # 2. pages
<details>
<summary>Home</summary>
</details>
<br>
<details>
<summary>Login</summary>
This page response for login

```tsx
import SignIn from '../../components/singin/SignIn'
import style from './login.module.css'
function Login() {
  return (
    <section className={`d-flex justify-content-center align-items-center ${style.main}`}>
        <SignIn/>
    </section>  )
}

export default Login
```

and here style 

```css
.main{
    height: 100vh;
    width: 100%;
}
```
</details>
<br>
<details>
<summary>SignUp</summary>
This page responsible for sign up

```tsx
import Register from "../../components/register/register"
import style from './signup.module.css'
function SignUp() {
  return (
    <section className={`d-flex justify-content-center align-items-center ${style.main}`}>
        <Register/>
    </section>
  )
}

export default SignUp
```

and some style for page
```css
.main{
    height: 100vh;
    width: 100%;
}
```
</details>
<br>
<details>
<summary>Movies</summary>
</details>
<br>
<details>
<summary>Tv</summary>
</details>
<br>
<details>
<summary>NotFound</summary>
</details>
<br>
<div align="right">
    <b><a href="#Project-structure">↥ back to top</a></b>
</div>
<br>

# # 3. components
<div align="right">
    <b><a href="#Project-structure">↥ back to top</a></b>
</div>
<br>

# # 4. assets
<details>
<summary>Fonts</summary>
we have to fonts for this web site
1. LibreBaskerville
2. Cinzel-Regular
</details>
<br>
<div align="right">
    <b><a href="#Project-structure">↥ back to top</a></b>
</div>
<br>

# # 5. store
<details>
<summary>store.ts</summary>
this place setup configuration of redux 
and configuration have reducer collect of slice 
and type for type script project

```ts
import {configureStore} from '@reduxjs/toolkit'
import tokenReducer from './tokenSlice'
export const store = configureStore({
    reducer:{
        tokenReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

```

</details>
<br>
<details>
<summary>token slice</summary>
after login we store token in local host so we need use it in multiple page and the function same in all pages so we make slice in redux allow us use state and function about it any where<br>
first create interface to dedicate type initial value state
and then make initial value and create slice every slice have
name , initial value, and reducers. reducer hav methods deal with state 

```ts
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface Itoken {
        email:string,
        age:string,
        name:string,
}
const initialState : Itoken = {
    email: "",
    name: "",
    age: ""
}
const tokenSlice = createSlice({
    name:"tokens",
    initialState,
    reducers:{
        getToken:(state)=>{
            let decode = localStorage.getItem("token")
            if(decode !== null){
                const decodetoken:Itoken = jwtDecode(decode)
                state.email = decodetoken.email
                state.age = decodetoken.age
                state.name = decodetoken.name
                
            }

        }
    }
})

export const{getToken} = tokenSlice.actions
export default tokenSlice.reducer
```
</details>
<br>
<div align="right">
    <b><a href="#Project-structure">↥ back to top</a></b>
</div>
<br>

# # 6. styles
<details>
<summary>index.css</summary>
This css sheet have a global styles

```css
:root{
  --bg:#023D54;
  --textColor:rgba(240, 255, 240, 1)
}
@font-face {
  font-family: forPragraph;
  src: url("../assets/Fonts/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: forHeadline;
  src: url("../assets/Fonts/Cinzel-Regular.ttf");
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family:forPragraph,'Times New Roman', Times, serif;
  background-color:var(--bg);
  color: var(--textColor);
}
h1,h2,h3,h4,h5,h6{
  font-family:forHeadline,Verdana, Geneva, Tahoma, sans-serif;
}

a{
  color: var(--textColor);
  text-decoration: none;
}
```
</details>
<br>
<div align="right">
    <b><a href="#Project-structure">↥ back to top</a></b>
</div>
<br>

# # 7.public
There svg icon for fev icon that show in web browser
<div align="right">
    <b><a href="#Project-structure">↥ back to top</a></b>
</div>
<br>

