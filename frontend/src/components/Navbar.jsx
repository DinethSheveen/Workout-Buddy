import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
        <div className="flex justify-between gap-5 items-center text-white bg-gray-800 font-bold fixed w-full px-3 py-5 md:px-10">
          {/* LEFT SECTION */}
          <p className="text-3xl cursor-pointer" onClick={handleNavigate}>Workout Buddy</p>

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
  )
}

export default Navbar