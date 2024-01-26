import Todo from './Todo/Todo';
import iconMoon from './assets/images/icon-moon.svg';
import iconSun from './assets/images/icon-sun.svg';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div className='flex flex-col md:w-[540px] z-10 m-6 mt-10 sm:mt-16 gap-4 sm:gap-0'>
      <header className='flex justify-between items-center mb-6 sm:mb-12'>
        <h1 className='text-xl sm:text-5xlb tracking-[16px] font-bold uppercase text-white'>Todo</h1>
        <button
          onClick={toggleDarkMode}
          aria-label='switch theme'
        >
          <img src={isDarkMode ? iconSun : iconMoon}></img>
        </button>
      </header>
      <main>
        <Todo isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}

export default App;
