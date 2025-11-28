import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Button from "../components/Button"

function Register() {

    const [fields,setFields] = useState({name:"",username:"",email:"",password:""})
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const navigate=useNavigate()


    const handleName = (e)=>{
        setFields(prevField => ({...prevField,name : e.target.value}))
    }
    const handleUsername = (e)=>{
        setFields(prevField => ({...prevField,username : e.target.value}))
    }
    const handleEmail = (e)=>{
        setFields(prevField => ({...prevField,email : e.target.value}))
    }
    const handlePassword = (e)=>{
        setFields(prevField => ({...prevField,password : e.target.value}))
    }


    const handleSubmit = (e)=>{
        e.preventDefault()

        const submit = async()=>{
            try {
                const response = await axios.post("http://localhost:3000/api/users/sign-up",
                    {   name : fields.name.trim(),
                        username:fields.username.trim(),
                        password:fields.password.trim(),
                        email:fields.email.trim()
                    })
                console.log(response);
                setError(null)
                setSuccess(response.data.message)

                setTimeout(()=>{
                    navigate("/login")
                },3000)
                
                
            } catch (error) {
                setSuccess(null)
                setError(error.response.data.message)
                console.log(error.response.data.message);
                
            }
        }
        submit()
    }

  return (
    <div className='pt-30 w-[80vw] mx-auto mb-10 max-h-100 md:w-[40vw]'>
        <form className='form flex flex-col gap-4 justify-around h-full shadow-2xl bg-[#1a1a1a] rounded-[10px] text-white py-4 px-2'onSubmit={handleSubmit}>
        <p className="text-3xl font-bold text-cyan-300">Register</p>
            {/* NAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='font-bold'>Name</label>
                <input type="text" id='title' placeholder='Name...' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-400' value={fields.name} onChange={handleName}/>
            </div>
            
            {/* EMAIL */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="reps" className='font-bold'>Email</label>
                <input type="text" id='reps' placeholder='Email...' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-400' value={fields.email} onChange={handleEmail}/>
            </div>
            
            {/* USERNAME */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="title" className='font-bold'>Username</label>
                <input type="text" id='title' placeholder='Username...' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-400' value={fields.username} onChange={handleUsername}/>
            </div>
            
            {/* PASSWORD */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="reps" className='font-bold'>Password</label>
                <input type="text" id='reps' placeholder='Password...' className='text-white bg-[#2a2a2a] p-2 rounded-[5px] outline-none focus:ring-2 focus:ring-cyan-400' value={fields.password} onChange={handlePassword}/>
            </div>

            <Button buttonText="Register"/>
        
            <p>Already have an account? <Link to={"/Login"}  className="text-cyan-300 font-bold">Login</Link></p>

        </form>
        {error && error? <div className='bg-red-200 border-red-600 border-2 text-red-600 font-bold py-2 px-4 rounded-[5px]'>{error}!</div>:""}
        {success && success? <div className='bg-green-200 border-green-600 border-2 text-green-600 font-bold py-2 px-4 rounded-[5px]'>{success}! Redirecting to Login...</div>:""}
    </div>
  )
}

export default Register