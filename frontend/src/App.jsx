import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import UpdateWorkout from "./components/UpdateWorkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Protected from "./utils/Protected"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<Protected/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/update-workout/:id" element={<UpdateWorkout/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App