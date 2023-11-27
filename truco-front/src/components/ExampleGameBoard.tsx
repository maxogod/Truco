import TrucoActions from "./TrucoActions";
import exampleCards from '../assets/exampleCards.png';
import exampleScore from '../assets/exampleScore.png';

const ExampleGameBoard = () => {

  return (
    <div className="w-[715px] h-[715px] m-auto flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')]">
      <TrucoActions />
      <img src={exampleCards} alt="exampleCards"/>
      <img src={exampleScore} alt="exampleScore" className='absolute right-6 w-[135px]'/>
    </div>
  );
  }

export default ExampleGameBoard;