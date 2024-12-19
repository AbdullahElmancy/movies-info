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