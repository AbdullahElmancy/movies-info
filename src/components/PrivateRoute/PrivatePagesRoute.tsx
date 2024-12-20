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