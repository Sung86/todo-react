import Banner from './components/Banner';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    if (todoList) setTasksList(todoList);
    const isDarkModeNow = JSON.parse(localStorage.getItem('isDarkModeNow'));
    if (isDarkModeNow) setIsDarkMode(isDarkModeNow);
  }, []);
  useEffect(() => {
    localStorage.setItem('isDarkModeNow', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(tasksList));
  }, [tasksList]);

  return (
    <div className={isDarkMode ? 'dark h-screen ' : 'h-screen'}>
      <Banner isDarkMode={isDarkMode} />
      <div className="bg-white dark:bg-gray-900 h-full">
        <div
          className="p-10 -m-44 grid absolute grid-flow-col 
                    mx-auto left-0 right-0"
        >
          <div className="justify-self-center md:w-4/6 w-full">
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <TodoInput
              setTasksList={setTasksList}
              setIsDarkMode={setIsDarkMode}
            />
            <TodoList tasksList={tasksList} setTasksList={setTasksList} />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
