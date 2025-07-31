import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log('Submitting login form:', data)
    try {
      await login(data.email, data.password)
      console.log('Login success')
      toast.success('Login successful!')
      navigate('/')
    } catch (err) {
    console.error('Login error:', err)
      toast.error('Login failed. Check credentials.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className=" p-6 rounded shadow-2xl w-96">
        <h2 className="text-4xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" {...register('email')} className="input mb-2 w-full" />
        <input type="password" placeholder="Password" {...register('password')} className="input mb-2 w-full" />
        <button type="submit" className="btn w-full bg-blue-600 text-white">Login</button>
      </form>
    </div>
  )
};

export default Login;