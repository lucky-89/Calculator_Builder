import useCalculatorStore from '../store/useCalculatorStore';

const Calculator = () => {
  const { calculation, result, calculateResult, clearCalculation } = useCalculatorStore();

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <input
          type="text"
          value={calculation}
          readOnly
          className="w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none"
        />
        <div className="text-right text-xl font-bold text-gray-700">{result}</div>
      </div>
      <button 
        onClick={calculateResult} 
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 transition duration-200 hover:bg-green-600"
      >
        Calculate
      </button>
      <button 
        onClick={clearCalculation} 
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 ml-2 transition duration-200 hover:bg-red-600"
      >
        Clear
      </button>
    </div>
  );
};

export default Calculator;
