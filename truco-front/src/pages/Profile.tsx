import React from 'react';
import ProfileLogo from '../assets/User_cicrle_duotone.png';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { logout } from '../services/logout';
import { GameContext } from '../context/gameContext';

const Profile: React.FC = () => {

  const { user, setUser, loadingLogOut, setLoadingLogOut } = useContext(UserContext)
  const {gameManager} = useContext(GameContext)

  const navigate = useNavigate()

  const handleLogOut = async () => {

    setLoadingLogOut(true)
    try {
      const res = await logout()
      if (res.status === 200) {
        setUser(null)
        setLoadingLogOut(false)
        navigate('/')
      }
    } catch (error) {
      alert('Something went wrong')
      setLoadingLogOut(false)
    }
  }

  return (
    <>
      {!loadingLogOut && <button
        onClick={handleLogOut}
        className='w-[170px] h-[60px] rounded-full bg-primary absolute top-10 right-[50%] translate-x-1/2 z-20 md:right-36'>
        Log Out
      </button>}

      {loadingLogOut &&
        <button
          className='w-[170px] h-[60px] flex justify-center items-center rounded-full bg-primary absolute top-10 right-[50%] translate-x-1/2 z-20 md:right-36'>
          <CgSpinner className='animate-spin w-[40px] h-[40px]' />
        </button>}



      <div className="w-[715px] h-[715px] m-auto flex flex-col relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card text-xl md:text-3xl">
        <img src={ProfileLogo} alt="" className='w-[150px] h-[150px]' />
        <h2 className=''>{user?.username}</h2>
        <div className='flex w-full justify-evenly'>
          <div className='text-center'>
            <h2 className='font-semibold  mb-2'>Matches</h2>
            <p className=''>{user && user.wins + user.losses}</p>
          </div>
          <div className='text-center'>
            <h2 className='font-semibold  mb-2'>Rating</h2>
            <p className=''>{user?.rating}</p>
          </div>
          <div className='text-center'>
            <h2 className='font-semibold  mb-2'>Ranking</h2>
            <p className=''>Ø</p>
          </div>
        </div>
        <div className='flex w-full justify-evenly'>
          <div className='text-center'>
            <h2 className='font-semibold  mb-2'>Wins</h2>
            <p className=''>{user?.wins}</p>
          </div>
          <div className='text-center'>
            <h2 className='font-semibold  mb-2'>Losses</h2>
            <p className=''>{user?.losses}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
