import profile from '../assets/User_cicrle_duotone.png';
import login from '../assets/login.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const NavBar: React.FC = () => {

  const { user } = useContext(UserContext)

  return (
    <div className='absolute top-0 right-0 cursor-pointer z-20'>
      {user && <Link to='/profile'>
        <img src={profile} alt="" className='w-[60px] md:w-[70px] md:h-[70px]' />
      </Link>}

      {!user && <Link to="/login">
        <img src={login} alt="" className='w-[70px] h-[70px] p-3 bg-[#6282a3da] rounded-full' />
      </Link>}
    </div>
  );
};

export default NavBar;
