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
            <Link className={`${style.link} px-2`} to={"/register"}>Sign Up</Link>
            </>}

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav