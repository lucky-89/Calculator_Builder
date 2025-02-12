import useCalculatorStore from '../store/useCalculatorStore';

const UndoRedo = () => {
  const { undo, redo } = useCalculatorStore();

  return (
    <div className="flex gap-2">
      <button onClick={undo} className="px-4 py-2 bg-green-500 text-white rounded-md transition duration-200 hover:bg-green-600">
        Undo
      </button>
      <button onClick={redo} className="px-4 py-2 bg-green-500 text-white rounded-md transition duration-200 hover:bg-green-600">
        Redo
      </button>
    </div>
  );
};

export default UndoRedo;
