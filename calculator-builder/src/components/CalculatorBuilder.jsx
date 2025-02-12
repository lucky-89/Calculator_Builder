import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useCalculatorStore from '../store/useCalculatorStore';
import ThemeToggle from './ThemeToggle';
import UndoRedo from './UndoRedo';

const CalculatorBuilder = () => {
  const { components, layout, addComponent, removeComponent, updateCalculation, calculateResult, clearCalculation, calculation, result, theme } =
    useCalculatorStore();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newLayout = Array.from(layout);
    const [movedItem] = newLayout.splice(result.source.index, 1);
    newLayout.splice(result.destination.index, 0, movedItem);
    useCalculatorStore.setState({ layout: newLayout });
  };

  const predefinedComponents = [
    { id: 'display', type: 'display', value: 'Display' },
    { id: '+', type: 'button', value: '+' },
    { id: '-', type: 'button', value: '-' },
    { id: '*', type: 'button', value: '*' },
    { id: '/', type: 'button', value: '/' },
    { id: '=', type: 'button', value: '=' },
    { id: '1', type: 'button', value: '1' },
    { id: '2', type: 'button', value: '2' },
    { id: '3', type: 'button', value: '3' },
    { id: '4', type: 'button', value: '4' },
    { id: '5', type: 'button', value: '5' },
    { id: '6', type: 'button', value: '6' },
    { id: '7', type: 'button', value: '7' },
    { id: '8', type: 'button', value: '8' },
    { id: '9', type: 'button', value: '9' },
    { id: '0', type: 'button', value: '0' },
  ];

  const themeClasses = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const buttonTheme = theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300';
  const containerTheme = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';

  return (
    <div className={`p-5 max-w-6xl mx-auto ${containerTheme}`}>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Calculator Builder</h1>
        <div className="flex space-x-3">
          <ThemeToggle />
          <UndoRedo />
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        <div className={`shadow-md rounded-lg p-4 max-w-xs w-full ${themeClasses}`}>
          <h2 className="text-lg font-bold mb-4">Components</h2>
          <div className="grid grid-cols-3 gap-3">
            {predefinedComponents.map((component) => (
              <button
                key={component.id}
                onClick={() => addComponent(component)}
                className={`w-16 h-16 rounded-full text-lg font-bold flex items-center justify-center transition ${buttonTheme}`}
              >
                {component.value}
              </button>
            ))}
          </div>
        </div>

        <div className={`flex-grow shadow-md rounded-lg p-4 mx-5 ${themeClasses}`}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="calculator">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {layout.map((id, index) => {
                    const component = components.find((comp) => comp.id === id);
                    return (
                      <Draggable key={component.id} draggableId={component.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 rounded-lg mb-3 flex justify-between items-center cursor-grab transition ${buttonTheme}`}
                          >
                            {component.type === 'button' && (
                              <button
                                onClick={() => updateCalculation(component.value)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                              >
                                {component.value}
                              </button>
                            )}
                            {component.type === 'display' && (
                              <div className={`p-3 rounded w-full text-right ${buttonTheme}`}>
                                {calculation || '0'}
                              </div>
                            )}
                            <button
                              onClick={() => removeComponent(component.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <div className={`shadow-md rounded-lg p-4 mt-5 ${themeClasses}`}>
        <h2 className="text-lg font-bold mb-4">Calculation</h2>
        <input
          type="text"
          value={calculation}
          readOnly
          className={`w-full p-3 rounded text-lg mb-3 ${buttonTheme}`}
        />
        <div className="text-right text-xl font-bold mb-3">Result: {result}</div>
        <div className="flex space-x-3">
          <button onClick={calculateResult} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Calculate
          </button>
          <button onClick={clearCalculation} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorBuilder;
