import exampleCards from '../assets/exampleCards.png';
import exampleScore from '../assets/exampleScore.png';

const ExampleGameBoard = () => {

  return (
    <div className="w-4/5 max-w-[800px] h-[80%] m-auto flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card">

      <div
        className='w-max h-max md:w-[150px] md:h-[300px] px-2 flex flex-col justify-center items-center rounded-xl bg-primary absolute left-[-30px] text-white font-medium text-2xl'>
        {["Truco", "Envido", "Mazo"].map((action: string, index) => (
          <button
            className='hover:bg-[#83A0BE] w-full py-4 text-center rounded-xl'
            key={index}>
            {action}
          </button>
        ))}
      </div>

      <img src={exampleCards} alt="exampleCards" className='max-w-[280px] max-h-[90%]' />
      <img src={exampleScore} alt="exampleScore" className='absolute right-[2%] w-[100px] md:w-[135px]' />
    </div>
  );
}

export default ExampleGameBoard;