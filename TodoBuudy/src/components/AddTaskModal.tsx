import React from "react";
import Modal from "./Modal";
import TaskForm, {type TaskData } from "./TaskForm";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TaskData) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSave }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <TaskForm
        onSubmit={(data) => {
          onSave(data);
          onClose();
        }}
      />
    </Modal>
  );
};

export default AddTaskModal;
