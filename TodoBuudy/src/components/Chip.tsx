import type React from "react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";

interface ChipProps {
    label: string;
    type: "status" | "priority";
    todoId: string;
    onUpdate: (updatedTodo: any) => void;
    disabled?:boolean;
}

const colorMap = {
    status: {
        "todo": "bg-green-100 text-green-800",
        "in-progress": "bg-blue-100 text-blue-800",
        "on-hold": "bg-yellow-100 text-yellow-800",
        "done": "bg-purple-100 text-purple-800",
        "will-not-do": "bg-gray-200 text-gray-800",
    },
    priority: {
        "low": "bg-green-100 text-green-800",
        "medium": "bg-yellow-100 text-yellow-800",
        "high": "bg-red-100 text-red-800",
        "critical": "bg-pink-100 text-pink-800",
    }
}

const statusOptions = ["todo", "in-progress", "on-hold", "done", "will-not-do"];
const priorityOptions = ["low", "medium", "high", "critical"];

type StatusKey = keyof typeof colorMap.status;
type PriorityKey = keyof typeof colorMap.priority;

const Chip: React.FC<ChipProps> = ({ label, type, todoId, onUpdate,disabled=false }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const normalized = label.toLowerCase();

    let colorClass: string;

    if (type === "status") {
        colorClass = colorMap.status[normalized as StatusKey] ?? "bg-gray-100 text-gray-800";
    } else {
        colorClass = colorMap.priority[normalized as PriorityKey] ?? "bg-gray-100 text-gray-800";
    }

    const handleSelect = async (value: string) => {
        try {
            const res = await api.patch(`/todo/${todoId}`, {
                [type]: value
            });
            onUpdate(res.data);
            setOpen(false);
            toast.success("Successfully updated todo!")

        } catch (error) {
            console.error("Error updating todo:", error);
            toast.error("Failed to update")
        }
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const options = type === "status" ? statusOptions : priorityOptions;

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <span
                className={clsx(
                    "px-2 py-1 rounded-full text-xs font-semibold capitalize cursor-pointer",
                    colorClass
                )}
                onClick={()=>{
                    if(!disabled)setOpen(true);
                }}
            >
                {label}
            </span>

            {open && !disabled && (
                <div className="absolute mt-1 bg-white border rounded shadow-lg z-10">
                    {
                        options.map((opt)=>(
                            <div key={opt} onClick={()=>handleSelect(opt)}
                            className={clsx(
                                "px-3 py-1 cursor-pointer capitalize hover:bg-gray-100",
                                opt === normalized && "bg-gray-200"
                            )}>
                                {opt}
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default Chip;