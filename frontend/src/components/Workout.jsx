import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import "dayjs" ;
import relativeTime from "dayjs/plugin/relativeTime" 
import dayjs from "dayjs";
import { Link } from "react-router-dom";

function Workout({workout}) {

  dayjs.extend(relativeTime)

  const formattedDate = dayjs(workout.createdAt).fromNow()

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
          <div className="flex gap-2 text-2xl">
            <Link to={`update-workout/${workout._id}`}><BiEdit className="cursor-pointer text-cyan-600"/></Link>
            <RiDeleteBin5Line className="text-red-700 cursor-pointer" onClick={deleteWorkout}/>
          </div>
        </div>
        <p className='text-white'>Reps : {workout.reps}</p>
        <p className='text-white'>Load (kg) : {workout.load}</p>
        <p className='text-white font-normal italic'>{formattedDate}</p>
    </div>
  )
}

export default Workout