import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { CgSpinner } from "react-icons/cg";
import { login } from '../services/login';

const LogIn = () => {

  const userRegex = /^[a-zA-Z0-9]+$/; // only letters and numbers
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()-_+=<>?]{8,}$/; // at least 8 characters, only letters, numbers and !@#$%^&*()-_+=<>?

  const { setUser, loadingLogin, setLoadingLogin } = useContext(UserContext)

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const navigate = useNavigate()

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'username') setUsername(e.target.value)
    if (e.target.name === 'password') setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!username || !password) {
      setError('Please fill all the fields')
      return
    }

    if (!userRegex.test(username)) {
      setError('Username can only contain letters and numbers')
      return
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long (letters, numbers and special characters)')
      return
    }

    setLoadingLogin(true)
    try {
      const res = await login(username, password)
      if (res.data) {
        setUser(res.data)
        setLoadingLogin(false)
        setError('')
        navigate('/')
      }
    } catch (error) {
      setError('Wrong username or password')
      setLoadingLogin(false)
    }
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className=' font-bold m-2 text-xl md:mt-14 md:text-4xl text-center'>Play Truco Online on the <span className='text-primary'>#1</span> Site!</h1>
      <form
        onSubmit={handleSubmit}
        className='w-[90%] max-w-[480px] h-[80%] max-h-[660px] flex flex-col justify-evenly items-center rounded-xl m-auto bg-secondary'>
        <h2 className='font-semibold text-4xl'>LOG IN</h2>

        <input
          type="text"
          name='username'
          placeholder='Username'
          className='w-[85%] h-[60px] rounded-2xl bg-[#6282a38f] px-4 mb-[-20px]'
          onChange={handleChanges} />
        <input
          type="password"
          name='password'
          placeholder='Password'
          className='w-[85%] h-[60px] rounded-2xl bg-[#6282a38f] px-4'
          onChange={handleChanges} />

        {!loadingLogin && <button
          type='submit'
          className='w-[40%] h-[60px] rounded-full bg-primary'>
          Sign In
        </button>}

        {error && <p className='text-red-500 text-center'>{error}</p>}

        {loadingLogin && <CgSpinner className='animate-spin w-[40px] h-[40px]' />}
        <Link to="/signup " className='text-sm'>Haven´t signed up yet?</Link>
      </form>
    </div>
  );
};

export default LogIn;
