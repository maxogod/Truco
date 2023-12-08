import profile from '../assets/User_cicrle_duotone.png';
import login from '../assets/login.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const NavBar: React.FC = () => {

  const { user } = useContext(UserContext)

  return (
    <div className='absolute top-7 right-6 cursor-pointer z-20 flex flex-col items-center'>
      {user && <Link to='/profile'>
        <img src={profile} alt="" className=' w-[86px] h-[86px]' />
      </Link>}

      {!user && <Link to="/login">
        <img src={login} alt="" className='w-[50px] h-[50px] p-3 bg-[#6282a3da] rounded-full' />
      </Link>}
    </div>
  );
};

export default NavBar;
