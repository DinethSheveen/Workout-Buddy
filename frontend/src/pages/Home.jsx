import React, { useEffect, useState } from 'react'

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
    },[])

  return (
    <div>
        {workouts && workouts.map((workout)=>{
            return(
                <div key={workout._id}>
                    <p>Workout - {workout.title}</p>
                    <p>Reps : {workout.reps}</p>
                    <p>Load : {workout.load}</p>
                </div>
            )
        })}
    </div>
  )
}

export default Home