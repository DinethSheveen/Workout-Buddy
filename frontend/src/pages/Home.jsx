import React, { useEffect, useState } from 'react'
import Workout from '../components/Workout'
import WorkoutForm from '../components/WorkoutForm'

function Home() {

    const [workouts, setWorkout] = useState(null)

    useEffect(()=>{
        const fetchWorkouts = async()=>{
            try {
                const response = await fetch("http://localhost:3000/api/workouts")
                
                if(!response.ok){
                    throw new Error("Couldn't fetch resources")
                }
                else{
                    const data = await response.json()
                    setWorkout(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchWorkouts()
    },[workouts])

  return (
    <div className='flex justify-between gap-5 px-4 pt-25'>
        <div className='flex-1'>
            {workouts && workouts.map((workout)=>{
                return(
                    <Workout key={workout._id} workout={workout}/>
                )
            })}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home