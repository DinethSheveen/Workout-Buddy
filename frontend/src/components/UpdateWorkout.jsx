import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"

function UpdateWorkout() {

    const id = useParams().id
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [reps, setReps] = useState("")
    const [load, setLoad] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get(`http://localhost:3000/api/workouts/${id}`)

                console.log(response);
                
                setTitle(response.data.data.title)
                setLoad(response.data.data.load)
                setReps(response.data.data.reps)

            } catch (error) {
                console.log(error);
                setSuccess(null)
                setError(error.response.data)
            }
        }

        fetchData()
    },[id])

    const handleSubmit = (e)=>{
        e.preventDefault()

        const updateWorkout = async()=>{
            try {
                const response = await axios.put(`http://localhost:3000/api/workouts/${id}`,{
                    title,
                    reps,
                    load
                })

                setError(null)
                setSuccess(response.data)
                console.log(response);

                setTimeout(()=>{
                    navigate("/dashboard")
                },3000)
                
            } catch (error) {
                console.log(error);
                setSuccess(null)
                setError(error.response.data)
            }
        }

        updateWorkout()
    }

  return (
    <div className='pt-30 w-[80vw] mx-auto mb-10 max-h-100 md:w-[40vw]'>
        <form className='form flex flex-col gap-2 justify-around h-full shadow-2xl shadow-gray-500 rounded-[10px] bg-gray-300 py-4 px-2' onSubmit={handleSubmit}>
            {/* WORKOUT */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='font-bold'>Workout</label>
                <input type="text" id='title' className='text-white bg-gray-400 p-2 rounded-[5px]' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            {/* REPS */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="reps" className='font-bold'>Reps</label>
                <input type="text" id='reps' className='text-white bg-gray-400 p-2 rounded-[5px]' value={reps} onChange={(e)=>{setReps(e.target.value)}}/>
            </div>
            {/* LOAD */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="load" className='font-bold'>Load (in kg)</label>
                <input type="text" id='load' className='text-white bg-gray-400 p-2 rounded-[5px]' value={load} onChange={(e)=>{setLoad(e.target.value)}}/>
            </div>

            <button className='bg-cyan-800 text-white mt-2 p-2 cursor-pointer hover:bg-cyan-700 active:bg-cyan-600 transition-all'>Edit Workout</button>
        </form>
        {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px]'>{error}!</div>:""}
        {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px]'>{success}! Redirecting...</div>:""}
    </div>
  )
}

export default UpdateWorkout