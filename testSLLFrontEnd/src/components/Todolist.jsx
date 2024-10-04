import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todolist = () => {
    const [todo, setTodo] = useState("");
    const [todolist, setTodolist] = useState([]);
    const [fetchedTasks, setFetchedTasks] = useState([]);
    const userID = "user123";
    const [success, setSuccess] = useState(false);

    const addNewToDo = async () => {
        const task = todo.trim();
        if (task.length > 0) {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;

            // Align with schema
            const newTask = {
                userID: userID, // Add userID here
                dateTime: dateTime,
                task: todo
            };

            try {
                // Axios POST request to submit the task data
                const response = await axios.post('http://127.0.0.1:8080/createTask', newTask);
                console.log('Task submitted successfully:', response.data);

                // Add the new task to the local todolist state
                setTodolist([...todolist, { dateTime: dateTime, task: todo }]); // Store as an object for better structure
                setTodo("");  // Reset the input field

            } catch (error) {
                console.error('Error submitting the task:', error);
            }
        }
    };

     const getAllTask = async () => {
     try {
          const response = await axios.post('http://127.0.0.1:8080/todos');
          console.log('Task fetched successfully:', response.data);
          setFetchedTasks(response.data?.data)
          setSuccess(true)

      } catch (error) {
          console.error('Error submitting the task:', error);
      }
    } 

    useEffect(()=>{
     getAllTask();
    },[success])



    return (
        <div className="w-full mx-auto">
            <div className='relative'>
                <div className='w-screen h-96 bg-blue-300' style={{ backgroundImage: "url('https://images.pexels.com/photos/144352/pexels-photo-144352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                <div className='absolute w-screen h-96 backdrop-blur-[10px] z-20 top-0'></div>
            </div>
            <div className="flex justify-center p-4 px-3 absolute w-1/2 z-30 left-1/4 top-20">
                <div className="w-full">
                    <div className='text-3xl mb-2 font-semibold pl-4 text-white'>T O D O</div>
                    <div className="backdrop-blur-xl shadow-md rounded-lg px-3 py-2 mb-4">
                        <div className="flex items-center rounded-md space-x-3">
                            <input value={todo} onChange={(e) => setTodo(e.target.value)}
                                className="w-full rounded-md text-gray-700 leading-tight focus:outline-none py-2 px-2"
                                id="search" type="text" placeholder="Add Task" />
                            <button onClick={addNewToDo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded">
                                ADD
                            </button>
                        </div>
                        <div className="rounded-lg text-sm space-y-2">
                            {
                                fetchedTasks.map((e, index) => (
                                    <div key={index} className="my-2 border-2 w-full flex justify-between cursor-pointer text-gray-700 rounded-lg py-2">
                                        <div>
                                            <div className='flex place-content-center items-center pl-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" className="size-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <div className='text-xs font-bold text-gray-900'>{e.dateTime}</div>
                                            </div>
                                            <div className="pl-2 flex-grow font-extralight text-black">{e.task}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {
                            (todolist.length > 0) && (
                                <div className='text-xs leading-10'>Total Task {todolist.length}</div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todolist;
