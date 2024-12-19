import SignIn from '../../components/singin/SignIn'
import style from './login.module.css'
function Login() {
  return (
    <section className={`d-flex justify-content-center align-items-center ${style.main}`}>
        <SignIn/>
    </section>  )
}

export default Login