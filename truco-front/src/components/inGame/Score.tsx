import React, { useContext, useEffect } from 'react';
import { GameContext } from '../../context/gameContext';
import { toast } from 'react-toastify';

const Score: React.FC = () => {

  const { myPoints, opponentPoints } = useContext(GameContext)
  const [prevMyPoints, setPrevMyPoints] = React.useState<number>(0)
  const [prevOpponentPoints, setPrevOpponentPoints] = React.useState<number>(0)

  useEffect(() => {
    if (myPoints > prevMyPoints) {
      toast.success("You won " + (myPoints - prevMyPoints) + " points!", { autoClose: 4000, hideProgressBar: true, theme: "colored"})
      setPrevMyPoints(myPoints)
    } else if (opponentPoints > prevOpponentPoints) {
      toast.error("You lost, opponent win " + (opponentPoints - prevOpponentPoints) + " points!", { autoClose: 4000, hideProgressBar: true, theme: "colored"})
      setPrevOpponentPoints(opponentPoints)
    }
    }, [myPoints, opponentPoints])

  return (
    <div className='w-[80px] h-[100px] md:w-[120px] md:h-[190px] translate-y-[-120px] md:translate-y-0 text-sm md:text-base rounded-xl bg-background text-white shadow-card flex justify-evenly rotate-6 absolute right-0 md:right-10'>
      <div className='flex flex-col justify-evenly'>
        <h2>You</h2>
        <p>{myPoints}</p>
      </div>
      <div className='flex flex-col justify-evenly'>
        <h2>He</h2>
        <p>{opponentPoints}</p>
      </div>
    </div>
  );
};


export default Score;
