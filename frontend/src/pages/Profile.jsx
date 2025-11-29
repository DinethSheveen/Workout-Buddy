import { Link, useNavigate} from "react-router-dom"
import profileIcon from "../../public/logo.jpg"
import { formatUsername } from "../utils/formatUsername"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import axios from "axios"

function Profile({setLoggedIn,setAuthorizedUser}) {

    const [information, setInformation] = useState({
        userId:"",
        name:"",
        username:"",
        email:"",
        workouts:[]
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()

    const joinedDate = dayjs(JSON.parse(localStorage.getItem("user")).createdAt).format("DD MMMM YYYY")
    const userId = JSON.parse(localStorage.getItem("user"))._id

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${userId}`)

                setInformation(prevInformation=>({...prevInformation,
                    userId : response.data.user._id,
                    name: response.data.user.name,
                    username : response.data.user.username,
                    email : response.data.user.email,
                    workouts : response.data.user.workouts.length
                }))

            } catch (error) {
                console.log(error.message);
            }
        }
        fetchUser()
    },[userId])

    const handleAccountDelete = async()=>{
        const userId = JSON.parse(localStorage.getItem("user"))._id

        try {
            const response = await axios.delete(`http://localhost:3000/api/users/${userId}`)

            setSuccess(response.data.message);
            
            setLoggedIn(false)
            setAuthorizedUser(null)
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            navigate("/login")
        } catch (error) {
            setError(error.data);
        }
    }

  return (
    <div className='pt-30 min-h-screen 2xl:pt-50'>
        <div className="flex flex-col sm:max-w-[70%] mx-auto px-8 md:px-0">
            {/* USERNAME AND IMAGE*/}
            <div className="flex flex-col items-center gap-2 bg-cyan-700 rounded-t-xl text-white py-4 2xl:text-4xl 2xl:gap-4 2xl:rounded-t-3xl">
                <img src={profileIcon} className="rounded-full w-50 h-50 mx-auto p-2 border-2 border-cyan-400 2xl:w-100 2xl:h-100" />
                <p className="text-2xl font-bold 2xl:text-4xl">{formatUsername(information.name)}</p>
                <p>Member since : {joinedDate}</p>
            </div>
            {/* USER DETAILS */}
            <div className="flex flex-col gap-3 px-5 bg-white rounded-b-xl py-4 2xl:text-4xl 2xl:gap-10 2xl:rounded-b-3xl 2xl:py-7">
                {/* USER ID */}
                <p>User Id : {information.userId}</p>
                {/* EMAIL */}
                <div className="flex flex-col justify-between items-start md:flex-row md:items-center">
                    <p>Email : {information.email}</p>
                    <Link to={"/update-profile"} className="text-cyan-700 hover:text-cyan-500 cursor-pointer">Change Email</Link>
                </div>
                {/* USERNAME */}
                <div className="flex flex-col justify-between items-start md:flex-row md:items-center">
                    <p>Username : {information.username}</p>
                    <Link to={"/update-profile"} className="text-cyan-700 hover:text-cyan-500 cursor-pointer">Change Username</Link>
                </div>
                {/* TOTAL WORKOUTS */}
                <div className="flex flex-col justify-between items-start md:flex-row md:items-center">
                    <p>Workout Count : {information.workouts}</p>
                    <Link to={"/my-workouts"} className="text-cyan-700 hover:text-cyan-600 cursor-pointer">Add Workout</Link>
                </div>
                {/* DELETE ACCOUNT */}
                <Link to={"/login"} onClick={handleAccountDelete} className="bg-red-600 text-white py-3 text-center hover:bg-red-500 active:bg-red-300">Delete Account</Link>
            </div>
            {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px]'>{error}!</div>:""}
            {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px]'>{success}!. Redirecting...</div>:""}
        </div> 
    </div>
  )
}

export default Profile