import exampleCards from '../assets/exampleCards.png';
import exampleScore from '../assets/exampleScore.png';

const ExampleGameBoard = () => {
  return (
    <div className="w-4/5 max-w-[800px] h-[80%] m-auto flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card">
      
      <div
        className='w-max h-max md:w-fit md:h-fit flex flex-col gap-2 justify-center items-center rounded-xl absolute left-0 -translate-x-1/2 text-white font-medium text-2xl'>
        {["Truco", "Envido", "Mazo"].map((action: string, index) => (
          <button
            className='w-full py-4 text-center bg-primary border-background border-b last:border-0 rounded-3xl px-2 shadow-card'
            key={index}>
            {action}
          </button>
        ))}
      </div>

      <img src={exampleCards} alt="exampleCards" className='max-w-[280px] max-h-[90%]' />
      <img src={exampleScore} alt="exampleScore" className='absolute right-[2%] w-[100px] md:w-[135px]' />
    </div>
  );
/*

  return (
    <div className="w-4/5 max-w-[800px] h-[80%] m-auto flex relative justify-evenly items-center rounded-2xl bg-[url('assets/mesa.jpg')] shadow-card">
      
      <div
        className='w-max h-max md:w-fit md:h-fit flex flex-col bg-gray-900 border-amber-400 border-4 justify-center items-center rounded-xl absolute left-0 -translate-x-1/2 text-white font-medium text-2xl'>
        {["Truco", "Envido", "Mazo"].map((action: string, index) => (
          <button
            className='w-full py-4 text-cente px-2 border-l-4 border-r-4 border-red-700 '
            key={index}>
            {action}
          </button>
        ))}
      </div>

      <img src={exampleCards} alt="exampleCards" className='max-w-[280px] max-h-[90%]' />
      <img src={exampleScore} alt="exampleScore" className='absolute right-[2%] w-[100px] md:w-[135px]' />
    </div>
  );
    */

}

export default ExampleGameBoard;