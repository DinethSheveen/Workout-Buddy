import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import Button from './Button'

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
                    navigate("/my-workouts")
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
    <div className='pt-30 w-[80vw] mx-auto mb-10 max-h-100 md:w-[40vw] 2xl:pt-50 2xl:text-4xl'>
        <form className='flex flex-col gap-4 justify-around shadow-lg rounded-[10px] text-white bg-[#1a1a1a] p-6 mb-2 2xl:gap-5 2xl:text-4xl 2xl:p-8' onSubmit={handleSubmit}>
            {/* WORKOUT */}
            <div className='flex flex-col gap-2 2xl:gap-4'>
                <label htmlFor="title" className='font-bold'>Workout</label>
                <input type="text" id='title' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] 2xl:p-4 outline-none focus:ring-2 focus:ring-cyan-400' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            {/* REPS */}
            <div className='flex flex-col gap-2 2xl:gap-4'>
                <label htmlFor="reps" className='font-bold'>Reps</label>
                <input type="text" id='reps' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] 2xl:p-4 outline-none focus:ring-2 focus:ring-cyan-400' value={reps} onChange={(e)=>{setReps(e.target.value)}}/>
            </div>
            {/* LOAD */}
            <div className='flex flex-col gap-2 2xl:gap-4'>
                <label htmlFor="load" className='font-bold'>Load (in kg)</label>
                <input type="text" id='load' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] 2xl:p-4 outline-none focus:ring-2 focus:ring-cyan-400' value={load} onChange={(e)=>{setLoad(e.target.value)}}/>
            </div>

            <Button buttonText="Update Workout"/>
        </form>
        {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px] 2xl:text-4xl 2xl:py-4 2xl:mt-5'>{error}!</div>:""}
        {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px] 2xl:text-4xl 2xl:py-4'>{success}! Redirecting...</div>:""}
    </div>
  )
}

export default UpdateWorkout