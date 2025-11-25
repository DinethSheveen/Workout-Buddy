import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function UpdateUser() {

    const [fields, setFields] = useState({
        username : "",
        email : ""
    })
    // const [success, setSuccess] = useState(null)

    useEffect(()=>{
        const fetchData = async()=>{
            const userId = JSON.parse(localStorage.getItem("user"))._id
            
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${userId}`)

                setFields((prevFields)=>({...prevFields,username : response.data.user.username}))
                setFields((prevFields)=>({...prevFields,email : response.data.user.email}))
                
            } catch (error) {
                console.log(error);
            }
        }      
        fetchData()
    },[])

    // const handleSubmit = async()=>{
    //     try {
    //         const response = await axios.put()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

  return (
    <div className='pt-30 w-[80vw] mx-auto mb-10 max-h-100 md:w-[40vw]'>
        <form className='form flex flex-col gap-2 justify-around h-full shadow-2xl shadow-gray-500 rounded-[10px] bg-gray-300 py-4 px-2'>
            {/* USERNAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='font-bold'>Username</label>
                <input type="text" id='title' className='text-white bg-gray-400 p-2 rounded-[5px]' value={fields.username} onChange={(e)=>{setFields(prevFields => ({...prevFields,username : e.target.value}))}}/>
            </div>
            {/* EMAIL */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="reps" className='font-bold'>Email</label>
                <input type="text" id='reps' className='text-white bg-gray-400 p-2 rounded-[5px]' value={fields.email} onChange={(e)=>{setFields(prevFields => ({...prevFields,email : e.target.value}))}}/>
            </div>
            {/* PASSWORD */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="load" className='font-bold'>Password</label>
                <input type="text" id='load' className='text-white bg-gray-400 p-2 rounded-[5px]'/>
            </div>

            <div className="flex items-center justify-center gap-2">
                <Link to={"/profile"} className='bg-gray-800 text-white rounded-[5px] mt-2 px-4 py-2 cursor-pointer hover:bg-gray-700 active:bg-gray-600 transition-all'>Back</Link>
                <button className='bg-cyan-800 text-white rounded-[5px] mt-2 px-4 py-2 cursor-pointer hover:bg-cyan-700 active:bg-cyan-600 transition-all'>Save Changes</button>
            </div>
        </form>
        {/* {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px]'>{error}!</div>:""}
        {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px]'>{success}! Redirecting...</div>:""} */}
    </div>
  )
}

export default UpdateUser