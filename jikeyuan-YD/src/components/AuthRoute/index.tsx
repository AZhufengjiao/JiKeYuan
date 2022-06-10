import {Navigate, RouteProps, useLocation} from "react-router-dom";

function AuthRoute({children}:RouteProps) {
    const location=useLocation()
    const token=localStorage.getItem('geek-yd-token')

    const loginFailure=()=>{
        location.state={
            from:location.pathname
        }
        console.log(location)
        return <Navigate to={'/login'}></Navigate>
    }
    return <div>
        {!token?loginFailure():children }
    </div>
}
export default  AuthRoute
