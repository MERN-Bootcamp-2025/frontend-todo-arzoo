import type React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Chip from "./Chip";
import Button from "./Button";

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
}

const TaskList: React.FC<TaskListProps> = ({tasks, onEdit, onDelete})=>{
    if(!tasks.length){
        return <p className="text-center mt-6 text-gray-500">No tasks found</p>;
    }

    return (
    <div className="mt-6 space-y-4 ml-[28px] mr-[28px]">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white shadow-sm rounded p-4 flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
            <p className="text-gray-600">{task.desc}</p>
            <div className="flex gap-2 mt-2">
              <Chip label={task.status} type="status" />
              <Chip label={task.priority} type="priority" />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(task)}
              className="text-gray-500 hover:text-blue-600 cursor-pointer"
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