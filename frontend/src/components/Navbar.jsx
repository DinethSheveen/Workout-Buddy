import { Link } from "react-router-dom"

function Navbar({authorizedUser}) {
  
  let displayName;

  if(authorizedUser){
    const username = JSON.parse(authorizedUser).username
    
    const formatUsername = (username)=>{
      const firsLetter = username.charAt(0)
      const formattedName = firsLetter.toUpperCase() + username.slice(1)
      return formattedName 
    }
    displayName = formatUsername(username)
  }
  
  
  

  return (
    // NAVBAR
    <div className="navbar">
        {/* FLEX CONTAINER */}
        <div className="flex justify-between items-center text-white bg-cyan-800 font-bold fixed w-full px-10 py-5">
          {/* LEFT SECTION */}
          <Link to={"/"} className="text-3xl">Workout Buddy</Link>

          {/* RIGHT SECTION */}
          <div>
            <p>{authorizedUser && `Hello ${displayName}!`}</p>
          </div>
        
        </div>
    </div>
  )
}

export default Navbar