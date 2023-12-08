import React from 'react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { CgSpinner } from 'react-icons/cg';
import { register } from '../services/register';

const userRegex = /^[a-zA-Z0-9]+$/; // only letters and numbers
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()-_+=<>?]{8,}$/; // at least 8 characters, only letters, numbers and !@#$%^&*()-_+=<>?

const SignUp: React.FC = () => {

  const { setUser, loadingRegister, setLoadingRegister } = useContext(UserContext)

  const [error, setError] = useState<string>('')

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const navigate = useNavigate()

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'username') setUsername(e.target.value)
    if (e.target.name === 'password') setPassword(e.target.value)
    if (e.target.name === 'confirmPassword') setConfirmPassword(e.target.value)
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

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoadingRegister(true)
    try {
      const res = await register(username, password)
      if (res.data) {
        setUser(res.data)
        setLoadingRegister(false)
        setError('')
        navigate('/')
      }
    } catch (error) {
      setError('Username already taken')
      setLoadingRegister(false)
    }

  }

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-2xl md:text-4xl font-bold mt-2 md:mt-14 pl-10 md:pl-0 text-center'>Play Truco Online on the <span className='text-primary'>#1</span> Site!</h1>
      <form
        onSubmit={handleSubmit}
        className='w-[90%] max-w-[480px] h-[80%] max-h-[660px] flex flex-col justify-evenly items-center rounded-xl m-auto bg-secondary'>

        <h2 className='font-semibold text-4xl'>SIGN UP</h2>

        <input
          onChange={handleChanges}
          type="text"
          name='username'
          placeholder='Username'
          className='w-[85%] h-[60px] rounded-2xl bg-[#6282a38f] px-4 mb-[-20px]' />

        <input
          onChange={handleChanges}
          type="password"
          name='password'
          placeholder='Password'
          className='w-[85%] h-[60px] rounded-2xl bg-[#6282a38f] px-4 mb-[-20px]' />

        <input
          onChange={handleChanges}
          type="password"
          name='confirmPassword'
          placeholder='Confirm Password'
          className='w-[85%] h-[60px] rounded-2xl bg-[#6282a38f] px-4' />

        {!loadingRegister && <button
          type='submit'
          className='w-[40%] h-[60px] rounded-full bg-primary'>
          Sign Up
        </button>}

        {error && <p className='text-red-500 text-center'>{error}</p>}

        {loadingRegister && <CgSpinner className='animate-spin w-[40px] h-[40px]' />}

        <Link to="/login" className='text-sm'>Already have an account?</Link>
      </form>
    </div>
  );
};

export default SignUp;
