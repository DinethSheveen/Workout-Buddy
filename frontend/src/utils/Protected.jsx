import { Outlet,Navigate } from "react-router-dom"

function Protected({authorizedUser}) {

  return (
    <div>
        {authorizedUser ? <Outlet/> : <Navigate to={"/login"}/>}
    </div>
  )
}

export default Protected