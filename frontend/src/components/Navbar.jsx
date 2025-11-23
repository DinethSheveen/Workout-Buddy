import { Link } from "react-router-dom"

function Navbar({authorizedUser}) {
  
  const capitalize = (username)=>{
    const firstLetter = username.charAt(0)
    const name = firstLetter.toUpperCase() + authorizedUser.slice(1)
    return name
  }

  const formatUsername = capitalize(authorizedUser)
  

  return (
    // NAVBAR
    <div className="navbar">
        {/* FLEX CONTAINER */}
        <div className="flex justify-between items-center text-white bg-cyan-800 font-bold fixed w-full px-10 py-5">
          {/* LEFT SECTION */}
          <Link to={"/"} className="text-3xl">Workout Buddy</Link>

          {/* RIGHT SECTION */}
          <div>
            <p>Hello {formatUsername}!</p>
          </div>
        
        </div>
    </div>
  )
}

export default Navbar