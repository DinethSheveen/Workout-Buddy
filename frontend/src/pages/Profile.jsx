import { Link, useNavigate } from "react-router-dom"
import profileIcon from "../../public/logo.jpg"
import { formatUsername } from "../utils/formatUsername"
import dayjs from "dayjs"

function Profile({setLoggedIn}) {

    const navigate = useNavigate()

    const handleLogout = ()=>{
        setLoggedIn(false)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/login")
    }

    const name = formatUsername(JSON.parse(localStorage.getItem("user")).username)
    const joinedDate = dayjs(JSON.parse(localStorage.getItem("user")).createdAt).format("DD MMMM YYYY")
    const userId = JSON.parse(localStorage.getItem("user"))._id
    const email = JSON.parse(localStorage.getItem("user")).email
    const username = JSON.parse(localStorage.getItem("user")).username
    const workouts = JSON.parse(localStorage.getItem("user")).workouts


  return (
    <div className='pt-30 min-h-screen'>

        <div className="flex flex-col max-w-[70%] mx-auto">
            {/* USERNAME AND IMAGE*/}
            <div className="flex flex-col items-center gap-2 bg-cyan-700 rounded-t-xl text-white py-4">
                <img src={profileIcon} className="rounded-full w-50 h-50 mx-auto p-2 border-2 border-cyan-400 " />
                <p className="text-2xl font-bold">{name}</p>
                <p>Member since : {joinedDate}</p>
            </div>
            {/* USER DETAILS */}
            <div className="flex flex-col gap-3 px-5 bg-white rounded-b-xl py-4">
                <p>User Id : {userId}</p>
                <div className="flex justify-between items-center">
                    <p>Email : {email}</p>
                    <p className="text-cyan-700 hover:text-cyan-500 cursor-pointer">Change Email</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Username : {username}</p>
                    <p className="text-cyan-700 hover:text-cyan-500 cursor-pointer">Change Username</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>Workout Count : {workouts.length}</p>
                    <Link to={"/"} className="text-cyan-700 hover:text-cyan-600 cursor-pointer">Add Workout</Link>
                </div>
                <p className="bg-cyan-700 text-white font-bold text-center cursor-pointer py-2 hover:bg-cyan-600 active:bg-cyan-500" onClick={handleLogout}>Log Out</p>
            </div>
        </div> 
    </div>
  )
}

export default Profile