import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import profileIcon from "../../public/logo.jpg"
import { formatUsername } from "../utils/formatUsername"

function Navbar({authorizedUser,loggedIn}) {

  const [name, setName] = useState(null)

  const navigate = useNavigate()

  useEffect(()=>{
    const handleName = ()=>{
      if(loggedIn){
        const username = JSON.parse(authorizedUser).username
      
        setName(formatUsername(username))
      }  
    }
    handleName()
  },[authorizedUser,loggedIn])

  const handleNavigate = ()=>{
    if(loggedIn){
      navigate("/")
    }
  }

  return (
    // NAVBAR
    <div className="navbar">
        {/* FLEX CONTAINER */}
        <div className="fixed w-full text-white px-3 py-4 md:px-10">
          <div className="flex justify-between gap-5 items-center font-bold border-2 border-white rounded-full py-2 px-4">
            {/* LEFT SECTION */}
            <p className="text-2xl cursor-pointer md:text-3xl" onClick={handleNavigate}>Workout Buddy</p>

            {/* MIDDLE SECTION */}
            <div className="flex items-center gap-3">
              <Link to={"/"}>Home</Link>
              <Link to={"/my-workouts"}>My-Workouts</Link>
            </div>

            {/* RIGHT SECTION */}
            <div>
              {
                loggedIn?
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={()=>navigate("/profile")}>
                    <p className="text-transparent bg-linear-to-r from-gray-300 to-gray-400 bg-clip-text"> {name}</p>
                    <img src={profileIcon} className="w-10 rounded-full h-10"/>
                  </div>
                </div>
                :
              <p className="text-transparent bg-linear-to-r from-gray-300 to-gray-400 bg-clip-text">Create your own workout space</p>
              } 
            </div>
          </div>
          </div>
    </div>
  )
}

export default Navbar