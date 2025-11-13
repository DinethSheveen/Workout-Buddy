import { Link } from "react-router-dom"

function Navbar() {
  return (
    // NAVBAR
    <div className="navbar">
        {/* FLEX CONTAINER */}
        <div className="flex justify-between items-center text-white bg-cyan-800 font-bold fixed w-full px-10 py-5">
            <Link to={"/"} className="text-3xl">Workout Buddy</Link>
        </div>
    </div>
  )
}

export default Navbar