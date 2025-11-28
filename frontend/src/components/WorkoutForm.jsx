import { useEffect,useState } from 'react'

function WorkoutForm() {

    const [title, setTitle] = useState("")
    const [reps, setReps] = useState("")
    const [load, setLoad] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const user = JSON.parse(localStorage.getItem("user"))

        const userId = user._id
        console.log(userId);
        

        const workout = {title,reps,load,user:userId}

        // POST REQUEST
        const response = await fetch("http://localhost:3000/api/workouts",
            {
                method : "POST",
                body : JSON.stringify(workout),
                headers : {
                    "Content-Type" : "application/json"
                }
            }   
        )

        const json = await response.json()

        if(!response.ok){
            setError(json)
        }
        else{
            setSuccess(json)
            setError(null)
            console.log("New workout added");
            setTitle("")   
            setReps("")   
            setLoad("")   
        }

    }

    useEffect(()=>{
        if(success){
            const timeoutId = setTimeout(()=>{
                            setSuccess(null)
                        },3000)

            return () => clearTimeout(timeoutId)
        }
    },[success])

  return (
    <div className='w-[80vw] mx-auto mb-10 max-h-100 md:w-[40vw] 2xl:max-h-200'>
        <form className='form flex flex-col gap-2 justify-around h-full shadow-2xl shadow-gray-500 rounded-[10px] bg-gray-300 p-4 mb-2 2xl:gap-5 2xl:text-4xl 2xl:p-8' onSubmit={handleSubmit}>
            {/* WORKOUT */}
            <div className='flex flex-col gap-2 2xl:gap-4'>
                <label htmlFor="title" className='font-bold'>Workout</label>
                <input type="text" id='title' placeholder='Workout type' className='text-white bg-gray-400 p-2 rounded-[5px] 2xl:p-4' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            {/* REPS */}
            <div className='flex flex-col gap-2 2xl:gap-4'>
                <label htmlFor="reps" className='font-bold'>Reps</label>
                <input type="text" id='reps' placeholder='Number of reps' className='text-white bg-gray-400 p-2 rounded-[5px] 2xl:p-4' value={reps} onChange={(e)=>{setReps(e.target.value)}}/>
            </div>
            {/* LOAD */}
            <div className='flex flex-col gap-2 2xl:gap-4'>
                <label htmlFor="load" className='font-bold'>Load (in kg)</label>
                <input type="text" id='load' placeholder='Load in kg' className='text-white bg-gray-400 p-2 rounded-[5px] 2xl:p-4' value={load} onChange={(e)=>{setLoad(e.target.value)}}/>
            </div>

            <button className='bg-cyan-800 text-white mt-2 p-2 cursor-pointer hover:bg-cyan-700 active:bg-cyan-600 transition-all 2xl:p-6'>Add Workout</button>
        </form>
        {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px] 2xl:text-4xl 2xl:py-5'>{error}!</div>:""}
        {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px] 2xl:text-4xl 2xl:py-5'>{success}!</div>:""}
    </div>
  )
}

export default WorkoutForm