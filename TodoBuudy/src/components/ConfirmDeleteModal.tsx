import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import axios from "axios";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
    todoId: string;
    onTaskDeleted: () => Promise<void>;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isOpen,
    onClose,
    todoId,
    onTaskDeleted,
    message = "Are you sure you want to delete this task?",
}) => {

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/todo/${todoId}`);
            await onTaskDeleted(); // refresh todos list
            onClose();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
