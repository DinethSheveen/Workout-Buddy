import axios from "axios";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom"

function Login({setAuthorizedUser}) {

  const [fields, setFields] = useState({username:"",password:""})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate() 

  const handleUsername = (e)=>{
    setFields(prevFields=>({...prevFields,username:e.target.value}))
  }
  const handlePassword = (e)=>{
    setFields(prevFields=>({...prevFields,password:e.target.value}))
  }


  const handleSubmit = (e)=>{
    e.preventDefault()

    const submit = async()=>{
      try {
        const response = await axios.post("http://localhost:3000/api/users/sign-in",{
          username : fields.username,
          password : fields.password
        })

        console.log(response);
        setError(null)
        setSuccess(response.data.message)        

        if(response.data.login){
          setTimeout(()=>{
            localStorage.setItem("user",response.data.user.name)
            setAuthorizedUser(localStorage.getItem("user"))
            navigate("/")
          },3000)
        }
        
      } catch (error) {
        console.log(error);
        setSuccess(null)
        setError(error.response.data.message)
      }
    }
    submit()    
  } 

  return (
    <div className='pt-40 w-[80vw] mx-auto mb-10 max-h-100 md:w-[40vw]'>
        <form className='form flex flex-col gap-5 justify-around h-full shadow-2xl shadow-gray-500 rounded-[10px] bg-gray-300 py-4 px-2' onSubmit={handleSubmit}>
        <p className="text-3xl font-bold text-cyan-900">Login</p>
            {/* USERNAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='font-bold'>Username</label>
                <input type="text" id='title' placeholder='Username...' className='text-white bg-gray-400 p-2 rounded-[5px]' value={fields.username} onChange={handleUsername}/>
            </div>
            
            {/* PASSWORD */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="reps" className='font-bold'>Password</label>
                <input type="text" id='reps' placeholder='Password...' className='text-white bg-gray-400 p-2 rounded-[5px]' value={fields.password} onChange={handlePassword}/>
            </div>

            <button className='bg-cyan-800 text-white mt-2 p-2 cursor-pointer hover:bg-cyan-700 active:bg-cyan-600 transition-all'>Login</button>
        
            <p>Do not have an account? <Link to={"/register"}  className="text-cyan-800 font-bold">Register</Link></p>

        </form>
        {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px]'>{error}!</div>:""}
        {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px]'>{success}!. Redirecting...</div>:""}
    </div>
  )
}

export default Login