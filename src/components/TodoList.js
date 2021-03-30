import { useState } from 'react';
const TodoList = ({ tasksList, setTasksList }) => {
  let [renderTasksType, setRenderTasksType] = useState('All');
  let [filterBtns, setFilterBtns] = useState({
    allBtn: true,
    activeBtn: false,
    completeBtn: false,
  });

  const configRenderTasks = (renderType) => {
    switch (renderType) {
      case 'Active':
        setFilterBtns({ allBtn: false, activeBtn: true, completeBtn: false });
        break;

      case 'Complete':
        setFilterBtns({ allBtn: false, activeBtn: false, completeBtn: true });
        break;

      default:
        setFilterBtns({ allBtn: true, activeBtn: false, completeBtn: false });
        break;
    }
    setRenderTasksType(renderType);
  };

  const renderCompletedTasks = () => {
    if (!tasksList) return [];
    const commpletedTasks = tasksList.filter((task) => {
      return task.completed;
    });
    return commpletedTasks;
  };

  const removeTask = (tasksList, taskKeyId) => {
    const updatedTasksList = tasksList.filter((_, i) => {
      return i + 1 !== taskKeyId;
    });
    setTasksList(updatedTasksList);
  };

  const onCompleteTask = (task, index) => {
    let tasks = [...tasksList];
    tasks[index].completed = !task.completed;
    setTasksList(tasks);
  };

  const renderTodoCheckbox = (task, i) => {
    return (
      <div
        className="cursor-pointer w-14 h-12 flex justify-center border-2 border-gray-300 
                  dark:border-gray-600 rounded-full m-5 bg-gradient-to-b 
                  from-blue-300 via-indigo-400 via-red-800 to-pink-400"
        onClick={() => {
          onCompleteTask(task, i);
        }}
      >
        <svg
          className="w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    );
  };
  const renderTasks = (tasksList) => {
    if (!tasksList) return [];

    return tasksList.map((task, i) => {
      return (
        // Todo Task
        <div
          key={`task-${i + 1}`}
          className="flex flex-row border-b-2 border-gray dark:border-gray-700 
                    rounded-sm justify-between"
        >
          {/* Todo Task Checkbox */}
          {task.completed && renderTodoCheckbox(task, i)}
          {!task.completed && (
            <div
              className="cursor-pointer w-14 h-12 m-5 rounded-full dark:border-gray-600 
                    border-gray-200 border-2 bg-white dark:bg-gray-800"
              onClick={() => {
                onCompleteTask(task, i);
              }}
            ></div>
          )}
          {/* Todo Task Name */}
          <span
            className="h-20 w-full cursor-pointer"
            onClick={() => onCompleteTask(task, i)}
          >
            <p
              className={
                task.completed
                  ? 'text-gray-300 line-through text-5xl p-4  dark:text-gray-700'
                  : 'text-5xl p-4 dark:text-white'
              }
            >
              {task.taskName}
            </p>
          </span>
          {/* Todo Task Remove Button */}
          <button
            className="w-10 mr-2"
            onClick={() => removeTask(tasksList, i + 1)}
          >
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
        </div>
      );
    });
  };
  const renderActiveTasks = (tasksList) => {
    if (!tasksList) return [];
    const completedTasks = tasksList.filter((task) => {
      return !task.completed;
    });
    return completedTasks;
  };
  const clearCompletedTasks = (tasksList) => {
    const updatedTasksList = tasksList.filter((task) => {
      return !task.completed;
    });
    setTasksList(updatedTasksList);
  };

  const renderFilterButtons = () => {
    const classes = 'flex-1 text-lg font-medium';
    return (
      <div className="flex flex-row justify-between w-full px-2">
        <button
          className={`${classes} ${
            filterBtns.allBtn ? ' text-blue-400' : 'text-gray-400'
          }`}
          onClick={() => configRenderTasks('All')}
        >
          All
        </button>
        <button
          className={`${classes} ml-3 ${
            filterBtns.activeBtn ? ' text-blue-400' : 'text-gray-400'
          }`}
          onClick={() => configRenderTasks('Active')}
        >
          Active
        </button>
        <button
          className={`${classes} ml-3 ${
            filterBtns.completeBtn ? ' text-blue-400' : 'text-gray-400'
          }`}
          onClick={() => configRenderTasks('Complete')}
        >
          Complete
        </button>
      </div>
    );
  };
  return (
    // Todo Tasks List
    <div>
      <div className="w-full shadow-2xl rounded-xl dark:border-0 dark:bg-gray-800">
        {/* Todo Tasks */}
        {renderTasksType === 'All' && <div>{renderTasks(tasksList)}</div>}
        {renderTasksType === 'Active' && (
          <div>{renderTasks(renderActiveTasks(tasksList))}</div>
        )}
        {renderTasksType === 'Complete' && (
          <div>{renderTasks(renderCompletedTasks(tasksList))}</div>
        )}

        {/* Todo List Footer */}
        <div
          className="flex flex-row rounded-xl justify-between h-20
                    dark:border-0 dark:bg-gray-800"
        >
          <div className="text-gray-400 ml-5 mt-6 text-lg font-medium">
            {renderActiveTasks(tasksList).length + ' items left'}
          </div>
          <div className="flex w-2/6 hidden sm:flex">
            {renderFilterButtons()}
          </div>
          <button
            className="text-gray-400 w-44 text-lg font-medium"
            onClick={() => clearCompletedTasks(tasksList)}
          >
            Clear Completed
          </button>
        </div>
      </div>
      <div
        className="flex justify-center sm:hidden py-5 mt-5 rounded-xl shadow-2xl 
                      dark:border-0 dark:bg-gray-800"
      >
        {renderFilterButtons()}
      </div>
    </div>
  );
};
export default TodoList;
