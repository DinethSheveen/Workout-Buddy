import {Link} from "react-router-dom"

function Home() {
  return (
    <div className="text-gray-300 px-5 md:px-0">
      {/* HEADER */}
      <div className="flex flex-col justify-center items-center gap-5 min-h-screen 2xl:gap-15">
        <div>
          <p className="uppercase text-[#696bcc] text-2xl font-bold rounded-full border-2 border-[#696bcc] px-4 py-2 bg-white/10 backdrop-blur-3xl md:text-3xl lg:text-4xl xl:px-8 xl:py-4 xl:border-4 2xl:text-7xl">Fitness for life</p>
        </div>
        {/* HEADING */}
          <div className="md:w-[65%] 2xl:w-[65%]">
          <p className="text-4xl font-bold text-center 2xl:text-8xl">Elevate Your <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-[#696bcc]">Fitness</span> Journey with <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-[#696bcc]">Workout Buddy</span>⚡</p>
        </div>
        {/* SUB-HEADING */}
        <div className="text-2xl font-bold text-gray-400 text-center md:w-[40%] 2xl:w-[45%] 2xl:text-5xl">
          <p>Unlock Your Potential with Our Personalized Fitness Ecosystem.</p>
        </div>
        {/* ACTION BUTTONS */}
        <div className="flex flex-col items-center jusitfy-between gap-4 font-bold md:flex-row md:gap-0 md:rounded-none 2xl:text-6xl">
          <Link to={"/my-workouts"} className="bg-gray-600 px-6 py-3 md:py-4 md:px-12 rounded-[10px] md:rounded-l-[10px] md:rounded-none 2xl:py-6 2xl:px-12 2xl:rounded-l-[15px]">My Workouts</Link>
          <Link to={"/my-workouts"} className="bg-[#5759d4] px-6 py-3 md:py-4 md:px-12 rounded-[10px] md:rounded-r-[10px] md:rounded-none 2xl:py-6 2xl:px-12 2xl:rounded-r-[15px]">Get Started</Link>
        </div>
      </div>
    </div>
  )
}

export default Home