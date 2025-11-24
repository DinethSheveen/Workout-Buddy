import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Navbar({authorizedUser,loggedIn,setLoggedIn}) {

  const [name, setName] = useState(null)

  const navigate = useNavigate()

  useEffect(()=>{
    const handleName = ()=>{
      if(loggedIn){
        const username = JSON.parse(authorizedUser).username
        
        const formatUsername = (username)=>{
          const firsLetter = username.charAt(0)
          const formattedName = firsLetter.toUpperCase() + username.slice(1)
          return formattedName 
        }
        setName(formatUsername(username))
      }  
    }
    handleName()
  },[authorizedUser,loggedIn])

  const handleLogout = ()=>{
    setLoggedIn(false)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

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
                <p className="text-transparent bg-linear-to-r from-gray-300 to-gray-400 bg-clip-text"> Hello {name}</p>
                <p className="border border-cyan-400 text-cyan-400 text-center cursor-pointer px-2 py-1 hover:text-cyan-300 hover:border-cyan-300 active:text-cyan-200 active:border-cyan-200" onClick={handleLogout}>Log Out</p> 
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