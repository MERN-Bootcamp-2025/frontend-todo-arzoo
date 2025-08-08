import { useState } from "react";
// import Button from "./components/Button"
import Modal from "./components/Modal";
import TaskForm, { type TaskData } from "./components/TaskForm";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: TaskData) => {
    console.log('Form Data:', data);
    setOpen(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-300">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Add New Task">
        <TaskForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

export default App