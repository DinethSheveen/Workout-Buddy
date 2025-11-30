import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function UpdateUser() {

    const [fields, setFields] = useState({
        name: "",
        username : "",
        email : ""
    })
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const userId = JSON.parse(localStorage.getItem("user"))._id
    useEffect(()=>{
        const fetchData = async()=>{
            
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${userId}`)

                setFields((prevFields)=>({...prevFields,name : response.data.user.name}))
                setFields((prevFields)=>({...prevFields,username : response.data.user.username}))
                setFields((prevFields)=>({...prevFields,email : response.data.user.email}))
                
            } catch (error) {
                console.log(error);
            }
        }      
        fetchData()
    },[userId])

    const handleProfileChange = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:3000/api/users/update-user/${userId}`,{
                name : fields.name.trim(),
                username : fields.username.trim(),
                email : fields.email.trim() 
            })
            setError(null)
            setSuccess(response.data.message);

            setTimeout(()=>{
                navigate("/profile")
            },3000)
            
        } catch (error) {
            setSuccess(null)
            setError(error.response.data.message);
        }
    }

  return (
    <div className='pt-30 w-[80vw] mx-auto mb-10 max-h-100 md:w-[40vw]'>
        <form className='form flex flex-col gap-2 justify-around h-full shadow-2xl bg-[#1a1a1a] rounded-[10px] py-4 px-2 text-white mb-4'>
            {/* NAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="name" className='font-bold'>Name</label>
                <input type="text" id='name' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-400' value={fields.name} onChange={(e)=>{setFields(prevFields => ({...prevFields,name : e.target.value}))}}/>
            </div>
            {/* USERNAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='font-bold'>Username</label>
                <input type="text" id='title' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-400' value={fields.username} onChange={(e)=>{setFields(prevFields => ({...prevFields,username : e.target.value}))}}/>
            </div>
            {/* EMAIL */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="reps" className='font-bold'>Email</label>
                <input type="text" id='reps' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-400' value={fields.email} onChange={(e)=>{setFields(prevFields => ({...prevFields,email : e.target.value}))}}/>
            </div>

            <div className="flex items-center justify-center gap-2">
                <Link to={"/profile"} className='bg-gray-800 text-white rounded-[5px] mt-2 px-4 py-2 cursor-pointer hover:bg-gray-700 active:bg-gray-600 transition-all'>Back</Link>
                <button className='bg-cyan-800 text-white rounded-[5px] mt-2 px-4 py-2 cursor-pointer hover:bg-cyan-700 active:bg-cyan-600 transition-all' onClick={handleProfileChange}>Save Changes</button>
            </div>
        </form>
        {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px]'>{error}!</div>:""}
        {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px]'>{success}! Redirecting...</div>:""}
    </div>
  )
}

export default UpdateUser