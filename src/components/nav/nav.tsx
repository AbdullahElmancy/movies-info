import { Link } from 'react-router-dom'
import style from './nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Nav() {
  return (
    <nav className='mb-3'>
      <div className={`${style.container} d-flex align-items-center d-flex justify-content-between p-3`}>
        <div className={style.links}>
          <Link className={`${style.link} px-2`} to={"/home"}>Home</Link>
          <Link className={`${style.link} px-2`} to={"/tv"}>Tv</Link>
          <Link className={`${style.link} px-2`} to={"/movies"}>movies</Link>
        </div>
        <div className={style.logo}>
          <span>ELMANCY</span>
        </div>
        <div className={`${style.socialAuth} d-flex `}>
          <div className={style.social}>
          <Link className={`style.link px-2`} to={""}>
          <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
          </Link>
          <Link className={`style.link px-2`} to={""}>
          <FontAwesomeIcon className={`px-2`} icon={faLinkedin}></FontAwesomeIcon>
          </Link>
          <Link className={`style.link px-2`} to={""}>
          <FontAwesomeIcon className={`px-2`} icon={faGithub}></FontAwesomeIcon>
          </Link>
          </div>
          <div className={style.auth}>
            <Link className={`${style.link} px-2`} to={"/register"}>Sign Up</Link>
            <Link className={`${style.link} px-2`} to={"/login"}>Login</Link>
            <span className={`${style.link} px-2`}>Logout</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav