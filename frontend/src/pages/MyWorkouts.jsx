import { useEffect, useState } from 'react'
import Workout from '../components/Workout'
import WorkoutForm from '../components/WorkoutForm'

function MyWorkouts() {

    const [workouts, setWorkout] = useState(null)

    useEffect(()=>{
        const fetchWorkouts = async()=>{
            try {
                const id = JSON.parse(localStorage.getItem("user"))._id

                const response = await fetch(`http://localhost:3000/api/workouts/user/${id}`)

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
    <div className='flex flex-col-reverse justify-between gap-5 px-4 pt-35 md:pt-30 md:flex-row 2xl:pt-50'>
        <div className='flex-1'>
            {workouts.length>0 ? workouts.map((workout)=>{
                return(
                    <Workout key={workout._id} workout={workout}/>
                )
            })
            :
            <p className='font-bold text-gray-400 text-center md:p-10 2xl:text-5xl 2xl:p-10'>Your workout space is empty — kickstart your fitness journey by adding your first workout!🔥</p>
            }
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default MyWorkouts