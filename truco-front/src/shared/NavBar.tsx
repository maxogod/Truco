import profile from '../assets/User_cicrle_duotone.png';
import loginIcon from '../assets/logInIcon.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const NavBar: React.FC = () => {

  const { user } = useContext(UserContext)

  return (
    <div className='absolute top-0 right-0 cursor-pointer z-20 m-2'>
      {user && <Link to='/profile'>
        <img src={profile} alt="" className='w-[60px] md:w-[70px] md:h-[70px]' />
      </Link>}

      {!user && <Link to="/login">
        <img src={loginIcon} alt="" className='w-[45px] h-[45px] m-1' />
      </Link>}
    </div>
  );
};

export default NavBar;
