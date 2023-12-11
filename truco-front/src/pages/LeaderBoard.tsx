import React, { useEffect, useState } from 'react';
import User from '../@types/UserType';
import { getTopRating } from '../services/stats';

const LeaderBoard: React.FC = () => {
  const [leaderBoard, setLeaderBoard] = useState<User[]>([])
  const usernameRef = React.useRef<HTMLDivElement>(null)
  const ratingRef = React.useRef<HTMLDivElement>(null)
  const matchesRef = React.useRef<HTMLDivElement>(null)
  const rankingRef = React.useRef<HTMLDivElement>(null)
  useEffect(() => {
    const setTop = async () => {
      const top = await getTopRating();
      setLeaderBoard(top.data)
    }
    setTop()
  },[])
  const makeLeaderBoard = () => {
    if(!usernameRef.current) return;
    let usernames = "<h2 className='font-medium mb-4'>Username</h2>"
    let ratings = "<h2 className='font-medium mb-4'>Rating</h2>"
    let matches = "<h2 className='font-medium mb-4'>Matches</h2>"
    let ranking = "<h2 className='font-medium mb-4'>Ranking</h2>"
    for(let i = 0; i < leaderBoard.length; i++){
      usernames += `<p>${leaderBoard[i].username}</p>`
      ratings += `<p>${leaderBoard[i].rating}</p>`
      matches += `<p>${leaderBoard[i].wins}</p>`
      ranking += `<p>${i+1}</p>`
    }
    usernameRef.current!.innerHTML = usernames
    ratingRef.current!.innerHTML = ratings
    matchesRef.current!.innerHTML = matches
    rankingRef.current!.innerHTML = ranking
  }
  makeLeaderBoard()
  return (
    <div className='flex flex-col justify-evenly items-center w-full'>
      <h1 className='text-2xl md:text-4xl font-bold'>LeaderBoard</h1>
      <div className="w-fit md:w-[85%] h-[80vh] py-8 px-2 flex gap-2 relative justify-evenly items-start rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card overflow-auto">
        <div className='flex flex-col items-center md:text-2xl gap-2' ref={usernameRef}>
        </div>
        <div className='flex flex-col items-center md:text-2xl gap-2' ref={ratingRef}>
        </div>
        <div className='flex flex-col items-center md:text-2xl gap-2'ref={matchesRef}>
        </div>
        <div className='flex flex-col items-center md:text-2xl gap-2'ref={rankingRef}>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
