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