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