import { useRef, useState } from 'react';

const TodoInput = ({ setTasksList }) => {
  const taskInputRef = useRef();
  const [isRenderRemoveTaskBtn, setIsRenderRemoveTaskBtn] = useState(false);

  const addTask = () => {
    const todoInputVal = taskInputRef.current.value;
    if (todoInputVal.trim() === '') return;
    else
      setTasksList((previousTasks) => [
        ...previousTasks,
        { taskName: todoInputVal, completed: false },
      ]);
  };
  const clearTaskInput = () => {
    taskInputRef.current.value = '';
    setIsRenderRemoveTaskBtn(false);
  };

  return (
    // Todo Task Input
    <div
      className="mb-10 shadow-2xl rounded-2xl bg-white w-full 
                flex flex-row dark:bg-gray-800"
    >
      {/* Add Task Button */}
      <button
        className="ml-5 mt-6 p-1.5 h-10 w-10 border dark:border-gray-600 rounded-full"
        onClick={() => addTask()}
      >
        <svg
          className="text-gray-400 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3.5}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      {/* Task Input */}
      <input
        ref={taskInputRef}
        type="text"
        className="text-4xl w-full h-20 px-10 outline-none rounded-l-none rounded-2xl 
                  dark:bg-gray-800 dark:text-white"
        onKeyDown={(e) => {
          if (e.key === 'Enter') addTask();
        }}
        onChange={(e) => {
          if (e.target.value !== '') setIsRenderRemoveTaskBtn(true);
          else setIsRenderRemoveTaskBtn(false);
        }}
      />
      {/* Remove Task Button */}
      {isRenderRemoveTaskBtn && (
        <button className="w-10 mr-2" onClick={() => clearTaskInput()}>
          <svg
            className="text-gray-600 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0.7}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default TodoInput;
