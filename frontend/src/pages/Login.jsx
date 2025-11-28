import axios from "axios";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom"
import Button from "../components/Button";

function Login({setAuthorizedUser,setLoggedIn}) {

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
          username : fields.username.trim(),
          password : fields.password.trim()
        })

        console.log(response);
        setError(null)
        setSuccess(response.data.message)        

        if(response.data.login){
          setTimeout(()=>{
            localStorage.setItem("user",JSON.stringify(response.data.user))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            setAuthorizedUser(localStorage.getItem("user"))
            setLoggedIn(true)
            // console.log(JSON.parse(localStorage.getItem("user")).username);
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
        <form className='form flex flex-col gap-5 justify-around h-full shadow-lg rounded-[10px] bg-[#1a1a1a] py-4 px-2 mb-2 text-white' onSubmit={handleSubmit}>
        <p className="text-3xl font-bold text-cyan-300">Login</p>
            {/* USERNAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='font-bold'>Username</label>
                <input type="text" id='title' placeholder='Username...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]' value={fields.username} onChange={handleUsername}/>
            </div>
            
            {/* PASSWORD */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="reps" className='font-bold'>Password</label>
                <input type="password" id='reps' placeholder='Password...' className='text-white bg-[#2a2a2a] outline-none focus:ring-2 focus:ring-cyan-300 p-2 rounded-[5px]' value={fields.password} onChange={handlePassword}/>
            </div>

            <Button buttonText="Login"/>
        
            <p>Do not have an account? <Link to={"/register"}  className="text-cyan-300 font-bold">Register</Link></p>

        </form>
        {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px]'>{error}!</div>:""}
        {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px]'>{success}!. Redirecting...</div>:""}
    </div>
  )
}

export default Login