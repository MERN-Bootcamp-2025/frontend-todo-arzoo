import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/Header";
import AddTaskModal from "../components/AddTaskModal";
import UpdateTaskModal from "../components/UpdateTaskModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import api from "../api/api";
import TaskList from "../components/TaskList";
import { toast } from 'react-toastify';
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

    const [searchTitle, setSearchTitle] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    //debounced search state
    const [debouncedTitle, setDebouncedTitle] = useState(searchTitle);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTitle(searchTitle);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTitle])

    // Fetch Todos
    const fetchTodos = async () => {
        try {
            const res = await api.get("/todo", {
                params: {
                    title: searchTitle || undefined,
                    status: statusFilter || undefined,
                    priority: priorityFilter || undefined,
                }
            });
            // console.log("before setting in state", res.data.todos)
            setTodos(res.data.todos);
            // console.log("after setting in state", res.data.todos)
        } catch (error) {
            console.error("Error fetching todos:", error);
            setError("Failed to load todos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [debouncedTitle, statusFilter, priorityFilter]);



    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleSavetask = async (taskData: TaskData) => {
        try {
            await api.post('/todo', taskData);
            toast.success("Task added successfully!");
            fetchTodos();
        } catch (error: any) {
            console.error("Error adding task:", error);
            toast.error("Failed to add task");
        }
    }

    const handleUpdateTask = async (id: string, data: TaskData) => {
        try {
            await api.put(`/todo/${id}`, data);
            toast.success("Task updated successfully!");
            fetchTodos();
        } catch (error) {
            console.error("Error updating tasks:", error);
            toast.error("Failed to update task");
        }
    }

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
                    <Button onClick={handleAddClick}>+ Add Task</Button>
                </div>

                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        className="border rounded p-2 flex-1"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="">All Status</option>
                        <option value="todo">Todo</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="done">Done</option>
                        <option value="on-hold">On-hold</option>
                        <option value="Will-not-do">Will-not-do</option>
                    </select>
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="">All Priority</option>
                        <option value="critical">Critical</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                {loading ? (
                    <p>Loading todos...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : todos.length === 0 ? (
                    <p>No todos found.</p>
                ) : (
                    <TaskList
                        tasks={todos}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onUpdateTask={(updatedTodo) => {
                            setTodos((prev) =>
                                prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)))
                        }}
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
                        onUpdate={handleUpdateTask}
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
