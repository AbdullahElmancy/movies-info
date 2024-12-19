import { useSelector } from "react-redux"
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { getToken } from "../../store/tokenSlice";

function Home() {
  const dispatch = useDispatch()
  dispatch(getToken())
  const userName = useSelector((state:RootState)=>state.tokenReducer.name)
  
  return (
<>
<section>
  <h1>{userName}</h1>
</section>
</>
  )
}

export default Home