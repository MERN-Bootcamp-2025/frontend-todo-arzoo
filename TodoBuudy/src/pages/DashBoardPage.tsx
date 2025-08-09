import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/Header";
import AddTaskModal from "../components/AddTaskModal";
import UpdateTaskModal from "../components/UpdateTaskModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import api from "../api/api";
import TaskList from "../components/TaskList";
import {toast} from 'react-toastify';
import type { TaskData } from "../components/TaskForm";
import Button from "../components/Button";

interface Todo {
    id: string;
    title: string;
    desc: string;
    priority: string;
    status: string;
}

const Dashboard: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    // Fetch Todos
    const fetchTodos = async () => {
        try {
            const res = await api.get("/todo");
            console.log("before setting in state", res.data.todos)
            setTodos(res.data.todos);
            console.log("after setting in state", todos)
        } catch (error) {
            console.error("Error fetching todos:", error);
            setError("Failed to load todos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleSavetask = async (taskData: TaskData) =>{
        try{
            await api.post('/todo',taskData);
            toast.success("Task added successfully!");
            fetchTodos();
        }catch(error: any){
            console.error("Error adding task:",error);
            toast.error("Failed to add task");
        }
    }
    // const handleEditClick = (todo: Todo) => {
    //     setSelectedTodo(todo);
    //     setIsUpdateModalOpen(true);
    // };

    // const handleDeleteClick = (todo: Todo) => {
    //     setSelectedTodo(todo);
    //     setIsDeleteModalOpen(true);
    // };

    const handleEditClick = (todo: Todo) => {
        setSelectedTodo(todo);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        const todo = todos.find((t) => t.id === id);
        if (todo) {
            setSelectedTodo(todo);
            setIsDeleteModalOpen(true);
        }
    };

    return (
        <>
            <DashboardHeader />
            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Tasks</h1>
                    {/* <button
                        onClick={handleAddClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Task
                    </button> */}
                    <Button onClick={handleAddClick}>+ Add Task</Button>
                </div>

                {loading ? (
                    <p>Loading todos...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : todos.length === 0 ? (
                    <p>No todos found.</p>
                ) : (
                    // <ul className="space-y-4">
                    //     {todos.map((todo) => (
                    //         <li
                    //             key={todo.id}
                    //             className="bg-white shadow p-4 rounded flex justify-between items-center"
                    //         >
                    //             <div>
                    //                 <h3 className="font-semibold">{todo.title}</h3>
                    //                 <p className="text-sm text-gray-600">{todo.desc}</p>
                    //             </div>
                    //             <div className="flex space-x-3">
                    //                 <button
                    //                     onClick={() => handleEditClick(todo)}
                    //                     className="text-green-500 hover:text-green-700"
                    //                 >
                    //                     <FaEdit size={18} />
                    //                 </button>
                    //                 <button
                    //                     onClick={() => handleDeleteClick(todo)}
                    //                     className="text-red-500 hover:text-red-700"
                    //                 >
                    //                     <FaTrash size={18} />
                    //                 </button>
                    //             </div>
                    //         </li>
                    //     ))}
                    // </ul>
                    <TaskList
                        tasks={todos}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                )}

                {/* Modals */}
                <AddTaskModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleSavetask}
                />

                {selectedTodo && (
                    <UpdateTaskModal
                        isOpen={isUpdateModalOpen}
                        onClose={() => {
                            setIsUpdateModalOpen(false);
                            setSelectedTodo(null);
                        }}
                        task={
                            selectedTodo
                                ? {
                                    id: selectedTodo.id,
                                    title: selectedTodo.title,
                                    desc: selectedTodo.desc,
                                    priority: selectedTodo.priority,
                                    status: selectedTodo.status,
                                }
                                : null
                        }
                        onUpdate={fetchTodos}
                    />
                )}

                {selectedTodo && (
                    <ConfirmDeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setSelectedTodo(null);
                        }}
                        todoId={selectedTodo.id}
                        onTaskDeleted={fetchTodos}
                    />
                )}
            </div>
        </>
    );
};

export default Dashboard;
