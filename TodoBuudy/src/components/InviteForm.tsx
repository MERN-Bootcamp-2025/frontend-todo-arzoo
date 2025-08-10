import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import Button from "./Button";

interface InviteFormProps {
    onInviteSent: () => void;
    onClose: () => void;
}

const InviteForm: React.FC<InviteFormProps> = ({ onInviteSent, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !role) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);
            const res = await api.post(
                "/invite",
                { name, email, role }
            );

            toast.success(res.data.message || "Invitation sent successfully");
            onInviteSent();
            onClose();
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to send invite");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="Enter name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="Enter email"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading ? "Sending..." : "Send Invite"}
            </Button>
        </form>
    );
};

export default InviteForm;
