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
import PrivateAuthsRoute from './components/PrivateRoute/PrivateAuthRoute'
import PrivatePagesRoute from './components/PrivateRoute/PrivatePagesRoute'
const router =createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {element:<PrivatePagesRoute/>,children:[
        {path:"/",element:<Home/>},
        {path:"/home",element:<Home/>},
        {path:"/tv",element:<Tv/>},
        {path:"/movies",element:<Movies/>},
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

```

</details>
<br>

<div align="right">
    <b><a href="#Project-structure">↥ back to top</a></b>
</div>
<br>

# # 2. pages
<details open>
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
<details open>
<summary>register</summary>
every component contain own style sheet
<br>

1. import formik the library make easy to make form in react
without write repeat function
2. axios to fetch data
3. yup to check validate date 
4. useState to put error when we fetch data
5. useNavigate if we success move to home page
<br>
after that write formik that have initial value, validate schema and on submit function
and every input on change there handle change method from formik and on blur handle bluer method formik
<br>

```tsx
//https://backendmovie-fa3a.onrender.com/user/signup
import axios from 'axios';
import style from './register.module.css'
import { Formik } from "formik"; 
import * as Yup from "yup"; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpSchema = Yup.object().shape({ 
  first_name: Yup.string().min(3).required("This field is required"), 
  age: Yup.string().matches(/^(1[5-9]|[2-5][0-9]|60)$/,"Your age must be from 15 to 60").required("This field is required"), 
  last_name: Yup.string().min(3).required("This field is required"), 
  email: Yup.string().email().required("This field is required"),
  password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must at least 8 and have upercase,number,special character").required("This field is required"),

});
function Register() {
  const [error,setError] = useState("")
  const[loding,setLoading] = useState(false)
  let navigate = useNavigate()
  return (
    <div className={`${style.formContainer} d-flex   flex-column p-3 w-50`}>
    <h1 className={`text-center`}>you can sign up here</h1>
    <Formik
      initialValues={{ email: '', password: '',first_name:'',last_name:'',age:'' }}
      validationSchema={SignUpSchema}
      onSubmit={async(values) => {
        setLoading(true)
        axios.post(`https://backendmovie-fa3a.onrender.com/user/signup`,values).then(function () {
          navigate("/")
          setLoading(false)
        })
        .catch(function (error) {
          setLoading(false)
          setError(error.response.data.massage)          
        })
        
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className={`d-flex flex-column`} onSubmit={handleSubmit}>
          <div className={`mb-3`}>
          <label htmlFor="first_name" className="form-label">Fisrst Name</label>
          <input 
            className={`form-control`}
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.first_name}
          />
          {errors.first_name && touched.first_name && <p className={style.errorV}>{errors.first_name}</p>}
          </div>
          <div className={`mb-3`}>
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input 
            className={`form-control`}
            type="text"
            name="last_name"
            id="last_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.last_name}
          />
          {errors.last_name && touched.last_name && <p className={style.errorV}>{errors.last_name}</p>}
          </div>
          <div className={`mb-3`}>
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            className={`form-control`}
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && <p className={style.errorV}>{errors.email}</p>}
          </div>
          <div className={`mb-3`}>
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            className={`form-control`}
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && <p className={style.errorV}>{errors.password}</p>}
          </div>
          <div className={`mb-3`}>
          <label htmlFor="age" className="form-label">Age</label>
          <input 
            className={`form-control`}
            type="text"
            name="age"
            id="age"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.age}
          />
          {errors.age && touched.age && <p className={style.errorV}>{errors.age}</p>}
          </div>
          <button type="submit" className={`btn mb-3 ${style.btnForm}`} disabled={isSubmitting}>
            {loding?"Wait untill loading":"Submit"}
          </button>
          {error && <p className={style.errorV}>{error}</p>}
        </form>
      )}
    </Formik>
  </div>
  )
}

export default Register
```
<br>
another part using bootstrap and css module to style and lay out the component 

```css
.formContainer{
    border: none;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    background-color:rgba(6, 125, 172, 0.2);
}

.btnForm{
    background-color:rgba(15, 180, 187, 1);
    color: var(--textColor);
}

.btnForm:hover{
    background-color:rgba(15, 181, 187, 0.448);
    color: var(--textColor);
}

.errorV{
    color: rgba(15, 180, 187, 1);
    margin-top: .5rem;
}
```

</details>
<br>
<details>
<summary>signin</summary>
put email and password if you pass validate and fetch data success you will move to home page if not error will appear as
and function smiler to register component the difference the number input and on submit function

```tsx
import axios from 'axios';
import style from './signin.module.css'
import { Formik } from "formik"; 
import * as Yup from "yup"; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken } from '../../store/tokenSlice';

const SignUpSchema = Yup.object().shape({ 
  email: Yup.string().email().required("This field is required"),
  password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must at least 8 and have upercase,number,special character").required("This field is required"),
});
function SignIn() {
  const [error,setError] = useState("")
  const dispatch = useDispatch()
  const[loding,setLoading] = useState(false)
  let navigate = useNavigate()
  return (
    <div className={`${style.formContainer} d-flex   flex-column p-3 w-50`}>
    <h1 className={`text-center`}>you can sign in here</h1>
    <Formik
      initialValues={{ email: '', password: ''}}
      validationSchema={SignUpSchema}
      onSubmit={async(values) => {
        setLoading(true)
        axios.post(`https://backendmovie-fa3a.onrender.com/user/signin`,values).then(function (res) {
          localStorage.setItem("token",res.data.token)
          dispatch(getToken())
          navigate("/")
          setLoading(false)
        })
        .catch(function (error) {
          setLoading(false)
          setError(error.response.data.massage)          
        })
        
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className={`d-flex flex-column`} onSubmit={handleSubmit}>
          <div className={`mb-3`}>
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            className={`form-control`}
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && <p className={style.errorV}>{errors.email}</p>}
          </div>
          <div className={`mb-3`}>
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            className={`form-control`}
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && <p className={style.errorV}>{errors.password}</p>}
          </div>
          <button type="submit" className={`btn mb-3 ${style.btnForm}`} disabled={isSubmitting}>
            {loding?"Wait untill loading":"Submit"}
          </button>
          <Link className={`mt-1 ${style.register}`} to={"/signup"}>if you don't exist go to sign up</Link>
          {error && <p className={style.errorV}>{error}</p>}
        </form>
      )}
    </Formik>
  </div>
  )
}

