import { useForm } from 'react-hook-form'
//import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const { register: regForm, handleSubmit } = useForm()
  const { register } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await register(data)
      toast.success('Registration successful!')
      navigate('/login')
    } catch (err) {
      toast.error('Registration failed!')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className=" p-6 rounded shadow-md w-96">
        <h2 className="text-4xl font-bold mb-4 text-center">Register</h2>
        <input {...regForm('name')} placeholder="Name" className="input mb-2 w-full" />
        <input {...regForm('email')} placeholder="Email" className="input mb-2 w-full" />
        <input {...regForm('password')} placeholder="Password" type="password" className="input mb-2 w-full" />
        <input {...regForm('phone')} placeholder="Phone" className="input mb-2 w-full" />
        <select {...regForm('gender')} className="input mb-2 w-full">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <button type="submit" className="btn w-full bg-green-600 text-white">Register</button>
      </form>
    </div>
  )
}

export default Register
