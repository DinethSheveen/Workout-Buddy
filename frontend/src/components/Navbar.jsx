import { Link } from "react-router-dom"

function Navbar() {
  return (
    // NAVBAR
    <div className="navbar">
        {/* FLEX CONTAINER */}
        <div className="flex justify-between items-center text-white font-bold sticky w-full bg-cyan-700 px-10 py-5">
            <Link to={"/"} className="text-2xl">Workout Buddy</Link>
        </div>
    </div>
  )
}

export default Navbar