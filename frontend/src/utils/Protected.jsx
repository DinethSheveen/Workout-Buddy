import { Outlet,Navigate } from "react-router-dom"

function Protected() {
    const authorizedUser = false
  return (
    <div>
        {authorizedUser ? <Outlet/> : <Navigate to={"/login"}/>}
    </div>
  )
}

export default Protected