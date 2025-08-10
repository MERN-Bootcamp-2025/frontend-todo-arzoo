import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import api from "../api/api";
import { toast } from "react-toastify";

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
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            await api.delete(`/todo/${todoId}`);
            await onTaskDeleted();
            onClose();
            toast.success("Deleted successfully!");
        } catch (error) {
            console.error("Error deleting todo:", error);
            toast.error("Failed to Delete!")
        } finally{
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
