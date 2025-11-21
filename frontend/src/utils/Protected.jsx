import { Outlet,Navigate } from "react-router-dom"

function Protected(props) {
    const authorizedUser = props.authorizedUser
  return (
    <div>
        {authorizedUser ? <Outlet/> : <Navigate to={"/login"}/>}
    </div>
  )
}

export default Protected