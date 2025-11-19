import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import UpdateWorkout from "./components/UpdateWorkout"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/update-workout/:id" element={<UpdateWorkout/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App