import React from 'react'

function Workout({workout}) {
  return (
    <div className='bg-gray-400 m-2 p-4 font-bold rounded-[10px] max-w-[70vw]'>
        <p className='text-cyan-800 text-2xl'>{workout.title}</p>
        <p className='text-white'>Reps : {workout.reps}</p>
        <p className='text-white'>Load (kg) : {workout.load}</p>
    </div>
  )
}

export default Workout