import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";
import {type TaskData } from "./TaskForm";

interface UpdateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskData & { id: string } | null;
  onUpdate: (id: string, data: TaskData) => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({ isOpen, onClose, task, onUpdate }) => {
  const [formData, setFormData] = useState<TaskData>({
    title: "",
    desc: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        desc: task.desc,
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task]);

  const handleChange = (key: keyof TaskData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    onUpdate(task.id, formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none'
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
          <textarea
            value={formData.desc}
            onChange={(e) => handleChange("desc", e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-md resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            required
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
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
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
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
        </div>
        <Button type="submit" variant="primary" className="w-full">Update Task</Button>
      </form>
    </Modal>
  );
};

export default UpdateTaskModal;
