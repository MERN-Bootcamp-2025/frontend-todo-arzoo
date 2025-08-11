import type React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Chip from "./Chip";

interface Task {
    id: string;
    title: string;
    desc: string;
    status: string;
    priority: string;
}

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onUpdateTask: (updatedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({tasks, onEdit, onDelete, onUpdateTask})=>{
    if(!tasks.length){
        return <p className="text-center mt-6 text-gray-500">No tasks found</p>;
    }

    return (
    <div className="mt-6  space-y-5 ml-[28px] mr-[28px]">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white shadow-sm rounded p-6 flex justify-between items-start `}
        >
          <div>
            <h3 className={`font-semibold mb-3 text-lg text-gray-800 ${task.status === 'done' ? "line-through text-red-600":""}`}>{task.title}</h3>
            <p className={`text-gray-600 mb-2 ${task.status === 'done' ? "line-through text-red-500":""}`}>{task.desc}</p>
            <div className="flex gap-2 mt-2">
              <Chip label={task.status} type="status" todoId={task.id} onUpdate={onUpdateTask} disabled={task.status === "done"}/>
              <Chip label={task.priority} type="priority" todoId={task.id} onUpdate={onUpdateTask} disabled={task.status === "done"}/>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(task)}
              className="text-gray-500 hover:text-blue-600 cursor-pointer"
              disabled={task.status === 'done'}
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-500 hover:text-red-600 cursor-pointer"
              
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;