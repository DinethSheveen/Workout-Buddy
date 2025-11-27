import {Link} from "react-router-dom"

function Home() {
  return (
    <div className="pt-30 text-gray-300 px-5 md:px-0 md:pt-40">
      {/* HEADER */}
      <div className="flex flex-col justify-center items-center gap-5">
        <div>
          <p className="uppercase text-[#696bcc] text-2xl font-bold rounded-full border-2 border-[#696bcc] px-4 py-2 bg-white/10 backdrop-blur-3xl">Fitness for life</p>
        </div>
        {/* HEADING */}
          <div className="md:w-[65%]">
          <p className="text-4xl font-bold text-center md:text-5xl">Elevate Your <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-[#696bcc]">Fitness</span> Journey with <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-[#696bcc]">Workout Buddy</span>⚡</p>
        </div>
        {/* SUB-HEADING */}
        <div className="text-2xl font-bold text-gray-400 text-center md:w-[40%]">
          <p>Unlock Your Potential with Our Personalized Fitness Ecosystem.</p>
        </div>
        <div>
          <div className="flex flex-col items-center jusitfy-between gap-4 font-bold md:flex-row md:gap-0 md:rounded-none">
            <Link to={"/my-workouts"} className="bg-gray-600 px-6 py-3 md:py-4 md:px-12 rounded-[10px] md:rounded-l-[10px] md:rounded-none">My Workouts</Link>
            <Link to={"/my-workouts"} className="bg-[#5759d4] px-6 py-3 md:py-4 md:px-12 rounded-[10px] md:rounded-r-[10px] md:rounded-none">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home