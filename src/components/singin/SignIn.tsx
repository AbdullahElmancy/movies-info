import axios from 'axios';
import style from './signin.module.css'
import { Formik } from "formik"; 
import * as Yup from "yup"; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpSchema = Yup.object().shape({ 
  email: Yup.string().email().required("This field is required"),
  password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must at least 8 and have upercase,number,special character").required("This field is required"),
});
function SignIn() {
  const [error,setError] = useState("")
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