import { RiDeleteBin5Line } from "react-icons/ri";
import "dayjs"
import dayjs from "dayjs";

function Workout({workout}) {

  const formattedDate = dayjs(workout.createdAt).format("DD-MMMM-YYYY")

  const deleteWorkout = async()=>{
    const response = await fetch("http://localhost:3000/api/workouts/"+workout._id,
      {
        method : "DELETE"
      }
  )

    const json = await response.json();
    
    if(response.ok){
      console.log(json);
    }
    else{
      console.log(json);
    }
    
  }

  return (
    <div className='w-full bg-gray-400 mb-6 p-4 font-bold rounded-[10px] md:max-w-[60vw]'>
        <div className='flex justify-between items-center'>
          <p className='text-cyan-800 text-2xl'>{workout.title}</p>
          <RiDeleteBin5Line className="text-red-700 text-2xl cursor-pointer" onClick={deleteWorkout}/>
        </div>
        <p className='text-white'>Reps : {workout.reps}</p>
        <p className='text-white'>Load (kg) : {workout.load}</p>
        <p className='text-white font-normal italic'>{formattedDate}</p>
    </div>
  )
}

export default Workout