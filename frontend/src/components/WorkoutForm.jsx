import React, { useState } from 'react'

function WorkoutForm() {

    const [title, setTitle] = useState("")
    const [reps, setReps] = useState("")
    const [load, setLoad] = useState("")

    

  return (
    <div className='w-[30vw]'>
        <form className='form flex flex-col gap-2 justify-around h-full border-2 rounded-[10px] p-2'>
            {/* WORKOUT */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='font-bold'>Title</label>
                <input type="text" id='title' placeholder='Workout title' className='text-white bg-gray-400 p-2 rounded-[5px]' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            {/* REPS */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="reps" className='font-bold'>Reps</label>
                <input type="text" id='reps' placeholder='Number of reps' className='text-white bg-gray-400 p-2 rounded-[5px]' value={reps} onChange={(e)=>{setReps(e.target.value)}}/>
            </div>
            {/* LOAD */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="load" className='font-bold'>Load (in kg)</label>
                <input type="text" id='load' placeholder='Load in kg' className='text-white bg-gray-400 p-2 rounded-[5px]' value={load} onChange={(e)=>{setLoad(e.target.value)}}/>
            </div>

            <button className='bg-cyan-800 text-white mt-2 p-2'>Add Workout</button>
        </form>
    </div>
  )
}

export default WorkoutForm