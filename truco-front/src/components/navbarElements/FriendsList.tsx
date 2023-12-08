import React from 'react';
import Add from '../../assets/Add_round_fill.png'
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { acceptFriendRequest } from '../../services/acceptFriendRequest';

const FriendsList: React.FC = () => {

  const { user, setUser, setSendFriendRequest, onlineFriends} = useContext(UserContext)

  const [loading, setLoading] = React.useState<boolean>(false)

  const handleAddFriend = () => {
    setSendFriendRequest(true)
  }

  const handleAcceptFriendRequest = async (username: string) => {
    setLoading(true)
    try {
      const res = await acceptFriendRequest(username)
      if (res.data) {
        setLoading(false)
        setUser(res.data)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className='w-[80%] h-[460px] relative p-2 border-2 border-primary rounded-lg overflow-y-scroll overflow-x-hidden'>
      <h3 className='font-semibold text-2xl relative'>
        Friends
        <button
          disabled={!user}
          onClick={handleAddFriend}
          className='absolute right-0 top-0 cursor-pointer'>
          <img
            src={Add}
            alt='AddFriend'
            className='' />
        </button>
      </h3>
      <div className='w-full h-80 mt-10 flex flex-col gap-3'>
        {!user && <p className=''>You must be logged in to see your friends</p>}
        {user && user.friends?.length === 0 && <p className=''>You don't have any friends yet</p>}
        {user && user.friends?.length > 0 && user.friends.map((friend, i) => (
          <p key={'friend' + i} className=''>{friend.username}{
            onlineFriends.includes(friend.username) &&
            <span className='ml-1 text-green-500'>●</span>
          }</p>
        ))}
        {
          user && user.friendRequests?.length > 0 &&
          <>
            <h3 className='font-semibold text-2xl'>
              Requests
            </h3>
            {user.friendRequests.map((request, i) => (
              <p key={'request' + i} className=''>
                {request.username}
                <button
                  disabled={loading}
                  onClick={() => handleAcceptFriendRequest(request.username)}
                  className='bg-primary rounded-2xl w-16 ml-1'>
                  Add
                </button>
              </p>
            ))}
          </>
        }

      </div>
    </div>
  );
};

export default FriendsList;
