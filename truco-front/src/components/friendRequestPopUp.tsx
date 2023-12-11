import { useState, useContext } from 'react'
import { sendFriendRequest } from '../services/friendRequest';
import { UserContext } from '../context/userContext';
import { CgSpinner } from 'react-icons/cg';

const userRegex = /^[a-zA-Z0-9]+$/; // only letters and numbers

const FriendRequestPopUp = () => {

    const { setSendFriendRequest } = useContext(UserContext)

    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        if (!username) {
            setError('Please fill all the fields')
            return
        }

        if (!userRegex.test(username)) {
            setError('Username can only contain letters and numbers')
            return
        }

        setLoading(true)
        try {
            const res = await sendFriendRequest(username)
            if (res.status === 200) {
                setError('')
                setLoading(false)
                setSuccess(true)
            }
        } catch {
            setError('There was an error adding this person')
            setLoading(false)
        }
    }

    const handleClose = () => {
        setUsername('')
        setError('')
        setLoading(false)
        setSuccess(false)
        setSendFriendRequest(false)
    }

    return (
        <div className='absolute w-screen h-screen z-50 flex justify-center items-center'>
            <div className="bg-secondary relative w-[80vw] p-10 rounded-2xl flex-col justify-center border-2 border-primary">
                <h2 className="text-white text-3xl mb-5">Add Friend</h2>
                <button
                    onClick={handleClose}
                    className='absolute text-white text-2xl right-7 top-5'>
                    X
                </button>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name='username'
                        placeholder='Username'
                        className='w-[85%] h-[60px] rounded-y-full rounded-l-full bg-[#6282a38f] px-4 mb-[-20px]'
                        onChange={handleChanges} />
                    <button
                        disabled={loading}
                        type='submit'
                        className='w-20 h-[60px] rounded-r-full rounded-y-full bg-primary'>
                        Add
                    </button>
                    {error && <p className='text-red-500 text-center mt-5'>{error}</p>}
                    {success && <p className='text-green-500 text-center mt-5'>Friend request sent!</p>}

                    {loading &&
                        <div className='flex justify-center items-center'>
                            <CgSpinner className='animate-spin w-[40px] h-[40px]' />
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default FriendRequestPopUp