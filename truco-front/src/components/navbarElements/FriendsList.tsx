import React from 'react';
import Add from '../../assets/Add_round_fill.png'
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';

const FriendsList: React.FC = () => {

  const { user } = useContext(UserContext)

  return (
    <div className='w-[80%] h-[460px] relative p-6 border-2 border-primary rounded-lg'>
      <h3 className='font-semibold text-2xl'>Friends</h3>
      <img src={Add} alt='AddFriend' className='w-[44px] h-[44px] absolute right-6 top-5 cursor-pointer' />
      <div className='w-full mt-10 flex flex-col gap-3'>
        {!user && <p className='text-center'>You must be logged in to see your friends</p>}
        {user && user.friends.length === 0 && <p className='text-center'>You don't have any friends yet</p>}
        {user && user.friends.length > 0 && user.friends.map((friend, i) => (
          <p key={'friend' + i} className='text-center'>{friend.username}</p>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
