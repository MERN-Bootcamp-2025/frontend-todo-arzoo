import React, { useState } from 'react';
import Button from './Button';

export interface TaskData {
    title: string;
    desc: string;
    priority: string;
    status: string
}

interface TaskFormProps {
    onSubmit: (data: TaskData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, desc, priority, status });
    }
    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input
                    type="text"
                    placeholder='e.g., Create PPT'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none'
                    required
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Desc</label>
                <textarea
                    placeholder='Provide a detailed desc. of the task...'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    required
                />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    >
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="todo">TODO</option>
                        <option value="in-progress">INPROGRESS</option>
                        <option value="on-hold">ONHOLD</option>
                        <option value="will-not-do">WILLNOTDO</option>
                        <option value="done">DONE</option>
                    </select>
                </div>

                <Button type='submit' variant='primary' className='w-full'>
                    Submit Task
                </Button>
            </div>
        </form>
    )
}

export default TaskForm