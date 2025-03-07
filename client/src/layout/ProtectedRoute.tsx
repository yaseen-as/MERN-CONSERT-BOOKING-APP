import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute() {
    const {isAuthenticated,isLoading}=useSelector((state:RootState)=>state.user)
    if (isLoading) {
      return null;
    }
    if (isAuthenticated) {
      return <Outlet />;
    }
    return <Navigate to="/" replace />;
}

export default ProtectedRoute
