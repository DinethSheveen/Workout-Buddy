import { useEffect, useState } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import { HiMenuAlt3 } from "react-icons/hi";
import { formatUsername } from "../utils/formatUsername"
import { IoIosArrowDropdown } from "react-icons/io";

function Navbar({authorizedUser,loggedIn,setLoggedIn}) {

  // NAME OF THE USER
  const [name, setName] = useState(null)
  // SET DROPDOWN VISIBLE 
  const [dropdown,setDropdown] = useState(false)

  const navigate = useNavigate()

  const handleLogout = ()=>{
      setLoggedIn(false)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/login")
  }

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
      navigate("/login")
    }
  }

  const showSettings = ()=>{
    setDropdown(prevDropdown => !prevDropdown)
  }

  return (
    // NAVBAR
    <div className="navbar relative">
        {/* FLEX CONTAINER */}
        <div className="fixed w-full bg-transparent backdrop-blur-3xl text-white px-3 py-4 md:px-10">
          {/* OUTER CONTAINER */}
          <div className="2xl:mx-auto 2xl:max-w-[1400px] 2xl:py-5">
            <div className="flex justify-between gap-5 items-center font-bold border-2 border-gray-400 rounded-full py-2 px-4 2xl:px-8 2xl:text-4xl 2xl:border-4">
            {/* LEFT SECTION */}
            <p className="text-2xl cursor-pointer md:text-3xl text-transparent bg-clip-text bg-linear-to-r from-[#696bcc] to-gray-500 2xl:py-3 2xl:text-5xl" onClick={handleNavigate}>Workout Buddy</p>

            {/* RIGHT SECTION */}
            <div>
              {
                loggedIn?
                
                  <div >
                    <div className="hidden md:flex md:items-center md:gap-5 md:cursor-pointer">
                      <NavLink to={"/"} className={({isActive})=>
                        isActive? 
                          "text-[#696bcc]" : ""
                      }>
                        Home
                      </NavLink>
                      <NavLink to={"/my-workouts"} className={({isActive})=>
                        isActive?
                          "text-[#696bcc]" : ""
                      }>
                        My-Workouts
                      </NavLink>
                      <div className="hidden md:flex md:items-center md:justify-center md:gap-1" onClick={showSettings}>
                        <p className="text-transparent bg-linear-to-r from-gray-300 to-gray-400 bg-clip-text"> {name}</p>
                        <IoIosArrowDropdown className="text-2xl"/>
                        {/* SELECT BOX */}
                        <div className={dropdown?"absolute top-20 right-13 flex flex-col bg-gray-900":"hidden top-0"}>
                            <p className="px-8 py-4 hover:bg-gray-700 active:bg-gray-600" onClick={()=>navigate("/profile")}>Profile</p>
                            <p className="px-8 py-4 hover:bg-gray-700 active:bg-gray-600" onClick={handleLogout}>Logout</p>
                        </div>
                      </div>
                    </div>
                    
                    <HiMenuAlt3 className="text-3xl md:hidden"/>
                  </div>
                :
              <p className="text-transparent bg-linear-to-r from-gray-300 to-gray-400 bg-clip-text">Create your own workout space</p>
              } 
            </div>
          </div>
          </div>
          </div>
    </div>
  )
}

export default Navbar