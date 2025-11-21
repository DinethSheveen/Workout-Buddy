import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import UpdateWorkout from "./components/UpdateWorkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Protected from "./utils/Protected"
import { useState } from "react"

function App() {

  const [authorizedUser, setAuthorizedUser] = useState({login:false,user:""})

  return (
    <>
      <BrowserRouter>
        <Navbar authorizedUser={authorizedUser}/>
        <Routes>
          <Route path="/login" element={<Login setAuthorizedUser={setAuthorizedUser}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<Protected authorizedUser={authorizedUser}/>}>
            <Route path="/" element={<Home authorizedUser={authorizedUser}/>}/>
            <Route path="/update-workout/:id" element={<UpdateWorkout/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App