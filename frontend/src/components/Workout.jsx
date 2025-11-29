import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import "dayjs" ;
import relativeTime from "dayjs/plugin/relativeTime" 
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { formatUsername } from "../utils/formatUsername";

function Workout({workout}) {

  dayjs.extend(relativeTime)

  const formattedDate = dayjs(workout.updatedAt).fromNow()

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
    <div className='flex flex-col gap-2 w-full bg-[#111] mb-6 p-5 font-bold rounded-xl md:max-w-[60vw] 2xl:text-4xl 2xl:gap-6 hover:shadow-lg hover:shadow-cyan-300 border-gray-400'>
        <div className='flex justify-between items-center'>
          <p className='text-cyan-300 text-2xl 2xl:text-6xl'>{formatUsername(workout.title)}</p>
          <div className="flex gap-2 text-2xl 2xl:text-6xl 2xl:gap-4">
            <Link to={`/update-workout/${workout._id}`}><BiEdit className="cursor-pointer text-gray-400"/></Link>
            <RiDeleteBin5Line className="text-red-700 cursor-pointer" onClick={deleteWorkout}/>
          </div>
        </div>
        <p className='text-white'>Reps : {workout.reps}</p>
        <p className='text-white'>Load (kg) : {workout.load}</p>
        <p className='text-white font-normal italic 2xl:text-3xl'>{formattedDate}</p>
    </div>
  )
}

export default Workout