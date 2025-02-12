import useCalculatorStore from '../store/useCalculatorStore';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useCalculatorStore();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-700 text-white rounded-md transition duration-200 hover:bg-gray-800"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeToggle;
