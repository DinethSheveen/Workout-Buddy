import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import UpdateWorkout from "./components/UpdateWorkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Protected from "./utils/Protected"
import Profile from "./pages/Profile"
import UpdateUser from "./components/UpdateUser"
import MyWorkouts from "./pages/MyWorkouts"

function App() {

  const user = localStorage.getItem("user") || null

  const [authorizedUser, setAuthorizedUser] = useState(user)
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"))

  // localStorage.removeItem("user")
  

  return (
    <div className="bg-black min-h-screen">
      <BrowserRouter>
        <Navbar authorizedUser={authorizedUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        <Routes>
          <Route path="/login" element={<Login setAuthorizedUser={setAuthorizedUser} setLoggedIn={setLoggedIn}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<Protected authorizedUser={authorizedUser}/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/my-workouts" element={<MyWorkouts authorizedUser={authorizedUser}/>}/>
            <Route path="/profile" element={<Profile setLoggedIn={setLoggedIn}/>}/>
            <Route path="/update-profile" element={<UpdateUser/>}/>
            <Route path="/update-workout/:id" element={<UpdateWorkout/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App