export default SignIn
```
<br>
and the part of css

```css
.formContainer{
    border: none;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    background-color:rgba(6, 125, 172, 0.2);
}

.btnForm{
    background-color:rgba(15, 180, 187, 1);
    color: var(--textColor);
}

.btnForm:hover{
    background-color:rgba(15, 181, 187, 0.448);
    color: var(--textColor);
}

.errorV{
    color: rgba(15, 180, 187, 1);
    margin-top: .5rem;
}
.register{
    color: rgba(15, 180, 187, 1);
    margin-top: .5rem;
}
```
</details>
<br>
<details>
<summary>nav</summary>

first import
1. Link this built in react dom for anchor
2. FontAwesomeIcon to use it for icon
3. this some icon we use it in nav faFacebook, faLinkedin, faGithub

the nav bar have three part 
1. pages like movies ,tv, home
2. logo span elmancy
3. icon and authlink

```tsx
import { Link, useNavigate } from 'react-router-dom'
import style from './nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getToken } from '../../store/tokenSlice';

function Nav() {
  const dispatch = useDispatch()
  const islogin = useSelector((state:RootState)=>state.tokenReducer.islogin)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    dispatch(getToken())
    navigate("/login")
  }
  return (
    <nav className='mb-3'>
      <div className={`${style.container} d-flex align-items-center d-flex justify-content-between p-3`}>
      {islogin?<>
        <div className={style.links}>

            <Link className={`${style.link} px-2`} to={"/home"}>Home</Link>
          <Link className={`${style.link} px-2`} to={"/tv"}>Tv</Link>
          <Link className={`${style.link} px-2`} to={"/movies"}>movies</Link>
        </div>
        </>:""}
        <div className={style.logo}>
          <span>ELMANCY</span>
        </div>
        <div className={`${style.socialAuth} d-flex `}>
          <div className={style.social}>
          <Link className={`style.link px-2`} to={"https://www.facebook.com/profile.php?id=100089417905304"}>
          <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
          </Link>
          <Link className={`style.link px-2`} to={"https://www.linkedin.com/in/abdalla-elmancy-221241224/"}>
          <FontAwesomeIcon className={`px-2`} icon={faLinkedin}></FontAwesomeIcon>
          </Link>
          <Link className={`style.link px-2`} to={"https://github.com/AbdullahElmancy/movies-info"}>
          <FontAwesomeIcon className={`px-2`} icon={faGithub}></FontAwesomeIcon>
          </Link>
          </div>
          <div className={style.auth}>
            {islogin?<>
              <span className={`${style.link} px-2`} onClick={handleLogout}>Logout</span>
            </>:<>
            <Link className={`${style.link} px-2`} to={"/login"}>Login</Link>
            <Link className={`${style.link} px-2`} to={"/signup"}>Sign Up</Link>
            </>}

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
```

and this css module
```css
nav{
    width: 100%;
}

.link{
    font-size: 1rem;
    cursor: pointer;
}
.logo{
    font-size: 20px;
    font-weight: bold;
    color: rgba(15, 180, 187, 1);
}

```
</details>
<br>
<details>
<summary>footer</summary>
there only p item center contain copyright

```tsx
function Footer() {
  return (
    <footer className={`p-3 mt-3`}> 
    <p className="text-center">Create by Abdallah Elmancy</p>
    </footer>
  )
}

export default Footer
```
</details>
<br>
<details>
<summary>Guard Route</summary>
there are two component one for pages like home tv movies
<br> another one for login and register
<br> page guard don't allow navigate to page unless you are login if not navigate to login

```tsx
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../store/tokenSlice";
import { useEffect } from "react";

function PrivatePagesRoute() {
    const dispatch = useDispatch()
    const islogin = useSelector((state:RootState)=>state.tokenReducer.islogin)
    useEffect(()=>{
        dispatch(getToken())
    },[islogin,dispatch])

    return islogin ? <Outlet /> : <Navigate to={"/login"} replace />;
}

export default PrivatePagesRoute
```
<br> auth guard if not login allow if not nvigate to home page

```tsx
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "../../store/tokenSlice";
import { useEffect } from "react";

function PrivateAuthsRoute() {
    const dispatch = useDispatch()
    const islogin = useSelector((state:RootState)=>state.tokenReducer.islogin)
    useEffect(()=>{
        dispatch(getToken())
    },[islogin,dispatch])
    
    return islogin == false ? <Outlet /> : <Navigate to={"/"} replace />;

}

export default PrivateAuthsRoute
```
</details>
<br>
<div align="right">
    <b><a href="#Project-structure">↥ back to top</a></b>
</div>
<br>

# # 4. assets
<details open>
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
<details open>
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
        islogin:boolean
}
const initialState : Itoken = {
    email: "",
    name: "",
    age: "",
    islogin:false,
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
                state.islogin = true
            }else{
                state.islogin = false
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
<details open>
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

