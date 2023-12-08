import exampleCards from '../assets/exampleCards.png';
import exampleScore from '../assets/exampleScore.png';

const ExampleGameBoard = () => {

  return (
    <div className="w-4/5 max-w-[800px] h-[715px] m-auto flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card">

      <div
        className='w-[150px] h-[300px] flex flex-col justify-center items-center rounded-xl bg-primary absolute left-[-20px] text-white font-medium text-2xl'>
        {["Truco", "Envido", "Mazo"].map((action: string, index) => (
          <button
            className='hover:bg-[#83A0BE] w-full py-4 text-center rounded-xl'
            key={index}>
            {action}
          </button>
        ))}
      </div>

      <img src={exampleCards} alt="exampleCards" />
      <img src={exampleScore} alt="exampleScore" className='absolute right-6 w-[135px]' />
    </div>
  );
}

export default ExampleGameBoard;