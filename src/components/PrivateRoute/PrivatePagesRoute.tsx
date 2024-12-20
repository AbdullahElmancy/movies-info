import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../store/tokenSlice";

function PrivatePagesRoute() {
    const dispatch = useDispatch()
    dispatch(getToken())
    const islogin = useSelector((state:RootState)=>state.tokenReducer.islogin)


    return islogin ? <Outlet /> : <Navigate to={"/login"} replace />;
}

export default PrivatePagesRoute